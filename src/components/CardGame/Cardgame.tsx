import { FC } from "react"
import "./CardGame.css"

interface Params {
    backgroundImage: string;
    text: string;
    link: string;
}

const CardGame: FC<Params> = ({ backgroundImage, text, link }) => {

    return (
        <a style={{ textDecoration: "none" }} href={link} target="_blank">
            <div className="body-card" style={{ backgroundImage }} >
                <div className="position-text">
                    <p className="text-card">{text}</p>
                </div>
            </div>
        </a>
    )
}
export default CardGame