import React, { useState } from "react";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function ServiceCard({ service, onSelect }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelect(service, !isChecked);
  };

  return (
  
    
      <div className="card card-text card-service">
        <div className="card-content">
          <p style={{ color: "navy", fontSize: "16px" }}>
            <strong>{service.service_name}</strong>
          </p>
          <p style={{ fontSize: "12px" }}>{service.service_description}</p>
        </div>
        <div className="checkbox-container" onClick={handleCheckboxChange}>
          {isChecked ? (
            <CheckBoxIcon style={{ color: "gray" }} />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon style={{ color: "gray" }} />
          )}
        </div>
      </div>
   
  );
}

export default ServiceCard;
