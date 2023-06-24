import { FC } from "react"
import "./CardGame.css"

interface Params {
    backgroundImage: string;
    text: string;
}

const CardGame: FC<Params> = ({ backgroundImage, text }) => {

    return (
        <div className="body-card" style={{ backgroundImage }} >
            <div className="position-text">
                <p className="text-card">{text}</p>
            </div>
        </div>
    )
}
export default CardGame