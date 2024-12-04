import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css"; // Import default resizable styles
import "antd/dist/reset.css"; // Ensure Ant Design styles are included
import { Button, Input } from "antd";

const { TextArea } = Input;

interface DraggableDivProps {
  id: number;
}

const DraggableDiv: React.FC<DraggableDivProps> = ({ id }) => { 
  
  const [width, setWidth] = useState<number>(150); // Smaller initial width
  const [height, setHeight] = useState<number>(100); // Smaller initial height
  const [visible, setVisible] = useState<boolean>(true); 

  const handleResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
    setWidth(data.size.width);
    setHeight(data.size.height);
  }; 

  if (!visible) {
    return null; 
  }


  return (
    <Draggable handle=".handle">
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[80, 40]} // Minimum width and height
        maxConstraints={[300, 200]} // Maximum width and height
        onResize={handleResize}
        resizeHandles={["se"]} // Resize handle at the southeast (bottom-right) corner
        style={{
          border: "1px solid #ccc",
          background: "#f9f9f9",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
        danger
             onClick={() => setVisible(false)} // Hide the div when clicked
             style={{
               position: "absolute",
               top: "0px",
               right: "0px",
               border: "none",  
              //  background: "red",
              //  color: "white",
               cursor: "pointer",
               borderRadius: "100%",
               width: "15px",
               height: "15px",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               fontSize: "12px",
             }}
             
        >
          X
        </Button>
        <div>
          {/* Handle to drag the entire resizable box */}
          <div
            className="handle"
            style={{
              cursor: "move",
              padding: "5px",
              background: "#ccc",
              textAlign: "center",

            }}
          >

          </div>
          {/* Textbox inside the draggable and resizable div */}
          <input
            placeholder="Type here..."
            style={{
              resize: "both", // Allow resizing of the textarea
              overflow: "auto", // Add scrollbars for overflow content
              width: "100%", // Fit width to the parent div
              height: `${height - 10}px`, // Match height of the parent div (adjusting for handle area)
              minHeight: "30px", // Minimum height to avoid shrinking too much
              padding: "5px", // Padding for the input field
              border: "1px solid #ccc", // Border style for the input
              boxSizing: "border-box", // Include padding and border in the total width/height
            }}
          />
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default DraggableDiv;
