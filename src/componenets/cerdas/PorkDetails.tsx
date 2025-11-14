import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetPigByIdQuery, useDeletePigByIdMutation } from "../../redux/features/pigSlice";
import ParicionCard from "./ParicionCard";
import type { Paricion } from "../../types/types";

const PorkDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Obtener cerdo
  const { data: pig, isLoading, isError } = useGetPigByIdQuery(id!, { skip: !id });

  // Hook para eliminar
  const [deletePigById, { isLoading: isDeleting }] = useDeletePigByIdMutation();

  // Función para eliminar y redirigir
  const handleDelete = async () => {
    if (!id) return;
    try {
      await deletePigById(id).unwrap(); // unwrap para manejar errores
      navigate("/pigs"); // redirige a lista
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !pig) return <p>No se encontró el cerdo</p>;

  return (
    <div>
      <h2>Cerdo #{pig.nroCaravana}</h2>
      <p>Estadio: {pig.estadio}</p>
      <p>Ubicación: {pig.ubicacion}</p>
      <p>Descripción: {pig.descripcion}</p>
      <p>Creado: {pig.createdAt}</p>
      <p>Actualizado: {pig.updatedAt}</p>

      <div>
        <h3>Pariciones:</h3>
        {pig.pariciones?.length ? (
          pig.pariciones.map((p: Paricion, index) => (
            <ParicionCard key={index} {...p} />
          ))
        ) : (
          <p>No hay pariciones registradas</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/pigs/update/${pig._id}`} style={{ marginRight: "10px" }}>
          Editar cerdo
        </Link>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
};

export default PorkDetails;
