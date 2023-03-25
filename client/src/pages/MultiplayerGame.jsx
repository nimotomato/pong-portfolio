import MultiplayerDriver from "../components/Multiplayer/MultiplayerDriver";

import { SocketContext, socket } from "../context/socket";

// NOT IMPLEMENTED, but would clean up urls. Also move entire Multipalyer Driver here why not

const MultiplayerGame = () => {
  <SocketContext.Provider value={socket}>
    <MultiplayerDriver />
  </SocketContext.Provider>;
};

export default MultiplayerGame;
