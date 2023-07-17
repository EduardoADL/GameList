import { FC, useState, useEffect } from "react"
import { auth, db } from '../../services/firebaseConfig';
import { collection, addDoc, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// import Rating from '@mui/material/Rating';
import "./CardGame.css"
import Heart from "react-animated-heart";
import { shallow } from "zustand/shallow";
import { useStore } from "../../services/store";

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

// interface Rating {
//     id: string;
//     data:{
//         id: string;
//         title: string;
//         rating: number;
//     };
// }

interface Params {
    id?: string;
    backgroundImage: string;
    text: string;
    link: string;
    genre?: string;
    rating_param?: number;

}

const CardGame: FC<Params> = ({ backgroundImage, text, link, id, genre }) => {
    const { isLogged } = useStore(state => { return { isLogged: state.isLogged } }, shallow)
    const [click, setClick] = useState(false);
    const [idGame, setIdGame] = useState<string>();
    // const [idGameRating, setIdGameRating] = useState<string>();
    // const [rating, setRating] = useState<number>();


    //puxa dados do firebase para comparar se é favorito
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
                });

                const game = favoriteGames.find((game) => game.data.title === text);
                if (game) {
                    setIdGame(game.id);
                    setClick(true);
                }

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
        if (isLogged === false) return
        const fetchData = async () => {
            await fetchFavoriteGames();
        };
        fetchData();
    }, [isLogged, click]);

    //puxa dados do firebase para comparar se é favorito
    // async function fetchRatingGames(): Promise<Rating[]> {
    //     try {
    //         const user = auth.currentUser;
    //         if (user) {
    //             const uid = user.uid;
    //             const gameRef = collection(db, "games", uid, "avaliacao");
    //             const q = query(gameRef);
    //             const querySnapshot = await getDocs(q);

    //             const ratingGames: Rating[] = [];

    //             querySnapshot.forEach((doc) => {
    //                 const game: Rating = {
    //                     id: doc.id,
    //                     data: doc.data() as {
    //                         id: string;
    //                         title: string;
    //                         rating: number;
    //                     }
    //                 };
    //                 ratingGames.push(game);
    //             });

    //             const game = ratingGames.find((game) => game.data.title === text);
    //             if (game) {
    //                 console.log("dados do game:",game)
    //                 setRating(game.data.rating);
    //                 setIdGameRating(game.id);
    //             }

    //             return ratingGames;
    //         } else {
    //             console.log("Nenhum usuário logado.");
    //             return [];
    //         }
    //     } catch (error) {
    //         console.error("Erro ao buscar os jogos favoritos:", error);
    //         return [];
    //     }
    // }

    // useEffect(() => {
    //     if (isLogged === false) return
    //     const fetchData = async () => {
    //         await fetchRatingGames();
    //     };
    //     fetchData();
    //     console.log("no fetch",rating)
    // }, [rating]);

    //adiciona jogo para favoritos
    async function addGame(gameData: {
        id: string;
        title: string;
        thumbnail: string;
        genre: string;
        game_url: string;
    }) {
        try {
            const user = auth.currentUser;
            if (user) {
                const uid = user.uid;
                const gameRef = collection(db, "games", uid, "favoritos");
                await addDoc(gameRef, gameData);
                setClick(true)
            } else {
                console.log("Nenhum usuário logado.");
            }
        } catch (error) {
            console.error("Erro ao adicionar o jogo:", error);
        }
    }

    //adiciona avaliação no jogo
    // async function addRating(gameData: {
    //     id: string;
    //     title: string;
    //     rating: number;
    // }) {
    //     try {
    //         const user = auth.currentUser;
    //         if (user) {
    //             const uid = user.uid;
    //             const gameRef = collection(db, "games", uid, "avaliacao");
    //             await addDoc(gameRef, gameData);
    //             console.log("avaliado com sucesso!");
    //         } else {
    //             console.log("Nenhum usuário logado.");
    //         }
    //     } catch (error) {
    //         console.error("Erro ao adicionar o jogo:", error);
    //     }
    // }

    //    async function addRatingValue(value: number) {
    //         if (isLogged === false) return
    //         const ratingConst = {
    //             id: id == undefined ? '' : id,
    //             title: text,
    //             rating: value ? value : 0
    //         }
    //         addRating(ratingConst)
    //        await fetchRatingGames();
    //     }

    // Verificar o estado de autenticação do usuário
    function handleGame() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuário autenticado
                const customGameData = {
                    id: id == undefined ? '' : id,
                    title: text,
                    thumbnail: backgroundImage,
                    genre: genre == undefined ? '' : genre,
                    game_url: link,
                };
                addGame(customGameData);
            } else {
                // Usuário não autenticado
                console.log('Nenhum usuario logado, entre com uma conta para favoritar um jogo')
                return window.location.assign("/auth");
            }
        });
    }


    //Deleta o jogo
    async function deleteGame(gameId: string) {
        try {
            const user = auth.currentUser;
            if (user) {
                const uid = user.uid;
                const gameRef = doc(db, "games", uid, "favoritos", gameId);
                await deleteDoc(gameRef);
                setClick(false);
                fetchFavoriteGames();
            } else {
                console.log("Nenhum usuário logado.");
            }
        } catch (error) {
            console.error("Erro ao excluir o jogo:", error);
        }
    }

    function favoriteClick() {
        if (!click) {
            handleGame()
        }
        if (idGame && click) {
            deleteGame(idGame)
            return
        }
        else {
            console.log("erro inesperado")
        }
    }

    return (
        <div className="body-card" style={{ backgroundImage: `url(${backgroundImage})` }} >
            <div className="position-text">
                <div className="rating-text">
                    <a href={link} target="_blank" className="text-card">{text}</a>
                    {/* <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                addRatingValue(newValue ? newValue : 0 )
                            }}
                        /> */}
                </div>
                <div className="heart">
                    <Heart isClick={click} onClick={favoriteClick} />
                </div>
            </div>
        </div>
    )
}
export default CardGame