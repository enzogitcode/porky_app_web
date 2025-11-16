import React from "react";
import type { Paricion, Pig } from "../../types/types";
import ButtonCustom from "../../ui/ButtonCustom";
import { useDeleteParicionMutation } from "../../redux/features/pigSlice";
import { getPigById } from "../../axios/axios";

interface ParicionIdProp { paricionId:string}

type ParicionCardProps = Paricion & Pig & ParicionIdProp

const ParicionCard: React.FC<ParicionCardProps> = (props) => {

  const handleDeleteParicion = () => {
    useDeleteParicionMutation(props._id, paricionId)
  }
  
  const fechaParicion = new Date(props.fechaParicion).toDateString()
  //if (props.fechaActualizacion != undefined) return new Date(props.fechaActualizacion).toLocaleDateString()
  
  return (
    <div>
      <p>DEL TIPO PIG TENGO {props.ubicacion} y de pariciones tengo {props._id}</p>
      <p>fechaParicion {fechaParicion}</p>
      <p>descripcion {props._id}</p>
      <p>cantidadLechones {props.cantidadLechones}</p>
      {props.fechaParicion}
      <p>fechaActualizacion {props.fechaActualizacion}</p>

      <div>
      <p>servicio: {props.servicio?.tipo}</p>
      {props.servicio?.tipo === "cerdo" ? <p>macho: {props.servicio.macho}</p> : null}
      </div>
      <ButtonCustom type='button' onClick={handleDeleteParicion}>Eliminar</ButtonCustom>
      <ButtonCustom type="button">Editar</ButtonCustom>
    </div>
  );
};

export default ParicionCard;
