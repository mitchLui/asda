import { useState } from 'react';
import inputStyles from './Input.module.scss';

type InputProps = {
  name: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ name, onChange, style, value }: InputProps) {
  const [inputValue, setInputValue] = useState(value);
  return (      
    <input style={style} className={inputStyles.input} id={name} name={name} onChange={() => {setInputValue(inputValue)}} value={inputValue} />
  );
}
