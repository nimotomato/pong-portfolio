import { useNavigate } from "react-router-dom";


const FindLobby = () => {
    const nav = useNavigate();


    return (   
        <div className='title-screen-container'>
            <div className='title-screen'>
                <h1>multiplayer</h1>
                <div className='info-container'>
                    <form className='game-mode-form'>
                        <h3 className='game-mode-title'>Find lobby</h3>
                        <input type="text" placeholder="lobby id"></input>
                        <input type="password" placeholder="password"></input>
                        <button className='title-button lobby-connect'>connect</button>
                        <button className='title-button lobby-return' onClick={() => {nav('/multi-player')}}>return</button>
                    </form>
                </div>
            </div>  
        </div>  
    );
}
 
export default FindLobby;