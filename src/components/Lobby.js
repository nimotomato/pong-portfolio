import '../styles/TitleLobby.css';


const Lobby = () => {

    return ( 
        <div className='title-screen'>
            <h1>multiplayer</h1>
            <div className='info-container'>
                <form className='game-mode-form'>
                    <h3 className='game-mode-title'>Choose game mode</h3>
                    <button className='title-button'>start lobby</button>
                    <button className='title-button'>find lobby</button>
                </form>
            </div>
        </div>
        
     );
}
 
export default Lobby;