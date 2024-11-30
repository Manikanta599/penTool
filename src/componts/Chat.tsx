import { MessageOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, message, Modal, Radio, Row, Select, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';
import '../componts/ticket.css';
import helpDeskLog from './helpx-logo.png';
import { SketchPicker } from 'react-color';
import PenIcon from './icons/penIcon';
import CircleIcon from './icons/circleIcon';
import ArrowIcon from './icons/arrowIcon';
import RectangleIcon from './icons/rectangleIcon';
import UndoIcon from './icons/undoIcon';
import EraseIcon from './icons/eraseIcon';
import SaveIcon from './icons/saveIcon';
import ColorsIcon from './icons/colorsIcon';



// Define the interface for the ticket
interface Ticket {
  username: string;
  description: string;
  priority: string;
  screenshot: string | null;
  application: number;
}

interface TicketRaiserProps {
  appClientId: number; //  app_client_id
  apiEndpoint: string; // API endpoint for ticket submission

}

export const TicketRaiser: React.FC<TicketRaiserProps> = ({ appClientId, apiEndpoint }) => {
  const [username] = useState('admin');
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState<string>('#ff0000'); //for color
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [shape, setShape] = useState<'rectangle' | 'circle' | 'arrow' | 'freehand'>('freehand');
  const [drawnShapes, setDrawnShapes] = useState<any[]>([]); // Store drawn shapes to persist on canvas

  const [ticketDetails, setTicketDetails] = useState<Ticket>({
    username: 'admin',
    description: '',
    priority: 'Low',
    screenshot: null,
    application: appClientId,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [editedScreenshot, setEditedScreenshot] = useState<string | null>(null);



  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleColorChange = (color: any) => {
    setColor(color.hex); // Update the color state
  };
  const toggleColorPicker = () => {
    setIsColorPickerVisible((prev) => !prev);
  };


  // Toggle the ticket box
  const toggleTicketBox = async () => {
    if (!isOpen) {
      setIsOpen(true);

      const ticketRiser = document.querySelector('.ticket-riser') as HTMLElement;
      const tooltipElement = document.querySelector('.ant-tooltip') as HTMLElement;

      if (ticketRiser) {
        ticketRiser.style.display = 'none';
        tooltipElement.style.display = 'none';
      }

      // Capture a screenshot of the current screen
      const canvas = await html2canvas(document.body);
      const imgData = canvas.toDataURL('image/png');

      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        screenshot: imgData,
      }));

      if (ticketRiser) {
        ticketRiser.style.display = 'block';
        tooltipElement.style.display = '';
      }
    } else {
      clearCanvas();
      setDrawnShapes([]);
      setIsOpen(false);
      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        screenshot: null, // Reset screenshot when closing the ticket box
      }));
    }
  };

  function dataURLToBlob(dataURL: string) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  // Handle form submission
  const handleSubmit = async (values: { description: string; priority: string, isImageNeeded: boolean }) => {
    if (values.description.trim()) {
      const updatedTicket = {
        ...ticketDetails,
        description: values.description,
        priority: values.priority,
        ticketId: 'null',
        serviceTicketId: 'll',
        contact: '',
        phoneNumber: '',
        category: 'null',
        assignedTo: 'null',
        supportEngineer: ' null',
        pcd: 'null',
        cc: '',
      };

      try {
        // Make an Axios POST request to submit the ticket
        const response = await axios.post(apiEndpoint + '/tickets/createFmsTicket', {
          ...updatedTicket,
          screenshot: null
        });

        //desPhotoUpload 
        //createFmsTicket 

        // Handle the success response
        if (response.status) {
          message.success(`Your ticket with Id #${response.data.data.ticketId} has been raised successfully`);
          console.log('Sended data', updatedTicket);
          console.log('Ticket Raised:', response.data);
          if (values.isImageNeeded) {
            // ticketDetails.screenshot;
            const formData = new FormData();
            const blob = dataURLToBlob(ticketDetails.screenshot);
            formData.append('file', blob, 'canvas-image.png');
            formData.append('ticketId', `${response.data.data.ticketId}`);
            await axios.post(apiEndpoint + '/tickets/desPhotoUpload', formData);
          }

          // Reset fields after successful submission
          setIsOpen(false);
          setTicketDetails({
            username: 'admin',
            description: '',
            priority: 'Low',
            screenshot: null,
            application: appClientId,
          });
        } else {
          message.error('Failed to raise the ticket. Please try again.');
        }
      } catch (error) {
        // Handle error response
        message.error('An error occurred while raising the ticket.');
        console.error('Error:', error);
      }
    } else {
      message.error('Please provide a description for your ticket.');
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        setStartX(x);
        setStartY(y);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;


      // Handle freehand drawing
      if (shape === 'freehand') {
        ctx.lineTo(x, y);
        ctx.stroke();
        setDrawnShapes((prevShapes) => {
          const updated = [...prevShapes];
          if (updated.length && updated[updated.length - 1].shape === 'freehand') {
            updated[updated.length - 1].points.push({ x, y });
          } else {
            updated.push({ shape: 'freehand', points: [{ x, y }], color });
          }
          return updated;
        });
      } else {
        // Handle other shapes (circle, rectangle, etc.)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawnShapes.forEach((shapeData) => drawShape(ctx, shapeData));

        if (shape === 'rectangle') {
          ctx.strokeRect(startX, startY, x - startX, y - startY);
        } else if (shape === 'circle') {
          const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
          ctx.beginPath();
          ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        else if (shape === 'arrow') {
          const angle = Math.atan2(y - startY, x - startX);
          const length = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);

          // Draw arrow line
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(x, y);
          ctx.stroke();

          //       // Draw arrowhead
          const arrowSize = 10;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - arrowSize * Math.cos(angle - Math.PI / 6), y - arrowSize * Math.sin(angle - Math.PI / 6));
          ctx.moveTo(x, y);
          ctx.lineTo(x - arrowSize * Math.cos(angle + Math.PI / 6), y - arrowSize * Math.sin(angle + Math.PI / 6));
          ctx.stroke();
        }
      }
    }

  };

  const drawShape = (
    ctx: CanvasRenderingContext2D,
    shapeData: { shape: string; startX?: number; startY?: number; endX?: number; endY?: number; points?: { x: number; y: number }[]; color: string }
  ) => {
    ctx.strokeStyle = shapeData.color;
    ctx.lineWidth = 2;

    if (shapeData.shape === 'freehand' && shapeData.points) {
      ctx.beginPath();
      shapeData.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    } else if (shapeData.shape === 'rectangle') {
      ctx.strokeRect(shapeData.startX, shapeData.startY, shapeData.endX - shapeData.startX, shapeData.endY - shapeData.startY);
    } else if (shapeData.shape === 'circle') {
      const radius = Math.sqrt((shapeData.endX - shapeData.startX) ** 2 + (shapeData.endY - shapeData.startY) ** 2);
      ctx.beginPath();
      ctx.arc(shapeData.startX, shapeData.startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (shapeData.shape === 'arrow') {
      const angle = Math.atan2(shapeData.endY - shapeData.startY, shapeData.endX - shapeData.startX);

      // Draw line (shaft of arrow)
      ctx.beginPath();
      ctx.moveTo(shapeData.startX, shapeData.startY);
      ctx.lineTo(shapeData.endX, shapeData.endY);
      ctx.stroke();

      // Draw arrowhead
      const arrowSize = 10;
      ctx.beginPath();
      ctx.moveTo(shapeData.endX, shapeData.endY);
      ctx.lineTo(
        shapeData.endX - arrowSize * Math.cos(angle - Math.PI / 6),
        shapeData.endY - arrowSize * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(shapeData.endX, shapeData.endY);
      ctx.lineTo(
        shapeData.endX - arrowSize * Math.cos(angle + Math.PI / 6),
        shapeData.endY - arrowSize * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }
  };


  // Stop drawing and save the shape to state
  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !canvasRef.current) return;

    setIsDrawing(false);
    setStartX(0);
    setStartY(0);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      // Save the new shape
      if (shape === 'freehand') {
        // For freehand, store all points collected during drawing
        setDrawnShapes((prev) => [
          ...prev,
          { shape, points: [...(prev[prev.length - 1]?.points || []), { x, y }], color }, // Save the full points array for freehand
        ]);
      } else {
        // For other shapes (rectangle, circle, etc.), save the start and end coordinates
        setDrawnShapes((prev) => [
          ...prev,
          { shape, startX, startY, endX: x, endY: y, color },
        ]);
      }

    }

    if (canvas) {
      const url = canvas.toDataURL('image/png');
      setHistory((prevHistory) => [...prevHistory, url]);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setDrawnShapes([]);
      setHistory([]);
    }
  };

  const undoLastAction = () => {
    if (history.length > 0) {
      const canvas = canvasRef.current;
      const lastState = history[history.length - 2]; // Get the second last state
      setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove last state
      if (canvas && lastState) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0); // Restore the last state
          }
        };
      }
    }
  };

  const saveEditedImage = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (canvas && image) {
      const mergedCanvas = document.createElement('canvas');
      const ctx = mergedCanvas.getContext('2d');
      mergedCanvas.width = image.width;
      mergedCanvas.height = image.height;

      if (ctx) {
        ctx.drawImage(image, 0, 0); // Draw the original image
        ctx.drawImage(canvas, 0, 0); // Overlay the canvas edits
        const finalImage = mergedCanvas.toDataURL('image/png');
        setEditedScreenshot(finalImage);

        // //displaying 

        const imageElement = new Image();

        imageElement.src = finalImage;
        document.body.appendChild(imageElement);

      }
    }
    setIsModalVisible(false);
  };

  return (
    <div className='ticket-riser'>
      {/* Floating button to open/close the ticket box */}
      <Tooltip title="Raise Ticket">
        <Button
          className="fixed-button" // Apply the class
          onClick={toggleTicketBox}
        >
          <img
            src={helpDeskLog}
            alt="Ticket Icon"
            style={{
              width: '70px',
              height: '50px',
              background: 'transparent',
            }}
          />
        </Button>
      </Tooltip>

      {isOpen && (
        <div className={`ticket-box ${isOpen ? 'open' : ''}`}>
          <div className="ticket-header">
            <span>Raising Ticket as {username}</span>
            <button onClick={toggleTicketBox} className="close-button">
              &#10005;
            </button>
          </div>

          <div className="ticket-content">
            {ticketDetails.screenshot && (
              <div className="screenshot-container">
                <img
                  src={ticketDetails.screenshot}
                  alt="Screenshot"
                  className="screenshot"
                  onClick={showModal}
                  style={{ cursor: 'pointer', maxWidth: '200px' }}
                />
              </div>
            )}

            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please describe your issue' }]}
              >
                <TextArea
                  rows={4}
                  value={ticketDetails.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setTicketDetails({ ...ticketDetails, description: e.target.value })
                  }
                  placeholder="Describe your issue..."
                />
              </Form.Item>
              <Row justify='space-between'>
                <Col><Form.Item
                  label="Category"
                  name="category"
                  style={{ width: '100%' }}
                >
                  <Radio.Group>
                    <Radio.Button value="3">CR</Radio.Button>
                    <Radio.Button value="2">Bug</Radio.Button>
                  </Radio.Group>
                </Form.Item></Col>
                <Col>
                  <div style={{ display: 'flex', marginTop: '15px' }}>
                    <Form.Item name="isImageNeeded" valuePropName="checked" label='Include Attachment' noStyle>
                      <Checkbox />
                    </Form.Item>
                    &nbsp;&nbsp;&nbsp;<label htmlFor="">Include Attachment</label>
                  </div>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit Ticket
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}

      <Modal
        title="Screenshot"
        open={isModalVisible}
        onCancel={handleCancel}
        width={800}
        style={{ maxHeight: '500px', overflow: 'auto' }}
        footer={[
          <div className="modal-footer">
            {/* Action Buttons */}
            <Tooltip title="Undo Last Action" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <Button
                key="undo"
                onClick={undoLastAction}
                disabled={drawnShapes.length === 0}
                className="footer-button"
              >
                <UndoIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Clear Screen" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <Button
                key="clear"
                danger
                onClick={clearCanvas}
                className="footer-button"
              >
                <EraseIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Save Edited Image" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <Button
                key="save"
                onClick={saveEditedImage}
                className="footer-button"
              >
                <SaveIcon />
              </Button>
            </Tooltip>

            {/* Color Picker Button */}
            <Tooltip title="Pick a Color" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <div
                className='color-picker-container'
                onClick={toggleColorPicker}
                style={{ backgroundColor: color }}
              >
                <ColorsIcon />
              </div>
            </Tooltip>

            <Tooltip title="Draw Rectangle" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <Button
                onClick={() => setShape('rectangle')}
                // title="Rectangle"
                className="footer-button"
              >
                <RectangleIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Draw Circle" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <Button
                onClick={() => setShape('circle')}
                // title="Circle"
                className="footer-button"
              >
                <CircleIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Draw Arrow" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <Button
                onClick={() => setShape('arrow')}
                // title="Arrow"
                className="footer-button"
              >
                <ArrowIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Freehand Drawing" placement="top" overlayStyle={{ fontSize: '14px' }}>
              <Button
                onClick={() => setShape('freehand')}
                // title="Freehand"
                className="footer-button"
              >
                <PenIcon />
              </Button>
            </Tooltip>
          </div>
        ]}
      >
        <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
          {/* Image Display */}
          <img
            ref={imageRef}
            src={ticketDetails.screenshot || ''}
            alt="Screenshot"
            style={{ width: '100%', display: 'block' }}
          />

          {/* Canvas for Drawing */}
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'crosshair',
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />

          {/* Color Picker inside Modal */}
          {isColorPickerVisible && (
            <div
              style={{
                position: 'absolute',
                top: '25px',
                right: '10px',
                zIndex: 2000,
                background: '#fff',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              {/* Close Button in Top-Right */}
              <div
                className="color-picker"
                onClick={toggleColorPicker}
              >
                &#10005;
              </div>

              <SketchPicker

                color={color}

                onChangeComplete={handleColorChange}
              />
            </div>
          )}

        </div>
      </Modal>
    </div>
  );
};

export default TicketRaiser;