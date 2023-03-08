

import { useNavigate } from 'react-router-dom';


const Multiplayerpage = () => {


    const nav = useNavigate();


    return (     
        <div className='title-screen-container'>
            <div className='title-screen'>
                <h1>multiplayer</h1>
                <div className='info-container'>
                    <form className='game-mode-form'>
                        <h3 className='game-mode-title'>Choose game mode</h3>
                        <button className='title-button' onClick={() => {nav('/start-lobby')}}>start lobby</button>
                        <button className='title-button' onClick={() => {nav('/find-lobby')}}>find lobby</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Multiplayerpage;