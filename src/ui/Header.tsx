import { Link } from "react-router-dom"
import NavBar from "./NavBar"

const Header = () => {
  return (
    <header>
        <div>
        <Link to={'/'} >Inicio</Link>
        </div>
        <NavBar/>
    </header>
  )
  
}

export default Header