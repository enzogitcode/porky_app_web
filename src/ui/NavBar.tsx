import { Link } from 'react-router-dom'

const NavBar = () => {
  
  return (
    <nav className='flex flex-wrap p-2 m-2 gap-3'>
  <Link className='btn ' to="/searcher">Buscador</Link>
  <Link className='btn ' to="/pigs">Ver todos los cerdos</Link>
  <Link className='btn ' to="/pigs/new">Agregar un cerdo</Link>
    </nav>
  )
}

export default NavBar