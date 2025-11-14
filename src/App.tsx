import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componenets/Home";
import PorkList from "./componenets/cerdas/PorkList";
import PorkDetails from "./componenets/cerdas/PorkDetails";
import Header from "./ui/Header";
import Register from "./componenets/cerdas/Register";
import Updater from "./componenets/cerdas/Updater";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
               {/* Listado de todos los cerdos */}
      <Route path="/pigs" element={<PorkList />} />

      {/* Crear un nuevo cerdo */}
      <Route path="/pigs/new" element={<Register />} />

      {/* Detalle de un cerdo específico por ID */}
      <Route path="/pigs/:id" element={<PorkDetails />} />

      {/* Editar un cerdo existente */}
      <Route path="/pigs/update/:id" element={<Updater />} />

      {/* Ruta comodín */}
      <Route path="*" element={<Home/>} />
          </Routes>
        </main>


      </BrowserRouter>
    </>
  );
};

export default App;
