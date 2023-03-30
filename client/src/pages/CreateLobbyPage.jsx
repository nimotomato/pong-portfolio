import CreateLobby from "../components/Multiplayer/CreateLobby";

import { SocketContext, socket } from "../context/socket";

const CreateLobbyPage = () => {
  return (
    <SocketContext.Provider value={socket}>
      <CreateLobby />
    </SocketContext.Provider>
  );
};

export default CreateLobbyPage;
