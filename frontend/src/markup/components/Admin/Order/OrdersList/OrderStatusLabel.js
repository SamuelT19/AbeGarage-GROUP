import React from "react";
// import "./OrderStatusLabel.css";

function OrderStatusLabel({ statusCode }) {
  let color;
  let statusText;

  switch (statusCode) {
    case 1:
      color = "received";
      statusText = "Received";
      break;
    case 2:
      color = "in-progress";
      statusText = "In progress";
      break;
    case 0:
      color = "completed";
      statusText = "Completed";
      break;
    case 3:
      color = "canceled";
      statusText = "Canceled";
      break;
    default:
      color = "unknown";
      statusText = "Unknown";
      break;
  }

  return <span className={`status-label ${color}`}>{statusText}</span>;
}

export default OrderStatusLabel;
