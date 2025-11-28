import React from "react";
import { Link } from "react-router-dom";
import type { Pig } from "../../types/types";
import Card from "../../ui/Card";

const PorkCard: React.FC<Pig> = (props) => {
  return (
    <Card className="p-4 gap-2">
      <div className=" content-evenly ">
        <p>Cerda nro° {props.nroCaravana}</p>
        <p>Ubicación: {props.ubicacion}</p>
        <p>Estadío: {props.estadio}</p>
      </div>
      <div className="bg-green-300 hover:bg-green-400 rounded p-1">
        <Link to={`/pigs/${props._id}`}
        className="" 
        >
          Ver detalles
        </Link>
      </div>
    </Card>
  );
};

export default PorkCard;
