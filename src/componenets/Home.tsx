import { useGetServidasOGestacionQuery } from "../redux/features/pigSlice";
import ButtonCustom from "../ui/ButtonCustom";
import Card from "../ui/Card";
import Container from "../ui/Container";

const Home = () => {
  const { data, isLoading, isError } = useGetServidasOGestacionQuery();

  if (isError) {
    console.error();
    return (
      <h1 className="text-center text-red-500 mt-10 text-lg">
        Ocurrió un error al cargar las cerdas 😢
      </h1>
    );
  }
  if (isLoading)
    return (
      <div>
        <h1>Se están cargando los datos</h1>
      </div>
    );

  if (data?.length === 0) {
    return (
      <Container>
        <h1 className="text-5xl font-bold text-red-700 text-center">
          NO hay cerdas próximas a parir!
        </h1>
      </Container>
    );
  }

  return (
    <Container className="grid grid-rows-[1fr auto] font-stretch-90%">
      <h1 className="text-5xl font-bold text-red-700 text-center">
        Próximas cerdas a parir
      </h1>
      <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 p-1">
        {data?.map((item) => (
          <Card className="flex flex-col p-3" key={item._id}>
            <h3 className="text-4xl text-pink-700">
              Cerda N° {item.nroCaravana}
            </h3>
            <h4>ID: {item._id}</h4>
            <p>
              <strong>Lechones Total Paridos:</strong> {item.lechonesTotal}
            </p>
              {(item.estadio === "servida" ||
                item.estadio === "gestación confirmada") &&
                item.posibleFechaParto && (
                  <div className="border-2 border-red-800 rounded-b-3xl p-4 gap-4">
                    <h4>Posible fecha de parto:</h4>

                    <p className="text-2xl">
                      Mínima:{" "}
                      {new Date(
                        item.posibleFechaParto.inicio
                      ).toLocaleDateString("es-ES")}
                    </p>

                    <p className="text-2xl">
                      Máxima:{" "}
                      {new Date(item.posibleFechaParto.fin).toLocaleDateString(
                        "es-ES"
                      )}
                    </p>
                    
                    <div className="mt-2">

                    <ButtonCustom
                      to={`/pigs/${item._id}`}
                      className="detailsButton mt-2"
                      >
                      Ver Detalles de la cerda
                    </ButtonCustom>
                      </div>
                  </div>
                )}
            <p>
              <strong>Actualizado:</strong>{" "}
              {new Date(item.updatedAt).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </Container>
    </Container>
  );
};

export default Home;
