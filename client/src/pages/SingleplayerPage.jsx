import Singleplayer from "../components/Singleplayer";

const SingleplayerPage = () => {

    // Delets start game prompt if gets stuck
    const info = document.querySelector('.info-text') 
    if (info){
        document.body.removeChild(info)
    }

    return <Singleplayer />;
}
 
export default SingleplayerPage;