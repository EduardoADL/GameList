import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import MenuBar from "../../components/MenuBar/MenuBar";
import CardGame from "../../components/CardGame/Cardgame";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";
import './LandingPage.css';

interface GameData {
    id: string;
    title: string;
    thumbnail: string;
    genre: string;
    game_url: string;
}

const LandingPage = () => {
    const [data, setData] = useState<GameData[]>([]);
    const [requestError, setRequestError] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    const [filteredGames, setFilteredGames] = useState<GameData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<GameData[]>(
                    'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/',
                    {
                        headers: {
                            'dev-email-address': 'du-eduardo10@hotmail.com',
                        },
                        timeout: 5000,
                    }
                );
                setData(response.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errors = [500, 502, 503, 504, 507, 508, 509];
                    if (error.code === 'ECONNABORTED') {
                        setRequestError(true);
                        setResponseMessage('O servidor demorou para responder, tente mais tarde');
                    }
                    if (!error.response?.status) return;
                    if (errors.includes(error.response.status)) {
                        setRequestError(true);
                        setResponseMessage('O servidor falhou em responder, tente recarregar a página');
                    }
                    if (error.response.status !== 200 && !errors.includes(error.response.status)) {
                        setRequestError(true);
                        setResponseMessage('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
                    }
                    return;
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((game) => {
            const titleMatches = game.title.includes(searchQuery);
            const genreMatche = selectedGenre ? game.genre.toLowerCase() === selectedGenre.toLowerCase() : true;
            return titleMatches && genreMatche;
        });
        setFilteredGames(filtered);
    }, [searchQuery, data, selectedGenre]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
      };

    return (
        <>
            <MenuBar onGenreChange={handleGenreChange}  onSearch={handleSearch} />
            <div className="background-div">
                <div className="overlay-text">
                    <p className="text-background">Desvende um universo de diversão!</p>
                </div>
            </div>
            {!requestError ? (
                <div className="body-list">
                    {filteredGames.length > 0 || filteredGames.length == 0 && searchQuery!='' ? (
                        <div className="list">
                            {filteredGames.map((game) => (
                                <CardGame
                                    key={game.id}
                                    link={game.game_url}
                                    backgroundImage={`url(${game.thumbnail})`}
                                    text={game.title}
                                />
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
            ) : (
                <Message text={responseMessage} />
            )}
        </>
    );
};

export default LandingPage;