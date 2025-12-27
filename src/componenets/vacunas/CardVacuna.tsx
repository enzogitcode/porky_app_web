import {  useNavigate } from "react-router-dom";
import { useDeleteVacunaByIdMutation } from "../../redux/features/vacunaSlice";
import type { Vacuna } from "../../types/vacunaType";
import Card from "../../ui/Card";

const CardVacuna: React.FC<Vacuna> = (props) => {
  const creacion = new Date(props.createdAt);
  const editada = new Date(props.updatedAt);

  const navig = useNavigate()

  const [deleteVacuna, {isLoading}] = useDeleteVacunaByIdMutation()

  return (
    <Card className="flex flex-col md:grid md:grid-cols-[30%_70%]">
      {/* Imagen */}
      <img
        src="/ruta/a/imagen.jpg"
        alt={props.nombre}
        className="w-full h-48 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
      />

      {/* Contenido */}
      <div className="border-t md:border-t-0 md:border-l border-amber-500 p-4 flex flex-col gap-4">
        {/* Nombre arriba */}
        <h3 className="text-2xl font-semibold">{props.nombre}</h3>

        {/* Zona del medio: datos + fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-wrap">
          {/* Datos */}
          <div className="space-y-1">
            <h5 className="font-medium">Id: {props._id}</h5>
            <p>
              <span className="font-medium">Laboratorio:</span>
              {props.laboratorio}
            </p>
            <p>
              <span className="font-medium">Proveedor:</span> {props.proveedor}
            </p>
            <p>
              <span className="font-medium">Dosis Aplicada:</span> {props.dosis}
            </p>
          </div>

          {/* Fechas */}
          <div className="space-y-1">
            <p>
              <span className="font-medium">Registrada el:</span>{" "}
              {creacion.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Editada el:</span>{" "}
              {editada.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Descripción abajo */}
        <div>
          <p className="font-medium">Descripción: </p>
          <p>{props.descripcion}</p>
        </div>

        {/* Footer con botones centrados */}
        <div className="flex justify-center gap-4 mt-2">
          <button onClickCapture={() => navig(`/vacunas/updater/${props._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Editar
          </button>

          <button onClick={() => deleteVacuna(props._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            {isLoading ? "Eliminando...": "Eliminar"}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CardVacuna;
