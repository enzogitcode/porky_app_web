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
import { useState } from "react";
import Swal from "sweetalert2";

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

  // 🔴 ELIMINAR CERDO (CONFIRMACIÓN)
  const handleDelete = async () => {
    if (!id) return;

    const result = await Swal.fire({
      title: "¿Eliminar cerdo?",
      text: "⚠️ Se eliminarán también todas las pariciones y datos asociados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deletePigById(id).unwrap();
      await Swal.fire(
        "Eliminado",
        "El cerdo fue eliminado correctamente",
        "success"
      );
      navigate("/pigs");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el cerdo", "error");
      console.error("Error al eliminar cerdo:", error);
    }
  };

  // 🔴 ELIMINAR PARICIÓN (CONFIRMACIÓN)
  const handleDeleteParicion = async (paricionId: string) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "¿Eliminar parición?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteParicion({ pigId: id, paricionId }).unwrap();
      Swal.fire(
        "Eliminada",
        "La parición fue eliminada correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la parición", "error");
      console.error("Error al eliminar parición:", error);
    }
  };

  const [showVacunas, setShowVacunas] = useState(true);
  const [showPariciones, setShowPariciones] = useState(true);

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
        </div>
      </Card>

      <h3 className="text-2xl">Vacunas</h3>
      {pig?.vacunasAplicadas?.length === 0 ? (
        <Card>
          <h4>No hay vacunas aplicadas aún</h4>
        </Card>
      ) : (
        <div className="border-2 border-amber-700 rounded">
          <ButtonCustom
            className="showButton"
            onClick={() => setShowVacunas(!showVacunas)}
          >
            {showVacunas ? "ocultar vacunas" : "ver vacunas"}
          </ButtonCustom>

          {showVacunas &&
            pig.vacunasAplicadas.map((vacuna) => (
              <div key={vacuna._id}>
                <p>
                  Fecha:{" "}
                  {new Date(vacuna.fechaVacunacion).toLocaleDateString()}
                </p>
                <p>
                  Hora:{" "}
                  {new Date(vacuna.fechaVacunacion).toLocaleTimeString()}
                </p>
                
              </div>
            ))}
        </div>
      )}

      <h3 className="text-2xl">Pariciones</h3>
      <div className="flex justify-center items-center bg-amber-300">
        {pig.pariciones?.length !== 0 && (
          <ButtonCustom
            className="m-1 p-1 updateButton"
            onClick={() => setShowPariciones(!showPariciones)}
          >
            {showPariciones ? "ocultar pariciones" : "mostrar pariciones"}
          </ButtonCustom>
        )}
      </div>

      {showPariciones &&
        (pig.pariciones && pig.pariciones.length > 0 ? (
          <ParicionesList
            pariciones={pig.pariciones}
            pigId={id!}
            onDeleteParicion={handleDeleteParicion}
          />
        ) : (
          <h2>No hay pariciones registradas</h2>
        ))}

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

        <ButtonCustom className="editButton" to={`/pigs/${pig._id}/vacunar`}>
          Vacuna cerdo
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
