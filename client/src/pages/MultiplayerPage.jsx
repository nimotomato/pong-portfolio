import Multiplayer from "../components/MultiplayerDriver";

const MultiplayerPage = () => {

    // Delets start game prompt if gets stuck
    const info = document.querySelector('.info-text') 
    if (info){
        document.body.removeChild(info)
    }

    return <Multiplayer />;
}
 
export default MultiplayerPage;