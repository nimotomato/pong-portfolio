import { useNavigate } from "react-router-dom";
import { useRef, useContext, useState, useEffect } from "react";
import { SocketContext } from "../../context/socket";

const CreateLobby = () => {
  const socket = useContext(SocketContext);
  const nav = useNavigate();
  const pwdRef = useRef();
  const idRef = useRef();
  const [error, setError] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-lobby", idRef.current.value);
  };

  const info = document.querySelector(".info-text");
  if (info) {
    document.body.removeChild(info);
  }

  useEffect(() => {
    const handleCreate = (data) => {
      if (data) {
        nav("/multi-player-game");
      } else {
        setError("lobby already exists, try another one");
      }
    };
    socket.on("create-status", handleCreate);

    return () => {
      socket.off("create-status", handleCreate);
    };
  });

  const renderErrors = (errorString) => {
    if (errorString) {
      return <p className="error-string">{errorString}</p>;
    }
  };

  return (
    <div className="title-screen-container">
      <div className="title-screen">
        <h1>multiplayer</h1>
        <div className="info-container">
          <form onSubmit={onSubmit} className="game-mode-form">
            <h3 className="game-mode-title">create lobby</h3>
            {error && renderErrors(error)}
            <input
              className="lobby-input"
              type="text"
              placeholder="lobby id"
              ref={idRef}
            ></input>
            <input type="password" placeholder="password" ref={pwdRef}></input>
            <button className="title-button create-lobby">create lobby</button>
            <button
              className="title-button return"
              onClick={() => {
                nav("/multi-player-menu");
              }}
            >
              return
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLobby;
