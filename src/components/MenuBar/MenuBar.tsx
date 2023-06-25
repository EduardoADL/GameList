import { FC, useState, ChangeEvent } from 'react';
import joystickImg from '../../assets/img/joystick_icon.png';
import filterImg from '../../assets/img/filtro.png';
import closeIcon from '../../assets/img/close-icon.png';
import "./MenuBar.css";

interface MenuBarProps {
    onSearch: (query: string) => void;
    onGenreChange: (genre: string) => void;
}

const genres = [
    { value: '', label: 'Todos', selected: false },
    { value: 'Shooter', label: 'Shooter', selected: false },
    { value: 'MMOARPG', label: 'MMOARPG', selected: false },
    { value: 'ARPG', label: 'ARPG', selected: false },
    { value: 'Fighting', label: 'Fighting', selected: false },
    { value: 'Action RPG', label: 'Action RPG', selected: false },
    { value: 'Battle Royale', label: 'Battle Royale', selected: false },
    { value: 'MMORPG', label: 'MMORPG', selected: false },
    { value: 'MOBA', label: 'MOBA', selected: false },
    { value: 'Sports', label: 'Sports', selected: false },
    { value: 'Racing', label: 'Racing', selected: false },
    { value: 'Card Game', label: 'Card Game', selected: false },
    { value: 'Strategy', label: 'Strategy', selected: false },
    { value: 'MMO', label: 'MMO', selected: false },
    { value: 'Social', label: 'Social', selected: false },
    { value: 'Fantasy', label: 'Fantasy', selected: false },
];

const MenuBar: FC<MenuBarProps> = ({ onSearch, onGenreChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    const handleGenreChange = (genre: string) => {
        onGenreChange(genre);
        setIsDropdownOpen(false);
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClose = () => {
        setIsDropdownOpen(false);
    }

    return (
        <div>
            <div className="container-menu">
                <div className="logo">
                    <img className="icon-logo" src={joystickImg} alt="Joystick Icon" />
                    <a className="title">GAMELIST</a>
                </div>
                <div className="search">
                    <input
                        className="search-input"
                        value={searchQuery}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Pesquisar..."
                    />
                    <img className="icon-filter" onClick={handleToggleDropdown} src={filterImg} alt="Filter Icon" />
                </div>
            </div>
            <div className="select-button" >
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="filter-close">
                            <p className='title-filter'>Filtar por genero</p>
                            <img className='img-close' src={closeIcon} onClick={handleClose} alt="close-button" />
                        </div>
                        <div className='position-options'>
                            {genres.map((genre) => (
                                <div
                                    key={genre.value}
                                    className="dropdown-option"
                                    onClick={() => handleGenreChange(genre.value)}
                                >
                                    {genre.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuBar;