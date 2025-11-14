import React from 'react';

type InputType = React.InputHTMLAttributes<HTMLInputElement>["type"];


interface InputProps {
  label?: string;
  value: string | number;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void; 
  type:InputType 
  placeholder?: string;
  name?:string
}


const InputCustom: React.FC<InputProps> = ({ label, value, onChange, type, placeholder, name }) => {
  
   
  
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
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
