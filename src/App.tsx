import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componenets/Home";
import PorkList from "./componenets/cerdas/PorkList";
import PorkDetails from "./componenets/cerdas/PorkDetails";
import Header from "./ui/Header";
import Register from "./componenets/cerdas/Register";
import Updater from "./componenets/cerdas/Updater";
import ParicionForm from "./componenets/cerdas/ParicionForm";
import ParicionUpdate from "./componenets/cerdas/ParicionUpdate";
/* import { toggleDarkMode } from "./redux/features/darkModeSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store/store"; */


const App = () => {
  /* const dispatch = useDispatch()
  const darkMode:boolean = useSelector((state: RootState) => state.darkMode.darkMode);

  console.log(darkMode) */
  {/* <button onClick={() => dispatch(toggleDarkMode())}>{darkMode ? "Modo claro" : "Modo Oscuro" }</button>
  <div style={{height:"10px", width: "10px", backgroundColor: darkMode? "#000":"#fff"}}></div> */}
  
 
  return (
    <>
      <BrowserRouter>
        <Header/>

        <main className="justify-center-safe items-center">
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

      {/* Agregar pariciones */}
      <Route path="/pigs/:id/pariciones" element={<ParicionForm/>}/>

      {/* Editar pariciones existentes */}
      <Route  path="/pigs/:id/pariciones/:paricionId/update" element={<ParicionUpdate/>}/>

      {/* Ruta comodín */}
      <Route path="*" element={<Home/>} />
          </Routes>
        </main>


      </BrowserRouter>
    </>
  );
};

export default App;
