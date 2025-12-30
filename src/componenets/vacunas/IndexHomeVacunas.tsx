import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";

const IndexHomeVacunas = () => {
  return (
    <Container className="flex flex-col gap-2 text-center">
      <ButtonCustom className="updateButton text-2xl" to="/vacunas/list">
        Ver listado de vacunas
      </ButtonCustom>
      <ButtonCustom className="updateButton text-2xl" to="/vacunas/register">
        Agregar una vacuna
      </ButtonCustom>
    </Container>
  );
};

export default IndexHomeVacunas;
