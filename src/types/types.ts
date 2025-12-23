import type { Vacuna } from "./vacunaType";

export type Situacion =
  | "nulipara"
  | "servida"
  | "gestación confirmada"
  | "parida con lechones"
  | "destetada"
  | "vacía"
  | "descarte";


export interface Servicio {
  tipo: "cerdo" | "inseminacion" | "desconocido";
  fecha?: string | Date;  // <-- puede ser string (input) o Date (para backend)
  macho?: string | null;
  proveedorDosis?:string|null
}

export interface Paricion {
  _id?: string;
  fechaParicion: string | Date; // <-- acepta ambos
  cantidadLechones: number;
  descripcion?: string;
  servicio?: Servicio;
  fechaActualizacion?: string | Date; // <-- igual
}

export interface RangoFecha {
  inicio:Date
  fin:Date
}

export interface Pig {
  _id: string;
  nroCaravana: number;
  estadio: Situacion;
  descripcion?: string;
  ubicacion?: string;
  pariciones?: Paricion[];
  lechonesTotal?:number;
  enfermedadActual?:string;
  fechaServicioActual:string;
  posibleFechaParto:RangoFecha;
  createdAt: string;
  updatedAt: string;
  VacunasAplicadas:Vacuna[]
}
