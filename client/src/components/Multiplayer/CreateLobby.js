import { useNavigate } from "react-router-dom";
import { useRef, useContext, useEffect } from "react";
import { SocketContext } from "../../context/socket";

const CreateLobby = ({ joined }) => {
  const socket = useContext(SocketContext);
  const nav = useNavigate();
  const pwdRef = useRef();
  const idRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-lobby", idRef.current.value);
  };

  socket.on("create-status", (data) => {
    console.log(data);
    if (data) {
      joined(data);
    } else {
      alert("lobby name already exists, try another one");
      joined(false);
    }
  });

  return (
    <div className="title-screen">
      <h1>multiplayer</h1>
      <div className="info-container">
        <form onSubmit={onSubmit} className="game-mode-form">
          <h3 className="game-mode-title">create lobby</h3>
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
  );
};

export default CreateLobby;
