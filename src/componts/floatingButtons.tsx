import React, { useState } from 'react';
import helpDeskLog from './helpx.png'
import './CustomFloatingButton.css'; // Import the CSS file
import { CommentOutlined, FileImageOutlined } from '@ant-design/icons';


const CustomFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="floating-button-container">
      {/* Main Floating Button */}
      <div
        className="floating-button-main"
       
        style={{ backgroundImage: `url(${helpDeskLog})`}}
      ></div>

      {/* Hover Menu */}
      {/* {isHovered && ( */}
        <div className="floating-button-menu">
          <button className="floating-button-action" onClick={() => alert('First Action!')}>
          <FileImageOutlined />
          </button>
          <button className="floating-button-action" onClick={() => alert('Second Action!')}>
          <CommentOutlined />
          </button>
        </div>
      {/* )} */}
    </div>
  );
};

export default CustomFloatingButton;
