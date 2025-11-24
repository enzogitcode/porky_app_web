import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetPigByIdQuery,
  useUpdatePigByIdMutation,
} from "../../redux/features/pigSlice";
import type { Situacion } from "../../types/types";

const Updater = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Traer datos actuales del cerdo
  const { data: pig, isLoading, isError } = useGetPigByIdQuery(id!, { skip: !id });

  // Mutation para actualizar (sin tocar pariciones)
  const [updatePig, { isLoading: isUpdating }] = useUpdatePigByIdMutation();

  // Estado local del formulario
  const [formData, setFormData] = useState<{
    nroCaravana: number;
    estadio: Situacion;
    ubicacion: string;
    descripcion: string;
  }>({
    nroCaravana: 0,
    estadio: "ninguno",
    ubicacion: "",
    descripcion: "",
  });

  // Inicializar el formulario cuando llegan los datos
  useEffect(() => {
    if (pig) {
      setFormData({
        nroCaravana: pig.nroCaravana,
        estadio: pig.estadio,
        ubicacion: pig.ubicacion ?? "",
        descripcion: pig.descripcion ?? "",
      });
    }
  }, [pig]);

  // Manejo de cambios
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "nroCaravana"
          ? Number(value)
          : (value as Situacion | string), // Situacion para estadio, string para ubicacion/descripcion
    }));
  };

  // Guardar cambios (no envía pariciones)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updatePig({
        id,
        data: {
          nroCaravana: formData.nroCaravana,
          estadio: formData.estadio,
          ubicacion: formData.ubicacion,
          descripcion: formData.descripcion,
        },
      }).unwrap();
      navigate(`/pigs/${id}`);
    } catch (error) {
      console.error("Error al actualizar cerdo:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !pig) return <p>No se encontró el cerdo</p>;

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {/* Datos actuales */}
      <div>
        <h2>Datos actuales</h2>
        <p><strong>Nro Caravana:</strong> {pig.nroCaravana}</p>
        <p><strong>Estadio:</strong> {pig.estadio}</p>
        <p><strong>Ubicación:</strong> {pig.ubicacion ?? "-"}</p>
        <p><strong>Descripción:</strong> {pig.descripcion ?? "-"}</p>
      </div>

      {/* Formulario de edición (sin pariciones) */}
      <div>
        <h2>Editar datos</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nro Caravana:</label>
            <input
              type="number"
              name="nroCaravana"
              value={formData.nroCaravana}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Estadio:</label>
            <select
              name="estadio"
              value={formData.estadio}
              onChange={handleChange}
            >
              <option value="pregnant">Pregnant</option>
              <option value="parida con lechones">Parida con lechones</option>
              <option value="servida">Servida</option>
              <option value="enferma">Enferma</option>
              <option value="ninguno">Ninguno</option>
            </select>
          </div>

          <div>
            <label>Ubicación:</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Actualizando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updater;
