import React from "react";

export const Select = ({
  name,
  labelTitle,
  optionLabel,
  handleChange,
  values,
}) => {
  return (
    <label htmlFor={name}>
      {labelTitle}
      <select name={name} id={name} onChange={handleChange}>
        {values.map((value, index) => {
          return <option key={value} value={value}>{optionLabel[index]}</option>;
        })}
      </select>
    </label>
  );
};
