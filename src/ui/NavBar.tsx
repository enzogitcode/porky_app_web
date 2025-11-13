import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      
  <Link to="/pigs">Ver todos los cerdos</Link>
  <Link to="/pigs/new">Agregar un cerdo</Link>
    </nav>
  )
}

export default NavBar