import React from 'react';

type InputType = React.InputHTMLAttributes<HTMLInputElement>["type"];


interface InputProps {
  label?: string;
  value: string | number;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void; 
  type:InputType 
  placeholder?: string;
  name?:string
  className?:string
  inputClassName?:string
}


const InputCustom: React.FC<InputProps> = ({ label, value, onChange, type, placeholder, name, className, inputClassName }) => {
  
  return (
    <div className={`m-1 p-1${className ?? ""}`}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
      className={`border-2 rounded-4xl ${inputClassName ?? ""}`}
      id={label}
      name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{ padding: '0.5rem', width: '100%' }}
      />
    </div>
  );
};

export default InputCustom;
