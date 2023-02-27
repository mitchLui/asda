import { useState } from 'react';
import inputStyles from './Input.module.scss';

type InputProps = {
  name: string;
  style?: React.CSSProperties;
  value?: string;
};

export default function Input({ name, style, value }: InputProps) {
  const [inputValue, setInputValue] = useState(value);
  return (      
    <input style={style} className={inputStyles.input} id={name} name={name} onChange={() => {setInputValue(inputValue)}} placeholder={inputValue} />
  );
}
