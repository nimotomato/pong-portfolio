import { useState } from "react";
import CreateLobby from "../components/Multiplayer/CreateLobby";
import MultiplayerDriver from "../components/Multiplayer/MultiplayerDriver";

import { SocketContext, socket } from "../context/socket";

const CreateLobbyPage = () => {
  const [joined, setJoined] = useState(false);

  return joined ? (
    <SocketContext.Provider value={socket}>
      <MultiplayerDriver room={joined} />
    </SocketContext.Provider>
  ) : (
    <SocketContext.Provider value={socket}>
      <CreateLobby joined={setJoined} />
    </SocketContext.Provider>
  );
};

export default CreateLobbyPage;
