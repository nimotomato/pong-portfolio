import { io } from "socket.io-client";
import { createContext } from "react";

export const socket = io.connect("http://localhost:3001");
export const SocketContext = createContext();
