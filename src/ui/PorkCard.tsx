import React from 'react'
import type { Hembras } from '../types/types'


const PorkCard:React.FC<Hembras> = (props) => {
  return (
    <div>
        <p>{props.nro}</p>
        <p>{props.pariciones}</p>
        <p>{props.descripcion}</p>
    </div>
  )
}

export default PorkCard