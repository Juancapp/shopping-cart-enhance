import React from "react";
import "./select.css";

export const Select = ({
  name,
  labelTitle,
  optionLabel,
  handleChange,
  values,
}) => {
  return (
    <div className="selectContainer">
      <label htmlFor={name}>{labelTitle}</label>
      <select className="select" name={name} id={name} onChange={handleChange}>
        {values.map((value, index) => {
          return (
            <option key={value} value={value}>
              {optionLabel[index]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
