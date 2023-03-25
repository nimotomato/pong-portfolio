import { useState, useRef } from "react";
import JoinLobby from "../components/Multiplayer/JoinLobby";
import MultiplayerDriver from "../components/Multiplayer/MultiplayerDriver";

import { SocketContext, socket } from "../context/socket";

const JoinLobbyPage = () => {
  const [joined, setJoined] = useState(false);

  return joined ? (
    <SocketContext.Provider value={socket}>
      <MultiplayerDriver room={joined} />
    </SocketContext.Provider>
  ) : (
    <SocketContext.Provider value={socket}>
      <JoinLobby joined={setJoined} />
    </SocketContext.Provider>
  );
};

export default JoinLobbyPage;
