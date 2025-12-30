import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPigByIdQuery,
  useDeletePigByIdMutation,
  useDeleteParicionMutation,
} from "../../redux/features/pigSlice";
import ButtonCustom from "../../ui/ButtonCustom";
import Card from "../../ui/Card";
import Container from "../../ui/Container";
import ParicionesList from "../pariciones/ParicionesListByPig";

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
            <strong>Lechones Total Paridos:</strong> {pig.lechonesTotal}
          </p>
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
            <strong>Creado:</strong>{" "}
            {new Date(pig.createdAt).toLocaleDateString()}{" "}
            <strong>Hora:</strong>{" "}
            {new Date(pig.createdAt).toLocaleTimeString()}
          </p>
          <p>
            <strong>Actualizado:</strong>{" "}
            {new Date(pig.updatedAt).toLocaleDateString()}
          </p>

          {(pig.estadio === "servida" ||
            pig.estadio === "gestación confirmada") &&
            pig.posibleFechaParto && (
              <div>
                <h4>Posible fecha de parto</h4>
                <h5>
                  Desde:{" "}
                  {new Date(pig.posibleFechaParto.inicio).toLocaleDateString(
                    "es-ES"
                  )}
                </h5>
                <h5>
                  Hasta:{" "}
                  {new Date(pig.posibleFechaParto.fin).toLocaleDateString(
                    "es-ES"
                  )}
                </h5>
              </div>
            )}
        </div>
      </Card>

      <h3 className="text-2xl">Pariciones</h3>

      <Container className="flex flex-col items-stretch">
        {pig.pariciones && pig.pariciones.length > 0 ? (
          <ParicionesList
            pariciones={pig.pariciones}
            pigId={id!}
            onDeleteParicion={handleDeleteParicion}
          />
        ) : (
          <h2>No hay pariciones registradas</h2>
        )}
      </Container>

      <Container className="flex justify-center items-center gap-2.5 mb-2">
        <ButtonCustom
          className="updateButton"
          to={`/pigs/${pig._id}/pariciones`}
        >
          Agregar parición
        </ButtonCustom>

        <ButtonCustom className="editButton" to={`/pigs/update/${pig._id}`}>
          Editar cerdo
        </ButtonCustom>

        <ButtonCustom
          onClick={handleDelete}
          disabled={isDeleting}
          className="dangerButton"
        >
          {isDeleting ? "Eliminando..." : "Eliminar TODO EL CERDO"}
        </ButtonCustom>
      </Container>
    </Container>
  );
};

export default PorkDetails;
