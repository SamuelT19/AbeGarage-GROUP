import React from "react";

const CustomStatusIcon = ({ status }) => {
  let backgroundColor, text;

  switch (status) {
    case 1:
      backgroundColor = "gray";
      text = "Received";
      break;
    case 2:
      backgroundColor = "yellow";
      text = "In Progress";
      break;
    case 3:
      backgroundColor = "green";
      text = "Completed";
      break;
    default:
     backgroundColor = "black";
      text = "Unknown";
      break;
  }

  return (
    <div style={{ display: "flex",alignItems: "center"  }}>
      <div
        style={{
          width: "100px",
          height: "28px",
          borderRadius: "10px",
          backgroundColor: backgroundColor,
          marginRight: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          textDecoration:"none"
          
        }}
      >
        <span style={{ backgroundColor }}>{text}</span>
      </div>
    </div>
  );
};

export default CustomStatusIcon;
