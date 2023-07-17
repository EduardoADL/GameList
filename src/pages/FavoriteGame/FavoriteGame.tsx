import { useEffect, useState } from "react";
import { auth, db } from '../../services/firebaseConfig';
import { collection, query, getDocs } from "firebase/firestore";
import MenuBar from "../../components/MenuBar/MenuBar";
import CardGame from "../../components/CardGame/Cardgame";
import './FavoriteGame.css';
import { useStore } from "../../services/store";
import { shallow } from "zustand/shallow";


interface Game {
    id: string;
    data: {
        id: string;
        title: string;
        thumbnail: string;
        genre: string;
        game_url: string;
    };
}


const FavoriteGame = () => {
    const { isLogged } = useStore(state => { return { isLogged: state.isLogged } }, shallow);
    const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    async function fetchFavoriteGames(): Promise<Game[]> {
        try {
            const user = auth.currentUser;
            if (user) {
                const uid = user.uid;
                const gameRef = collection(db, "games", uid, "favoritos");
                const q = query(gameRef);
                const querySnapshot = await getDocs(q);

                const favoriteGames: Game[] = [];

                querySnapshot.forEach((doc) => {
                    const game: Game = {
                        id: doc.id,
                        data: doc.data() as {
                            id: string;
                            title: string;
                            thumbnail: string;
                            genre: string;
                            game_url: string;
                            rating: number;
                        }
                    };
                    favoriteGames.push(game);
                    setFavoriteGames(favoriteGames);
                });
                return favoriteGames;
            } else {
                console.log("Nenhum usuário logado.");
                return [];
            }
        } catch (error) {
            console.error("Erro ao buscar os jogos favoritos:", error);
            return [];
        }
    }


    useEffect(() => {
        const filtered = favoriteGames.filter((game) => {
            const titleMatches = game.data.title.includes(searchQuery);
            const genreMatche = selectedGenre ? game.data.genre.toLowerCase() === selectedGenre.toLowerCase() : true;
            return titleMatches && genreMatche;
        });
        setFilteredGames(filtered);
    }, [searchQuery, favoriteGames, selectedGenre]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
    };

    useEffect(() => {
        if (isLogged === false) return
        const fetchData = async () => {
            await fetchFavoriteGames();
        };

        fetchData();
    }, [isLogged]);

    return (
        <>
            <MenuBar onGenreChange={handleGenreChange} onSearch={handleSearch} />
            <div className="background-div">
                <div className="overlay-text">
                    <p className="text-background">Desvende um universo de diversão!</p>
                </div>
            </div>
            <div className="body-list">
                <div className="list">
                    {filteredGames.map((game) => (
                        <CardGame
                            key={game.data.id}
                            link={game.data.game_url}
                            backgroundImage={game.data.thumbnail}
                            text={game.data.title}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FavoriteGame;