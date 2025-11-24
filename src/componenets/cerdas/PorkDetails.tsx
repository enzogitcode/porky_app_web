import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetPigByIdQuery,
  useDeletePigByIdMutation,
  useDeleteParicionMutation,
} from "../../redux/features/pigSlice";
import ButtonCustom from "../../ui/ButtonCustom";

const PorkDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: pig,
    isLoading,
    isError,
  } = useGetPigByIdQuery(id!, { skip: !id });

  const [deletePigById, { isLoading: isDeleting }] =
    useDeletePigByIdMutation();
  const [deleteParicion] = useDeleteParicionMutation();

  // Eliminar cerdo completo
  const handleDelete = async () => {
    if (!id) return;
    try {
      await deletePigById(id).unwrap();
      // Redirige al listado de cerdos, no al cerdo eliminado
      navigate("/pigs");
    } catch (error) {
      console.error("Error al eliminar cerdo:", error);
    }
  };

  // Eliminar una parición
  const handleDeleteParicion = async (paricionId: string) => {
    if (!id) return;
    try {
      await deleteParicion({ pigId: id, paricionId }).unwrap();
      console.log("Parición eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar parición:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !pig) return <p>No se encontró el cerdo</p>;

  return (
    <div>
      <h2>Cerdo # {pig.nroCaravana}</h2>
      <p>ID: {pig._id}</p>

      <ButtonCustom type="button" onClick={handleDelete} />

      <p>Estadio: {pig.estadio}</p>
      <p>Ubicación: {pig.ubicacion}</p>
      <p>Descripción: {pig.descripcion}</p>
      <p>Creado: {pig.createdAt}</p>
      <p>Actualizado: {pig.updatedAt}</p>

      <div>
        <h3>Pariciones:</h3>
        {pig.pariciones?.length ? (
          pig.pariciones.map((item) => (
            <div key={item._id} style={{ marginBottom: "10px" }}>
              <p>ID: {item._id}</p>
              <p>Fecha parición: {item.fechaParicion?.toString()}</p>
              <p>Fecha actualización: {item.fechaActualizacion?.toString()}</p>
              <p>Cantidad lechones: {item.cantidadLechones}</p>

              {item.servicio?.tipo === "desconocido" ? (
                <p>Servicio: {item.servicio?.tipo}</p>
              ) : (
                <>
                  <p>Fecha servicio: {item.servicio?.fecha?.toString()}</p>
                  <p>Macho: {item.servicio?.macho}</p>
                </>
              )}

              <p>Descripción: {item.descripcion}</p>

              <ButtonCustom
                type="button"
                onClick={() => handleDeleteParicion(item._id!)}
              >
                Eliminar
              </ButtonCustom>
            </div>
          ))
        ) : (
          <p>No hay pariciones registradas</p>
        )}
      </div>

      {/* Botón para agregar parición */}
      <div style={{ marginTop: "20px" }}>
        {pig._id && (
          <Link to={`/pigs/${pig._id}/pariciones`}>Agregar Parición</Link>
        )}
      </div>

      {/* Botones de edición/eliminación */}
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
