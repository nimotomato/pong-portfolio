import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../../context/socket";

const JoinLobby = () => {
  const socket = useContext(SocketContext);

  const nav = useNavigate();
  const pwdRef = useRef();
  const idRef = useRef();

  const [rooms, setRooms] = useState();
  const [error, setError] = useState();

  const handleConnect = (event) => {
    event.preventDefault();
    if (idRef.current) {
      socket.emit("join-lobby", idRef.current.value);
    }
  };

  useEffect(() => {
    const handleJoinStatus = (data) => {
      if (data === "not-found") {
        setError("lobby does not exists, try another one");
      } else if (data === "full") {
        setError("lobby is full, try another one");
      } else if (data) {
        nav("/multi-player-game");
      }
    };

    socket.on("join-status", handleJoinStatus);

    // Clean up the socket event listeners when the component is unmounted
    return () => {
      socket.off("join-status", handleJoinStatus);
    };
  }, [socket]);

  useEffect(() => {
    const handleRooms = (data) => {
      setRooms(data);
    };
    // Subscribe to the "rooms" event when the component mounts
    socket.emit("request-rooms");

    socket.on("rooms", handleRooms);

    return () => {
      socket.off("rooms", handleRooms);
    };
  }, [socket]);

  const renderRooms = (rooms) => {
    if (!rooms || !rooms.length) {
      return <div>None found...</div>;
    }

    return rooms.map((room) => (
      <li className="room" key={rooms.indexOf(room)}>
        {room}
      </li>
    ));
  };

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
          <form className="game-mode-form">
            <h3 className="game-mode-title">join lobby</h3>
            <ul className="room-list">Active lobbies {renderRooms(rooms)}</ul>
            {error && renderErrors(error)}
            <input
              className="lobby-input"
              type="text"
              placeholder="lobby id"
              ref={idRef}
            ></input>
            <input type="password" placeholder="password" ref={pwdRef}></input>
            <button
              className="title-button lobby-connect"
              onClick={handleConnect}
            >
              connect
            </button>
            <button
              className="title-button lobby-return"
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

export default JoinLobby;
