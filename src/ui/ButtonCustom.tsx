import React from 'react';

interface ButtonProps {
    buttonCustomStyle?:React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined
  className:string
}

const ButtonCustom: React.FC<ButtonProps> = ({ onClick, children, type , buttonCustomStyle, className}) => {
  return (
    <button
    className={className}
    type={type}
      onClick={onClick}
      style={buttonCustomStyle}
    >
      {children}
    </button>
  );
};

export default ButtonCustom;
