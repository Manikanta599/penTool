import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TicketRaiser } from './componts/Chat';
import CustomFloatingButton from './componts/floatingButtons';
import { Button, Modal } from 'antd';
import DraggableDiv from './componts/dragableTextBox';
import TicketRaiserBot from './componts/bot/ticket-raiser';
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

      {<TicketRaiser
        appClientId={clientId}
        apiEndpoint={apiEndpoint}
      /> } 
            {/* <TicketRaiserBot appClientId={36} apiEndpoint={'https://proticketx-be.schemaxtech.in/api'} applicationName={'BMR'}/> */}


    </>
  );
}

export default App; 



// const App: React.FC = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [draggableDivs, setDraggableDivs] = useState<number[]>([]);

//   const addDraggableDiv = () => {
//     const newId = draggableDivs.length + 1; // Create a unique id
//     setDraggableDivs([...draggableDivs, newId]); // Add a new DraggableDiv to the list
//   };

//   const openModal = () => {
//     setIsModalVisible(true);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={openModal}>
//         Open Modal
//       </Button>

//       <Modal
//         title="Add Draggable Text Boxes"
//         visible={isModalVisible}
//         onCancel={closeModal}
//         footer={[
//           <Button key="close" onClick={closeModal}>
//             Close
//           </Button>,
//           <Button key="add" type="primary" onClick={addDraggableDiv}>
//             Add Text Box
//           </Button>,
//         ]}
//       >
//         <div style={{ position: "relative", width: "100%", height: "400px", border: "1px solid #ccc" }}>
//           {draggableDivs.map((id) => (
//             <DraggableDiv key={id} id={id} />
//           ))}
//         </div>
//       </Modal>
//     </div>
//   );
// }; 










// const App: React.FC = () => {
//     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//     const [divs, setDivs] = useState<{ id: number }[]>([]);
  
//     const handleAddDiv = () => {
//       setDivs((prev) => [...prev, { id: prev.length + 1 }]);
//     };
  
//     const handleOpenModal = () => setIsModalOpen(true);
//     const handleCloseModal = () => setIsModalOpen(false);
  
//     return (
//       <div>
//         <Button
//           type="default"
//           onClick={handleOpenModal}
//           style={{ marginLeft: "10px" }}
//         >
//           Open Modal
//         </Button>
  
//         <Modal
//           title="Canvas with Draggable and Resizable Divs"
//           open={isModalOpen}
//           onCancel={handleCloseModal}
//           footer={null}
//           width="80%"
//           bodyStyle={{
//             height: "500px",
//             overflow: "auto",
//             position: "relative",
//           }}
//         >
//           <Button type="primary" onClick={handleAddDiv}>
//             Add Draggable Div
//           </Button>
  
//           <div
//             style={{
//               position: "relative",
//               height: "100%",
//               width: "100%",
//               overflow: "hidden",
//             }}
//           >
//             {/* Draggable and Resizable Divs */}
//             {divs.map((div) => (
//               <DraggableDiv key={div.id} id={div.id} />
//             ))}
  
//             {/* Canvas Element */}
//             <canvas
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 background: "#e9e9e9",
//                 zIndex: -10, // Canvas stays in the background
//               }}
//             />
//           </div>
//         </Modal>
//       </div>
//     );
//   };
  
//   export default App;