import { useGetAllPigsQuery } from "../../redux/features/pigSlice";
import PorkCard from "./PorkCard";

const PorkList = () => {
  const { data: pigs, isLoading, isError } = useGetAllPigsQuery();

  if (isLoading) return <p>Cargando...</p>;
  if (isError) {
    console.error();
    return <p>Ocurrió un error al cargar las cerdas 😢</p>;
  }

  return (
    <div>
      {pigs?.map((item) => (
        <PorkCard {...item} key={item._id}/>
      ))}
    </div>
  );
};

export default PorkList;
