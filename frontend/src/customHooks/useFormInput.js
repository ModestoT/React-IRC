import { useState } from "react";

export const useFormInput = initalValue => {
  const [value, setValue] = useState(initalValue);

  const handleInput = updatedValue => {
    setValue(v => ({
      ...v,
      ...updatedValue
    }));
  };

  return [value, handleInput];
}