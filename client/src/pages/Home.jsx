import "../styles/Selectionscreen.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();

  // Deletes start game prompt if gets stuck
  const info = document.querySelector(".info-text");
  if (info) {
    document.body.removeChild(info);
  }

  return (
    <div className="title-screen-container">
      <div className="title-screen">
        <h1 className="title"> Welcome to pong!</h1>
        <div className="info-container">
          <form className="game-mode-form">
            <h3 className="game-mode-title"> Choose game mode</h3>
            <button
              className="single-player title-button"
              onClick={() => {
                nav("/single-player-game");
              }}
            >
              singleplayer
            </button>
            <button
              className="multi-player title-button"
              onClick={() => {
                nav("/multi-player-menu");
              }}
            >
              multiplayer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
