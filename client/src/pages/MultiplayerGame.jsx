import MultiplayerDriver from "../components/Multiplayer/MultiplayerDriver";

import { SocketContext, socket } from "../context/socket";

const MultiplayerGame = () => {
  return (
    <SocketContext.Provider value={socket}>
      <MultiplayerDriver />
    </SocketContext.Provider>
  );
};

export default MultiplayerGame;
