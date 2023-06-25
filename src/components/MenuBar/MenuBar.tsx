import joystickImg from '../../assets/img/joystick_icon.png'
import filterImg from '../../assets/img/filtro.png'
import "./MenuBar.css"

const MenuBar = () => {

    const handleClick = () => {
        console.log('A imagem foi clicada!');
      };

    return (
        <div className="container-menu">
            <div className='logo'>
                <img className='icon-logo' src={joystickImg} />
                <a className="title">GAMELIST</a>
            </div>
            <div className='search'>
                <input className="search-input" type="text" placeholder="Pesquisar..." />
                <img className='icon-filter' src={filterImg} onClick={handleClick} />
            </div>
        </div>
    )
}
export default MenuBar