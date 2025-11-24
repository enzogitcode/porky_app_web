import { Link } from "react-router-dom"
import NavBar from "./NavBar"

const Header = () => {
  return (
    <header>
        <div>
        <Link to={'/'} className="linkNavBar">Inicio</Link>
        </div>
        <NavBar/>
    </header>
  )
  
}

export default Header