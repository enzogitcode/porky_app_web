export type Situacion = 'pregnant' | 'parida con lechones' | 'servida' | 'enferma' | 'ninguno';
export interface Pigs {
    nroCaravana: number;
  descripcion?: string;
  estadio: Situacion;
  pariciones?: Paricion
}

export interface Paricion {
  fechaParicion: Date;
  cantidadLechones: number;
  descripcion?: string;
  servicio?: Servicio;
    fechaActualizacion?: Date; // <-- agregar
}
export type Servicio = {
  tipo: 'cerdo' | 'inseminacion' | 'desconocido';
  fecha: Date;
  macho?: string | null;
}