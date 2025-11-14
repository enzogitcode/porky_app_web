import React from "react";
import type { Paricion } from "../../types/types";


const ParicionCard: React.FC<Paricion> = (props) => {

  

  
  const fechaParicion = new Date(props.fechaParicion).toDateString()
  //if (props.fechaActualizacion != undefined) return new Date(props.fechaActualizacion).toLocaleDateString()
  
  return (
    <div>
      <p>fechaParicion {fechaParicion}</p>
      <p>descripcion {props.descripcion}</p>
      <p>cantidadLechones {props.cantidadLechones}</p>
      {props.fechaParicion}
      <p>fechaActualizacion {props.fechaActualizacion}</p>

      <div>
      <p>servicio: {props.servicio?.tipo}</p>
      {props.servicio?.tipo === "cerdo" ? <p>macho: {props.servicio.macho}</p> : null}
      </div>
      
    </div>
  );
};

export default ParicionCard;
