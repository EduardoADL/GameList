import { FC, useState, ChangeEvent, useEffect } from 'react';
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from '../../services/firebaseConfig';
import joystickImg from '../../assets/img/joystick_icon.png';
import filterImg from '../../assets/img/filtro.png';
import closeIcon from '../../assets/img/close-icon.png';
import "./MenuBar.css";
import { storeHelper, useStore } from '../../services/store';
import { shallow } from 'zustand/shallow';

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
    const { isLogged } = useStore(state => { return { isLogged: state.isLogged } }, shallow)
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<string>()

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

    function getUserData(): User | null {
        const user = auth.currentUser;
        if (user) {
            if (user.email)
                setUserData(user.email);
        }
        return user;
    }

    // Verificar o estado de autenticação do usuário
    useEffect(() => {
        if (isLogged === true) return
        onAuthStateChanged(auth, (user) => {
            if (user) {
                storeHelper.setIsLogged(true);
                getUserData();
            } else {
                // Usuário não autenticado
                storeHelper.setIsLogged(false);
                console.log("Nenhum usuário logado.");
            }
        });
    }, [isLogged])


    function logout() {
        signOut(auth)
            .then(() => {
                window.location.assign("/");
            })
            .catch(() => {
                console.log("Erro ao deslogar o usuário");
            });
    }

    function redirect() {
        window.location.assign("/");
    }

    return (
        <div>
            <div className="container-menu">
                <div className="logo" onClick={redirect}>
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
                {isLogged ? (
                    <ul className="user">
                        <li><a href="#">{userData} ▼ </a>
                            <ul>
                                <li><a href="/favorite">Favoritos</a></li>
                                <li><a onClick={logout}>Sair</a></li>
                            </ul>
                        </li>
                    </ul>
                ) : (<a className='Login-label' href='/auth'>Entrar</a>)}
            </div>
            <div className="select-button" >
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="filter-close">
                            <p className='title-filter'>Filtar por gênero</p>
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