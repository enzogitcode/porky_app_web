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

  if (isLoading) return <p className="text-center text-gray-500 mt-10">Cargando...</p>;
  if (isError || !pig) return <p className="text-center text-red-500 mt-10">No se encontró el cerdo</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Cerdo #{pig.nroCaravana}</h2>
      <p className="text-sm text-gray-500 mb-4">ID: {pig._id}</p>

      <div className="space-y-2 mb-6">
        <p><span className="font-semibold">Estadio:</span> {pig.estadio}</p>
        <p><span className="font-semibold">Ubicación:</span> {pig.ubicacion}</p>
        <p><span className="font-semibold">Descripción:</span> {pig.descripcion}</p>
        <p><span className="font-semibold">Creado:</span> {pig.createdAt}</p>
        <p><span className="font-semibold">Actualizado:</span> {pig.updatedAt}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Pariciones</h3>
        {pig.pariciones?.length ? (
          <div className="space-y-4">
            {pig.pariciones.map((item) => (
              <div key={item._id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <p className="text-sm text-gray-600">ID: {item._id}</p>
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
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </ButtonCustom>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay pariciones registradas</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {pig._id && (
          <Link
            to={`/pigs/${pig._id}/pariciones`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Agregar Parición
          </Link>
        )}

        <Link
          to={`/pigs/update/${pig._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
        >
          Editar cerdo
        </Link>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow disabled:opacity-50"
        >
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
};

export default PorkDetails;
