import NavBar from "./NavBar"
import ButtonCustom from "./ButtonCustom"

const Header = () => {
  return (
    <header className="containerBg flex flex-wrap items-center justify-between py-3 px-3.5 ">
        <div>
        <ButtonCustom to={'/'} className="linkNavBar">Inicio</ButtonCustom>
        </div>
        <NavBar/>
    </header>
  )
  
}

export default Header