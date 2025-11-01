import React from 'react';

interface ButtonProps {
    buttonCustomStyle?:React.CSSProperties
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
}

const ButtonCustom: React.FC<ButtonProps> = ({ onClick, children, type = 'button' , buttonCustomStyle}) => {
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
