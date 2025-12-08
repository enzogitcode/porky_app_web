export type Situacion =
  | "pregnant"
  | "parida con lechones"
  | "servida"
  | "enferma"
  | "ninguno";

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

export interface Pig {
  _id: string;
  nroCaravana: number;
  estadio: Situacion;
  descripcion?: string;
  ubicacion?: string;
  pariciones?: Paricion[];
  createdAt: string;
  updatedAt: string;
}
