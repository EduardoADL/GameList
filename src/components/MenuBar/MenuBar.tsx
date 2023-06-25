import { FC, useState, ChangeEvent } from 'react';
import joystickImg from '../../assets/img/joystick_icon.png';
import filterImg from '../../assets/img/filtro.png';
import "./MenuBar.css";

interface MenuBarProps {
    onSearch: (query: string) => void;
    onGenreChange: (genre: string) => void;
}

const genres = [
    { value: '', label: 'Todos os gêneros' },
    { value: 'Shooter', label: 'Shooter' },
    { value: 'MMOARPG', label: 'MMOARPG' },
    { value: 'ARPG', label: 'ARPG' },
    { value: 'Fighting', label: 'Fighting' },
    { value: 'Action RPG', label: 'Action RPG' },
    { value: 'Battle Royale', label: 'Battle Royale' },
    { value: 'MMORPG', label: 'MMORPG' },
    { value: 'MOBA', label: 'MOBA' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Racing', label: 'Racing' },
    { value: 'Card Game', label: 'Card Game' },
    { value: 'Strategy', label: 'Strategy' },
    { value: 'MMO', label: 'MMO' },
    { value: 'Social', label: 'Social' },
    { value: 'Fantasy', label: 'Fantasy' },
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
                )}
            </div>
        </div>
    );
};

export default MenuBar;