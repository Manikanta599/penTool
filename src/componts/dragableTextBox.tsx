// import React, { useState } from "react";
// import Draggable from "react-draggable";
// import { ResizableBox, ResizeCallbackData } from "react-resizable";
// import "react-resizable/css/styles.css"; // Import default resizable styles
// import "antd/dist/reset.css"; // Ensure Ant Design styles are included
// import { Button, Input } from "antd";

// const { TextArea } = Input;

// interface DraggableDivProps {
//   id: number;
// }

// const DraggableDiv: React.FC<DraggableDivProps> = ({ id }) => { 
//    console.log("inside the dragable...",id);
//   const [width, setWidth] = useState<number>(150); // Smaller initial width
//   const [height, setHeight] = useState<number>(100); // Smaller initial height
//   const [visible, setVisible] = useState<boolean>(true); 

//   const handleResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
//     setWidth(data.size.width);
//     setHeight(data.size.height);
//   }; 

//   if (!visible) {
//     return null; 
//   }


//   return (
//     <Draggable handle=".handle" >
//       <ResizableBox
//         width={width}
//         height={height}
//         minConstraints={[80, 40]} // Minimum width and height
//         maxConstraints={[300, 200]} // Maximum width and height
//         onResize={handleResize}
//         resizeHandles={["se"]} // Resize handle at the southeast (bottom-right) corner
//         style={{
//           border: "1px solid #ccc",
//           background: "#f9f9f9",
//           boxSizing: "border-box",
//           display: "flex",
//           flexDirection: "column",

//         }}
//       >
//         <Button
//         danger
//              onClick={() => setVisible(false)} // Hide the div when clicked
//              style={{
//                position: "absolute",
//                top: "0px",
//                right: "0px",
//                border: "none",  
//               //  background: "red",
//               //  color: "white",
//                cursor: "pointer",
//                borderRadius: "100%",
//                width: "15px",
//                height: "15px",
//                display: "flex",
//                alignItems: "center",
//                justifyContent: "center",
//                fontSize: "12px",
//              }}

//         >
//           X
//         </Button>
//         <div>
//           <div
//             className="handle"
//             style={{
//               cursor: "move",
//               padding: "5px",
//               background: "#ccc",
//               textAlign: "center",
//               position: 'absolute',
//               zIndex: 0,
//             }}
//           >

//           </div>
//           {/* Textbox inside the draggable and resizable div */}
//           <input
//             placeholder="Type here..."
//             style={{
//               resize: "both", // Allow resizing of the textarea
//               overflow: "auto", // Add scrollbars for overflow content
//               width: "100%", // Fit width to the parent div
//               height: `${height - 10}px`, // Match height of the parent div (adjusting for handle area)
//               minHeight: "30px", // Minimum height to avoid shrinking too much
//               padding: "5px", // Padding for the input field
//               border: "1px solid #ccc", // Border style for the input
//               boxSizing: "border-box", // Include padding and border in the total width/height
//             }}
//           />
//         </div>
//       </ResizableBox>
//     </Draggable>
//   );
// };

// export default DraggableDiv;  


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

// const DraggableDiv: React.FC<DraggableDivProps> = ({ id }) => { 
//   console.log("inside the dragable...", id);
//   const [width, setWidth] = useState<number>(150); // Smaller initial width
//   const [height, setHeight] = useState<number>(100); // Smaller initial height
//   const [visible, setVisible] = useState<boolean>(true); 

//   const handleResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
//     setWidth(data.size.width);
//     setHeight(data.size.height);
//   }; 

//   if (!visible) {
//     return null; 
//   }

//   return (
//     <Draggable handle=".handle" defaultPosition={{ x: 0, y: 0 }}>
//       <div  style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//         <ResizableBox
//           width={width}
//           height={height}
//           minConstraints={[80, 10]} // Minimum width and height
//           maxConstraints={[300, 200]} // Maximum width and height
//           onResize={handleResize}
//           resizeHandles={["se"]} // Resize handle at the southeast (bottom-right) corner
//           style={{
//             border: "1px solid #ccc",
//             background: "#f9f9f9",
//             boxSizing: "border-box",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Button
//             danger
//             onClick={() => setVisible(false)} // Hide the div when clicked
//             style={{
//               position: "absolute",
//               top: "0px",
//               right: "-3px",
//               border: "none",
//               cursor: "pointer",
//               borderRadius: "100%",
//               width: "15px",
//               height: "15px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "12px",
//             }}
//           >
//             X
//           </Button>
//           <div>
//             <div
//               className="handle"
//               style={{
//                 cursor: "move",
//                 padding: "5px",
//                 background: "#ccc",
//                 textAlign: "center",
//                 // position: 'absolute',
//                 width:'100%',
//                 height:'10px',
//                 // zIndex: 10,

//               }}
//             >
//               {/* Handle for drag */}
//             </div>

//             {/* Textbox inside the draggable and resizable div */}
//             <input
//               placeholder="Type here..."
//               style={{
//                 resize: "both", // Allow resizing of the textarea
//                 overflow: "auto", // Add scrollbars for overflow content
//                 width: "100%", // Fit width to the parent div
//                 height: `${height - 10}px`, // Match height of the parent div (adjusting for handle area)
//                 minHeight: "30px", // Minimum height to avoid shrinking too much
//                 padding: "5px", // Padding for the input field
//                 border: "1px solid #ccc", // Border style for the input
//                 boxSizing: "border-box", // Include padding and border in the total width/height
//               }}
//             />
//           </div>
//         </ResizableBox>
//       </div>
//     </Draggable>
//   );
// };

// export default DraggableDiv;


// const DraggableDiv: React.FC<DraggableDivProps> = ({ id }) => {
//   return (
//       <Draggable handle=".handle" defaultPosition={{ x: 0, y: 0 }}>
//           <div
//               id={`draggable-${id}`} // Add unique ID
//               style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//               }}
//           >
//               <ResizableBox
//                   width={150}
//                   height={100}
//                   minConstraints={[80, 10]}
//                   maxConstraints={[300, 200]}
//                   style={{
//                       border: "1px solid #ccc",
//                       background: "#f9f9f9",
//                       display: "flex",
//                       flexDirection: "column",
//                   }}
//               >
//                   <div className="handle" style={{ cursor: "move", padding: "5px" }}></div>
//                   <input
//                       placeholder="Type here..."
//                       style={{
//                           width: "100%",
//                           height: "calc(100% - 20px)",
//                           padding: "5px",
//                           border: "none",
//                           boxSizing: "border-box",
//                           fontWeight:'bold',
//                       }}
//                   />
//               </ResizableBox>
//           </div>
//       </Draggable>
//   );
// };  
// export default DraggableDiv; 




interface DraggableDivProps {
  id: number;
  // x: number; // X position
  // y: number; // Y position

}

const DraggableDiv: React.FC<DraggableDivProps> = ({ id }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null; // Hide the div if not visible

  return (
    <Draggable handle=".handle" defaultPosition={{ x:0, y :0 }}>
      <div
        id={`draggable-${id}`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          // left: x,
          // top: div.y,
          // padding: '10px',
          // border: '1px solid black',
          // background: '#f0f0f0',
        }}
      >
        <ResizableBox
          width={150}
          height={100}
          minConstraints={[100, 50]}
          maxConstraints={[300, 200]}
          style={{
            border: "1px solid #d9d9d9",
            background: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Close Button */}
          <Button
            type="text"
            danger
            onClick={() => setVisible(false)}
            style={{
              position: "absolute",
              top: "-5px",
              right: "0px",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            ✕
          </Button>

          {/* Draggable Handle */}
          <div
            className="handle"
            style={{
              cursor: "move",
              padding: "0px",
              background: "#d9d9d9",
              textAlign: "center",
              // fontWeight: "bold",
            }}
          >
            Drag me
          </div>

          {/* Input Field */}
          <input
            placeholder="Type here..."
            style={{
              width: "100%",
              height: "calc(100% - 20px)",
              padding: "8px",
              border: "none",
              outline: "none",
              fontSize: "14px",
              fontWeight: "bold",
              background: "transparent",
            }}
          />
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default DraggableDiv;
