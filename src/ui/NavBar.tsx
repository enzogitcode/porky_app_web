import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
  <Link className='linkNavBar border-2 border-sky-500' to="/pigs">Ver todos los cerdos</Link>
  <Link className='linkNavBar border-2 border-sky-500' to="/pigs/new">Agregar un cerdo</Link>
    </nav>
  )
}

export default NavBar