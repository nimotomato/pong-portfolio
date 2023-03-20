import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import JoinLobby from "../components/Multiplayer/JoinLobby";
import MultiplayerDriver from "../components/Multiplayer/MultiplayerDriver";

import { io } from "socket.io-client";

const MultiplayerMenu = () => {
  const socket = useRef(io("http://localhost:3001"));

  const [joined, setJoined] = useState(false);

  return joined ? (
    <MultiplayerDriver socket={socket.current} />
  ) : (
    <JoinLobby socket={socket.current} joined={setJoined} />
  );
};

export default MultiplayerMenu;
