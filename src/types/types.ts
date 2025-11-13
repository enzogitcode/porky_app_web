// src/types/types.ts

export type Situacion =
  | "pregnant"
  | "parida con lechones"
  | "servida"
  | "enferma"
  | "ninguno";

export interface Servicio {
  tipo: "cerdo" | "inseminacion" | "desconocido";
  fecha: string; // ⚠️ en el frontend, Date viene como string JSON
  macho?: string | null;
}

export interface Paricion {
  fechaParicion: string;
  cantidadLechones: number;
  descripcion?: string;
  servicio?: Servicio;
  fechaActualizacion?: string;
}

export interface Pig {
  _id: string; 
  nroCaravana: number;
  estadio: Situacion;
  descripcion?: string;
  ubicacion?: string;
  pariciones?: Paricion[];
}
