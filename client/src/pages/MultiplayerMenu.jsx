import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const MultiplayerMenu = () => {
  const nav = useNavigate();

  return (
    <div className="title-screen-container">
      <div className="title-screen">
        <h1>multiplayer</h1>
        <div className="info-container">
          <button
            className="title-button create-lobby"
            onClick={() => {
              nav("/create-lobby");
            }}
          >
            create lobby
          </button>
          <button
            className="title-button join-lobby"
            onClick={() => {
              nav("/join-lobby");
            }}
          >
            join lobby
          </button>
          <button
            className="title-button return"
            onClick={() => {
              nav("/");
            }}
          >
            return
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerMenu;
