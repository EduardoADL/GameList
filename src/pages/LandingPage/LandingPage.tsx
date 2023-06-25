import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import MenuBar from "../../components/MenuBar/MenuBar";
import CardGame from "../../components/CardGame/Cardgame";
import Loading from "../../components/Loading/Loading";
import './LandingPage.css'


const LandingPage = () => {

    const [data, setData] = useState<any>(null);
    const [requestError, setRequestError] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/', {
                    headers: {
                        'dev-email-address': 'du-eduardo10@hotmail.com',
                    },
                    timeout: 5000,
                });
                setData(response.data);
            }
            catch (error) {

                if (error instanceof AxiosError) {
                    const errors = [500, 502, 503, 504, 507, 508, 509]
                    if (error.code === 'ECONNABORTED') {
                        setRequestError(true)
                        setResponseMessage('O servidor demorou para responder, tente mais tarde')
                    }
                    if (!error.response?.status) return
                    if (errors.includes(error.response.status)) {
                        setRequestError(true)
                        setResponseMessage('O servidor fahou em responder, tente recarregar a página')
                        console.log("error axios:", error)
                    }
                    return
                }
                if (error instanceof Error) {
                    console.log("error fora do axios:", error);
                }
            }
        }
        fetchData();
    }, [])



    return (

        <div>
            <MenuBar />
            <div className="background-div">
                <div className="overlay-text">
                    <p className="text-background">Desvende um universo de diversão!</p>
                </div>
            </div>
            {!requestError ? (
                <div className="body-list">
                    {data ? (
                        <div className="list">
                            {data.map((data: any) => (
                                <CardGame key={data.id} backgroundImage={`url(${data.thumbnail})`} text={data.title} />
                            ))}
                        </div>
                    ) : (<Loading />)
                    }
                </div>
            ) : (<p>{responseMessage}</p>)}
        </div>
    )
}
export default LandingPage;