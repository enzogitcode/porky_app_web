import React from "react";
import { Link } from "react-router-dom";
import type { Pig } from "../types/types";

const PorkCard: React.FC<Pig> = (props) => {
  return (
    <div>
      <p>{props.nroCaravana}</p>
      <p>{props.ubicacion}</p>
      <p>{props.estadio}</p>
      <Link to={`/pigs/${props._id}`}><button>Ver detalles</button></Link>
    </div>
  );
};

export default PorkCard;
