import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import JoinLobby from "../components/Multiplayer/JoinLobby";
import MultiplayerDriver from "../components/Multiplayer/MultiplayerDriver";

import { io } from "socket.io-client";

const MultiplayerMenu = () => {
  const socket = io("http://localhost:3001");

  const joined = useRef(false);

  // TO DO: FIX SETUP THIS REFRESHES CONNECTION MANY TIMS TURN OFF STRICT MODE?=

  return joined ? (
    <MultiplayerDriver socket={socket} />
  ) : (
    <JoinLobby socket={socket} joined={joined} />
  );
};

export default MultiplayerMenu;
