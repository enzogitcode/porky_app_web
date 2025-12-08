import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetPigByIdQuery,
  useDeletePigByIdMutation,
  useDeleteParicionMutation,
} from "../../redux/features/pigSlice";
import ButtonCustom from "../../ui/ButtonCustom";
import Card from "../../ui/Card";
import Container from "../../ui/Container";

const PorkDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: pig,
    isLoading,
    isError,
  } = useGetPigByIdQuery(id!, { skip: !id });
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
    <Container className="text-center flex-col">
      <h2 className="text-3xl">Cerdo N° {pig.nroCaravana}</h2>
      <Card>
        <p>ID: {pig._id}</p>

        <div>
          <p>
            <strong>Estadio:</strong> {pig.estadio}
          </p>
          <p>
            <strong>Ubicación:</strong> {pig.ubicacion}
          </p>
          <p>
            <strong>Descripción:</strong> {pig.descripcion}
          </p>
          <p>
            <strong>Creado:</strong> {new Date(pig?.createdAt).toLocaleDateString()} <strong>Hora: </strong> {new Date(pig?.createdAt).toLocaleTimeString()}
          </p>
          <p>
            <strong>Actualizado:</strong> {new Date(pig.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </Card>

        <h3 className="text-2xl">Pariciones</h3>
      <Container className=" flex flex-col items-stretch">
        {pig.pariciones?.length ? (
          <div className="flex flex-wrap items-stretch">
            {pig.pariciones.map((item) => (
              <Card className="m-2 justify-evenly flex-col" key={item._id}>
                <div className="m-4">
                  <p>ID: {item._id}</p>
                  <p>📅 Parición: {new Date(item?.fechaParicion ?? "").toLocaleString()}</p>
                  <p>🔄 Actualización: {new Date(item?.fechaActualizacion ?? "").toLocaleString()}</p>
                  <p>🐖 Lechones: {item.cantidadLechones}</p>

                  {item.servicio?.tipo === "desconocido" ? (
                    <p>Servicio: {item.servicio?.tipo}</p>
                  ) : (
                    <>
                      <p>📅 Servicio: {item.servicio?.fecha?.toString()}</p>
                      <p>♂ Macho: {item.servicio?.macho}</p>
                    </>
                  )}

                  <p>📝 Descripción: {item.descripcion}</p>
                </div>

                <div className="flex gap-3 m-2">
                  <ButtonCustom
                    className="bg-red-600 p-1 rounded hover:bg-red-700 text-white"
                    type="button"
                    onClick={() => handleDeleteParicion(item._id!)}
                  >
                    Eliminar parición
                  </ButtonCustom>

                  <ButtonCustom
                    className="bg-amber-300 rounded p-2"
                    type="button"
                    onClick={() =>
                      navigate(`/pigs/${id}/pariciones/${item._id}/update`)
                    }
                  >
                    Editar Parición
                  </ButtonCustom>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <h2>No hay pariciones registradas</h2>
        )}
      </Container>

      <Container className=" flex justify-center items-center gap-2.5 mb-2">
        {pig._id && (
          <ButtonCustom className="updateButton" to={`/pigs/${pig._id}/pariciones`}>Agregar parición</ButtonCustom>
        )}

        <Link className="rounded bg-amber-300 p-1" to={`/pigs/update/${pig._id}`}>Editar cerdo</Link>

        <button onClick={handleDelete} disabled={isDeleting} className="rounded bg-red-600 p-1">
          {isDeleting ? "Eliminando..." : "Eliminar TODO EL CERDO"}
        </button>
      </Container>
      {pig.pariciones ? <p>Mayor a 0</p>:null }
    </Container>
  );
};

export default PorkDetails;
