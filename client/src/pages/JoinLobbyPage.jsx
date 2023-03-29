import { useState, useEffect } from "react";
import JoinLobby from "../components/Multiplayer/JoinLobby";
import MultiplayerDriver from "../components/Multiplayer/MultiplayerDriver";
import { useNavigate } from "react-router-dom";

import { SocketContext, socket } from "../context/socket";

const JoinLobbyPage = () => {
  return (
    <SocketContext.Provider value={socket}>
      <JoinLobby />
    </SocketContext.Provider>
  );
};

export default JoinLobbyPage;
