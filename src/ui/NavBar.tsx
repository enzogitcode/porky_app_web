import ButtonCustom from './ButtonCustom'

const NavBar = () => {
  
  return (
    <nav className='flex flex-wrap p-2 m-2 gap-3'>
  <ButtonCustom className='linkNavBar' to="/searcher">Buscador</ButtonCustom>
  <ButtonCustom className='linkNavBar ' to="/pigs">Ver todos los cerdos</ButtonCustom>
  <ButtonCustom className='linkNavBar ' to="/pigs/new">Agregar un cerdo</ButtonCustom>
  <ButtonCustom className='linkNavBar' to="/">Vacunas</ButtonCustom>
    </nav>
  )
}

export default NavBar