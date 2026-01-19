import ButtonCustom from "./ButtonCustom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user = true;

  return (
    <nav className="flex flex-wrap p-2 m-2 gap-3">
      <ButtonCustom className="linkNavBar" onClick={() => navigate(-1)}>
        Atrás
      </ButtonCustom>
      <ButtonCustom to={"/"} className="linkNavBar">
        Inicio
      </ButtonCustom>

      <ButtonCustom className="linkNavBar" to="/searcher">
        Buscador
      </ButtonCustom>
      <ButtonCustom className="linkNavBar " to="/pigs">
        Ver todos los cerdos
      </ButtonCustom>
      <ButtonCustom className="linkNavBar " to="/pigs/new">
        Agregar un cerdo
      </ButtonCustom>
      <ButtonCustom className="linkNavBar" to="/vacunas">
        Vacunas
      </ButtonCustom>
      {user && (<ButtonCustom className="linkNavBar" to="/logout">Logout</ButtonCustom>)}
      <ButtonCustom className="linkNavBar" onClick={() => navigate(1)}>
        Adelante
      </ButtonCustom>
    </nav>
  );
};

export default NavBar;
