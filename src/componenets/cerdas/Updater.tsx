import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetPigByIdQuery,
  useUpdatePigByIdMutation,
} from "../../redux/features/pigSlice";
import type { Situacion } from "../../types/types";
import Container from "../../ui/Container";
import Card from "../../ui/Card";
import ButtonCustom from "../../ui/ButtonCustom";

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
    enfermedadActual: string;
  }>({
    nroCaravana: 0,
    estadio: "descarte",
    ubicacion: "",
    descripcion: "",
    enfermedadActual: "",
  });

  // Inicializar el formulario cuando llegan los datos
  useEffect(() => {
    if (pig) {
      setFormData({
        nroCaravana: pig.nroCaravana,
        estadio: pig.estadio,
        ubicacion: pig.ubicacion ?? "",
        descripcion: pig.descripcion ?? "",
        enfermedadActual: pig.enfermedadActual ?? "",
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
          : value,
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
          ...(formData.estadio === "descarte" && {
            enfermedadActual: formData.enfermedadActual,
          }),
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
    <Container className="sm:grid sm:grid-cols-2 gap-2 place-content-center-safe">
      {/* Datos actuales */}
      <Card className="p-3">
        <h2 className="text-lg font-bold">Datos actuales</h2>
        <p><strong>Nro Caravana:</strong> {pig.nroCaravana}</p>
        <p><strong>Estadio:</strong> {pig.estadio}</p>
        <p><strong>Ubicación:</strong> {pig.ubicacion ?? "-"}</p>
        <p><strong>Descripción:</strong> {pig.descripcion ?? "-"}</p>
        {pig.estadio === "descarte" && (
          <p><strong>Enfermedad actual:</strong> {pig.enfermedadActual ?? "-"}</p>
        )}
      </Card>

      {/* Formulario de edición (sin pariciones) */}
      <Card className="p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Datos a editar</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Nro Caravana */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Nro Caravana</label>
            <input
              type="number"
              name="nroCaravana"
              value={formData.nroCaravana}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Estadio */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Estadio</label>
            <select
              name="estadio"
              value={formData.estadio}
              onChange={handleChange}
              className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                value="nulipara"
                disabled={pig.pariciones && pig.pariciones.length > 0}
              >
                Nulípara
              </option>
              <option value="servida">Servida</option>
              <option value="gestación confirmada">Gestación confirmada</option>
              <option value="parida con lechones">Parida con lechones</option>
              <option value="destetada">Destetada</option>
              <option value="vacía">Vacía</option>
              <option value="descarte">Descarte</option>
            </select>
          </div>

          {/* Enfermedad actual (solo si estadio es "descarte") */}
          {formData.estadio === "descarte" && (
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Enfermedad actual</label>
              <input
                type="text"
                name="enfermedadActual"
                value={formData.enfermedadActual}
                onChange={handleChange}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Ubicación */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="border rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botón */}
          <ButtonCustom
            className="updateButton bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? "Actualizando..." : "Guardar cambios"}
          </ButtonCustom>

        </form>
      </Card>
    </Container>
  );
};

export default Updater;
