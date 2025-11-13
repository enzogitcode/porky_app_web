import React from 'react'
import type { Pigs } from '../types/types'


const PorkCard:React.FC<Pigs> = (props) => {

  


  return (
    <div>
        <p>{props.nroCaravana}</p>
        <p>{props.descripcion}</p>
        
    </div>
  )
}

export default PorkCard