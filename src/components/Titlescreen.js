import '../styles/TitleLobby.css'

const Titlescreen = ({ handleSelection }) => {
    return (
    <div className='title-screen'>
        <h1> Welcome to pong!</h1>
        <div className='info-container'>
        <form className='game-mode-form'>
            <h3 className='game-mode-title'> Choose game mode</h3>
            <button className='single-player title-button' onClick={handleSelection}>single player</button>
            <button className='multi-player title-button' onClick={handleSelection}>multi player</button>
        </form>
        </div>
    </div> 
    );
}
 
export default Titlescreen;