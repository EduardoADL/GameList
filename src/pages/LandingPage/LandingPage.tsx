import MenuBar from "../../components/MenuBar/MenuBar";
import CardGame from "../../components/CardGame/Cardgame";
import ori from "../../assets/img/ori-image.png"
import './LandingPage.css'
const LandingPage = () => {
    return (
        <div>
            <MenuBar />
            <div className="background-div">
                <div className="overlay-text">
                 <p className="text-background">Desvende um universo de diversão!</p>
                </div>
            </div>
            <div className="list">
                <CardGame backgroundImage={`url(${ori})`} text="ORI"/>
                <CardGame backgroundImage={`url(${ori})`} text="ORI"/>
                <CardGame backgroundImage={`url(${ori})`} text="ORI"/>
                <CardGame backgroundImage={`url(${ori})`} text="ORI"/>
                <CardGame backgroundImage={`url(${ori})`} text="ORI"/>
                <CardGame backgroundImage={`url(${ori})`} text="ORI"/>
            </div>
        </div>
    )
}
export default LandingPage;