import React from 'react'
import type { VacunaAplicada } from '../../types/pigTypes'

const PorkVacunaAplicadaCard:React.FC<VacunaAplicada> = (props) => {
  return (
    <div>
        <h4>Vacuna Aplicada</h4>
        <p>Nombre Vacuna: {props._id}</p>
        <p>Fecha de Vacunación: {new Date(props.fechaVacunacion).toLocaleDateString()}</p>
        <p>Hora de Vacunación: {new Date(props.fechaVacunacion).toLocaleTimeString()}</p>
    </div>
  )
}

export default PorkVacunaAplicadaCard