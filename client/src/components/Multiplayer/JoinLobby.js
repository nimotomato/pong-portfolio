import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";

const JoinLobby = ({ joined }) => {
  const socket = useContext(SocketContext);

  const nav = useNavigate();
  const [idInput, setIdInput] = useState();
  const [pwdInput, setPwdInput] = useState();
  const [rooms, setRooms] = useState();

  const handleConnect = (event) => {
    event.preventDefault();
    const room = idInput;
    socket.emit("join-lobby", room);
  };

  useEffect(() => {
    const handleJoinStatus = (data) => {
      if (data) {
        joined(data);
      } else if (data === "not-found") {
        alert("lobby does not exists, try another one");
      } else if (data === "full") {
        alert("lobby full, try another one");
      }
    };

    socket.on("join-status", handleJoinStatus);

    // Clean up the socket event listeners when the component is unmounted
    return () => {
      socket.off("join-status", handleJoinStatus);
    };
  }, [joined, socket]);

  useEffect(() => {
    // Subscribe to the "rooms" event when the component mounts
    socket.emit("request-rooms");

    socket.on("rooms", (data) => {
      setRooms(data);
    });
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

  return (
    <div className="title-screen">
      <h1>multiplayer</h1>
      <div className="info-container">
        <form className="game-mode-form">
          <h3 className="game-mode-title">join lobby</h3>
          <ul className="room-list">Active lobbies {renderRooms(rooms)}</ul>
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

export default JoinLobby;
