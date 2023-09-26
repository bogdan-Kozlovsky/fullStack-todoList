import React, {ChangeEvent} from "react";

type useInputType = {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const useInput = (initialValue: string): useInputType => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  }

  return {value, onChange: handleChange}
}

export {useInput}
