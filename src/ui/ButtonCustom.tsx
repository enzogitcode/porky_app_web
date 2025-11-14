import React from 'react';

interface ButtonProps {
    buttonCustomStyle?:React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined
}

const ButtonCustom: React.FC<ButtonProps> = ({ onClick, children, type , buttonCustomStyle}) => {
  return (
    <button
    type={type}
      onClick={onClick}
      style={buttonCustomStyle}
    >
      {children}
    </button>
  );
};

export default ButtonCustom;
