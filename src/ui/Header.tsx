import { Link } from "react-router-dom"
import NavBar from "./NavBar"

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between py-3 px-3.5 ">
        <div>
        <Link  to={'/'} className="linkNavBar border-2 border-sky-500">Inicio</Link>
        </div>
        <NavBar/>
    </header>
  )
  
}

export default Header