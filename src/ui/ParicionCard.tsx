import React from "react";
import type { Paricion } from "../types/types";

const ParicionCard: React.FC<Paricion> = (props) => {


  return (
    <div>
      <p>{props.fechaParicion}</p>
      <p>{props.descripcion}</p>
      <p>{props.cantidadLechones}</p>
      <p>{props.fechaActualizacion}</p>

      <div>
      <p>{props.servicio?.fecha}</p>
      <p>{props.servicio?.tipo}</p>
      {props.servicio?.tipo === "cerdo" ? <p>{props.servicio.macho}</p> : null}
      </div>
    </div>
  );
};

export default ParicionCard;
