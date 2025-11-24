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

  const { data: pig, isLoading, isError } = useGetPigByIdQuery(id!, { skip: !id });
  const [deletePigById, { isLoading: isDeleting }] = useDeletePigByIdMutation();
  const [deleteParicion] = useDeleteParicionMutation();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deletePigById(id).unwrap();
      navigate("/pigs");
    } catch (error) {
      console.error("Error al eliminar cerdo:", error);
    }
  };

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
      <h2>Cerdo #{pig.nroCaravana}</h2>
      <p>ID: {pig._id}</p>

      <div>
        <p><strong>Estadio:</strong> {pig.estadio}</p>
        <p><strong>Ubicación:</strong> {pig.ubicacion}</p>
        <p><strong>Descripción:</strong> {pig.descripcion}</p>
        <p><strong>Creado:</strong> {pig.createdAt}</p>
        <p><strong>Actualizado:</strong> {pig.updatedAt}</p>
      </div>

      <div>
        <h3>Pariciones</h3>
        {pig.pariciones?.length ? (
          <div>
            {pig.pariciones.map((item) => (
              <div key={item._id}>
                <p>ID: {item._id}</p>
                <p>📅 Parición: {item.fechaParicion?.toString()}</p>
                <p>🔄 Actualización: {item.fechaActualizacion?.toString()}</p>
                <p>🐖 Lechones: {item.cantidadLechones}</p>

                {item.servicio?.tipo === "desconocido" ? (
                  <p>Servicio: {item.servicio?.tipo}</p>
                ) : (
                  <>
                    <p>📅 Servicio: {item.servicio?.fecha?.toString()}</p>
                    <p>♂ Macho: {item.servicio?.macho}</p>
                  </>
                )}

                <p>📝 {item.descripcion}</p>

                <ButtonCustom
                  type="button"
                  onClick={() => handleDeleteParicion(item._id!)}
                >
                  Eliminar
                </ButtonCustom>
                <ButtonCustom
  type="button"
  onClick={() => navigate(`/pigs/${id}/pariciones/${item._id}/update`)}
>
  Editar Parición
</ButtonCustom>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay pariciones registradas</p>
        )}
      </div>

      <div>
        {pig._id && (
          <Link to={`/pigs/${pig._id}/pariciones`}>
            Agregar Parición
          </Link>
        )}

        <Link to={`/pigs/update/${pig._id}`}>
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
