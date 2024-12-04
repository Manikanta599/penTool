import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TicketRaiser } from './componts/Chat';
import Pra from './componts/Pra';
import CustomFloatingButton from './componts/floatingButtons';
// import DraggableTextBox from './componts/dragableTextBox';

function App() {
  const clientId = 123;
  const apiEndpoint = 'http://localhost:3010/api/tickets/createFmsTicket'
  return (
    <>
      {/* {}  
      
      */}
      {/* <DraggableTextBox isTextBoxVisible={true}/> */} 
      {/* <Pra/>  */}
      {/* <CustomFloatingButton/> */} 

      <TicketRaiser
        appClientId={clientId}
        apiEndpoint={apiEndpoint}
      />
    </>
  );
}

export default App; 



// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
// import DraggableDiv from './componts/dragableTextBox';

// const App: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [divs, setDivs] = useState<{ id: number }[]>([]);

//   const handleAddDiv = () => {
//     setDivs((prev) => [...prev, { id: prev.length + 1 }]);
//   };

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <div>
      
//       <Button
//         type="default"
//         onClick={handleOpenModal}
//         style={{ marginLeft: '10px' }}
//       >
//         Open Modal
//       </Button>

//       <Modal 
      
//         title="Draggable and Resizable Divs"
//         open={isModalOpen}
//         onCancel={handleCloseModal}
//         footer={null}
//         width="80%"
//         bodyStyle={{
//           height: '500px',
//           overflow: 'auto',
//           position: 'relative',
//         }}
//       >
//         <Button type="primary" onClick={handleAddDiv}>
//         Add Draggable Div
//       </Button>
//         <div style={{ position: 'relative', height: '100%' }}>
//           {divs.map((div) => (
//             <DraggableDiv key={div.id} id={div.id} />
//           ))}
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useRef } from "react";
// import { Button, Modal, Input } from "antd";
// import { ResizableBox, ResizeCallbackData } from "react-resizable";
// import Draggable from "react-draggable";
// import "react-resizable/css/styles.css";
// import "antd/dist/reset.css"; // Ensure Ant Design styles are included

// const { TextArea } = Input;

// interface DraggableDivProps {
//   id: number;
// }

// const DraggableDiv: React.FC<DraggableDivProps> = ({ id }) => {
//   const [width, setWidth] = useState<number>(200); // Initial width
//   const [height, setHeight] = useState<number>(150); // Initial height
//   const [visible, setVisible] = useState<boolean>(true); // Whether the div is visible

//   // Handle resizing
//   const handleResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
//     setWidth(data.size.width);
//     setHeight(data.size.height);
//   };

//   // Return null when not visible
//   if (!visible) {
//     return null;
//   }

//   return (
//     <Draggable handle=".handle">
//       <div
//         style={{
//           position: "absolute",
//           zIndex: 1,
//           background: "#f9f9f9",
//           border: "1px solid #ccc",
//           boxSizing: "border-box",
//           display: "flex",
//           flexDirection: "column",
//           minWidth: "80px",
//           minHeight: "50px",
//         }}
//       >
//         {/* Close Button */}
//         <Button
//           danger
//           onClick={() => setVisible(false)} // Hide the div when clicked
//           style={{
//             position: "absolute",
//             top: "5px",
//             right: "5px",
//             border: "none",
//             cursor: "pointer",
//             borderRadius: "50%",
//             width: "20px",
//             height: "20px",
//             padding: 0,
//             fontSize: "12px",
//           }}
//         >
//           X
//         </Button>

//         {/* Draggable Handle */}
//         <div
//           className="handle"
//           style={{
//             cursor: "move",
//             padding: "5px",
//             background: "#ccc",
//             textAlign: "center",
//           }}
//         >
//           Drag Me
//         </div>

//         {/* Resizable Box */}
//         <ResizableBox
//           width={width}
//           height={height}
//           minConstraints={[80, 50]} // Minimum size for the box
//           maxConstraints={[500, 300]} // Maximum size for the box
//           onResize={handleResize}
//           resizeHandles={["se"]} // Resize handle at the southeast (bottom-right) corner
//           style={{
//             padding: "10px",
//             boxSizing: "border-box",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Input Field */}
//           <TextArea
//             placeholder="Type here..."
//             autoSize={{ minRows: 2, maxRows: 10 }}
//             style={{
//               width: "100%", // Fit width to the parent div
//               height: "100%", // Adjust height to the parent div
//               padding: "5px", // Padding for the input field
//               border: "1px solid #ccc", // Border style for the input
//               boxSizing: "border-box", // Include padding and border in the total width/height
//             }}
//           />
//         </ResizableBox>
//       </div>
//     </Draggable>
//   );
// };

// const App: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [divs, setDivs] = useState<{ id: number }[]>([]);

//   const handleAddDiv = () => {
//     setDivs((prev) => [...prev, { id: prev.length + 1 }]);
//   };

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <div>
//       <Button
//         type="default"
//         onClick={handleOpenModal}
//         style={{ marginLeft: "10px" }}
//       >
//         Open Modal
//       </Button>

//       <Modal
//         title="Canvas with Draggable and Resizable Divs"
//         open={isModalOpen}
//         onCancel={handleCloseModal}
//         footer={null}
//         width="80%"
//         bodyStyle={{
//           height: "500px",
//           overflow: "auto",
//           position: "relative",
//         }}
//       >
//         <Button type="primary" onClick={handleAddDiv}>
//           Add Draggable Div
//         </Button>

//         <div
//           style={{
//             position: "relative",
//             height: "100%",
//             width: "100%",
//             overflow: "hidden",
//           }}
//         >
//           {/* Draggable and Resizable Divs */}
//           {divs.map((div) => (
//             <DraggableDiv key={div.id} id={div.id} />
//           ))}

//           {/* Canvas Element */}
//           <canvas
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               background: "#e9e9e9",
//               zIndex: 0, // Canvas stays in the background
//             }}
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default App;
