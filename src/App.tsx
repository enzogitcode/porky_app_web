import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componenets/Home";
import PorkList from "./componenets/cerdas/PorkList";
import PorkDetails from "./componenets/cerdas/PorkDetails";
import Header from "./ui/Header";
import Register from "./componenets/cerdas/Register";
import Updater from "./componenets/cerdas/Updater";
import ParicionForm from "./componenets/pariciones/ParicionForm";
import ParicionUpdate from "./componenets/pariciones/ParicionUpdate";
import Searcher from "./componenets/Searcher";
import ErrorPage from "./ui/ErrorPage";
import VacunasList from "./componenets/vacunas/VacunasList";
import RegisterVacunaForm from "./componenets/vacunas/RegisterVacunaForm";
import UpdaterVacunasForm from "./componenets/vacunas/UpdaterVacunasForm";
import IndexHomeVacunas from "./componenets/vacunas/IndexHomeVacunas";
import ParicionesListByPig from "./componenets/pariciones/ParicionesListByPig";

const App = () => {
  /* const dispatch = useDispatch()
  const darkMode:boolean = useSelector((state: RootState) => state.darkMode.darkMode);

  console.log(darkMode) */
  {
    /* <button onClick={() => dispatch(toggleDarkMode())}>{darkMode ? "Modo claro" : "Modo Oscuro" }</button>
  <div style={{height:"10px", width: "10px", backgroundColor: darkMode? "#000":"#fff"}}></div> */
  }

  // Llamada
  return (
    <>
      <BrowserRouter>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Buscador */}
            <Route path="/searcher" element={<Searcher />} />

            {/* Listado de todos los cerdos */}
            <Route path="/pigs" element={<PorkList />} />

            {/* Crear un nuevo cerdo */}
            <Route path="/pigs/new" element={<Register />} />

            {/* Detalle de un cerdo específico por ID */}
            <Route path="/pigs/:id" element={<PorkDetails />} />

            {/* Editar un cerdo existente */}
            <Route path="/pigs/update/:id" element={<Updater />} />

            {/* Agregar pariciones */}
            <Route path="/pigs/:id/pariciones" element={<ParicionForm />} />

            {/* LISTA DE PARICIONES */}
            

            {/* Editar pariciones existentes */}
            <Route
              path="/pigs/:id/pariciones/update/:paricionId"
              element={<ParicionUpdate />}
            />

            {/* Vacunas Home */}
            <Route path="/vacunas" element={<IndexHomeVacunas />} />

            {/* Vacunas List */}
            <Route path="/vacunas/list" element={<VacunasList />} />

            {/* Vacunas Register */}
            <Route path="/vacunas/register" element={<RegisterVacunaForm />} />

            {/* Vacunas Vacunas Updater */}
            <Route
              path="/vacunas/updater/:id"
              element={<UpdaterVacunasForm />}
            />

            {/* Ruta comodín */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
