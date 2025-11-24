import { useGetAllPigsQuery } from "../../redux/features/pigSlice";
import PorkCard from "./PorkCard";

const PorkList = () => {
  const { data: pigs, isLoading, isError } = useGetAllPigsQuery();

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10 text-lg animate-pulse">Cargando...</p>;

  if (isError) {
    console.error();
    return <p className="text-center text-red-500 mt-10 text-lg">Ocurrió un error al cargar las cerdas 😢</p>;
  }

  if (pigs?.length === 0) {
    return <p className="text-center text-gray-600 mt-10 text-lg">No hay cerdos registrados</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Lista de Cerdos</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pigs?.map((item) => (
          <PorkCard {...item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default PorkList;
