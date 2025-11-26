import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetPigByIdQuery,
  usePatchParicionMutation,
} from "../../redux/features/pigSlice"; // ajusta la ruta según tu proyecto
import type { Paricion } from "../../types/types";

const ParicionUpdate = () => {
  const { id, paricionId } = useParams<{ id: string; paricionId: string }>();
  const navigate = useNavigate();

  // Traemos el cerdo completo
  const { data: pig, isLoading, isError } = useGetPigByIdQuery(id!, { skip: !id });

  // Mutation para actualizar una parición
  const [patchParicion, { isLoading: isUpdating }] = usePatchParicionMutation();

  // Estado local del formulario
  const [formData, setFormData] = useState<Partial<Paricion>>({
    fechaParicion: "",
    cantidadLechones: 0,
    descripcion: "",
    servicio: undefined,
  });

  // Inicializamos el formulario con los datos de la parición
  useEffect(() => {
    if (pig && paricionId) {
      const paricion = pig.pariciones?.find((p) => p._id === paricionId);
      if (paricion) {
        setFormData({
          fechaParicion: paricion.fechaParicion,
          cantidadLechones: paricion.cantidadLechones,
          descripcion: paricion.descripcion ?? "",
          servicio: paricion.servicio,
        });
      }
    }
  }, [pig, paricionId]);

  // Manejo de cambios
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cantidadLechones" ? Number(value) : value,
    }));
  };

  // Guardar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !paricionId) return;
    try {
      await patchParicion({
        pigId: id,
        paricionId,
        data: formData,
      }).unwrap();
      navigate(`/pigs/${id}`);
    } catch (error) {
      console.error("Error al actualizar parición:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !pig) return <p>No se encontró el cerdo</p>;

  return (
    <div>
      <h2>Editar Parición</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha de Parición:</label>
          <input
            type="date"
            name="fechaParicion"
            value={
              typeof formData.fechaParicion === "string"
                ? formData.fechaParicion
                : ""
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Cantidad de Lechones:</label>
          <input
            type="number"
            name="cantidadLechones"
            value={formData.cantidadLechones ?? 0}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion ?? ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Actualizando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
};

export default ParicionUpdate;
