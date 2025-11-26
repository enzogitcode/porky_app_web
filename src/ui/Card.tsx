import React from 'react'

interface CardProp {
    children: React.ReactNode
    className?:string
}

const Card:React.FC<CardProp> = ({children, className}) => {
  return (
    <div className=
    {`${className ?? ""} flex flex-col justify-center text-center items-center border-pink-400 border-2 radius-sm rounded-2xl`}>
{children}
    </div>
  )
}

export default Card