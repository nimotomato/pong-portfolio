import { useNavigate } from "react-router-dom";
import { useState } from "react";

const JoinLobby = ({ socket, joined }) => {
  console.log(socket);
  const nav = useNavigate();
  const [idInput, setIdInput] = useState();
  const [pwdInput, setPwdInput] = useState();

  const handleConnect = (event) => {
    event.preventDefault();
    joined.current = true;
    console.log(joined);
  };

  return (
    <div className="title-screen">
      <h1>multiplayer</h1>
      <p>
        You do not need to create a lobby, simply join one with the same ID and
        password as the user you want to play with.
      </p>
      <div className="info-container">
        <form className="game-mode-form">
          <h3 className="game-mode-title">join lobby</h3>
          <input
            className="lobby-input"
            type="text"
            placeholder="lobby id"
            onChange={(event) => setIdInput(event.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            onChange={(event) => setPwdInput(event.target.value)}
          ></input>
          <button
            className="title-button lobby-connect"
            onClick={handleConnect}
          >
            connect
          </button>
          <button
            className="title-button lobby-return"
            onClick={() => {
              nav("/");
            }}
          >
            return
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinLobby;
