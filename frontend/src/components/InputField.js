import React from "react";

const InputField = ({className, labelText, type, value, onChange, checked}) => {
  return(
    <label className={className}> 
      {labelText}
      <input type={type} value={value} onChange={onChange} checked={checked}/>
    </label>
  );
};

export default InputField;