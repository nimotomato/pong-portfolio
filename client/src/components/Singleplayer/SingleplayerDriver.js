import "../../styles/Singleplayer.css";

import Board from "./SinglePlayerBoard";
import Score from "./SinglePlayerScore";

import { useEffect, useState } from "react";

function Singleplayer() {
  // Keep track of if game is started and how many rounds.
  const [start, setStart] = useState(false);

  // Rounds used to reset board.
  const [round, setRound] = useState(0);

  // Creates the info title or removes it if game has started.
  if (!start) {
    const info = document.querySelector(".info-text");
    if (!info) {
      const startInfo = document.createElement("div");
      startInfo.classList = "info-text";
      if (window.innerWidth > 1025) {
        startInfo.textContent = "PRESS ANY KEY TO START THE GAME";
      } else {
      }
      document.body.appendChild(startInfo);
    }
  } else {
    const info = document.querySelector(".info-text");
    if (info) {
      document.body.removeChild(info);
    }
  }

  // Adds eventlistener to regulate start of game
  useEffect(() => {
    document.addEventListener("keypress", () => {
      setStart(true);
    });
    document.addEventListener("touchstart", () => {
      setStart(true);
    });

    // Cleanup eventlistener to not keep them stacked.
    return () => {
      document.removeEventListener("keypress", () => {
        setStart(true);
      });
      document.removeEventListener("touchstart", () => {
        setStart(true);
      });
    };
  });

  // Keep track of scores
  const [scores, setScores] = useState({
    playerOne: 0,
    playerTwo: 0,
  });

  const handleScores = (player) => {
    if (player === "left") {
      setScores({
        playerTwo: scores.playerTwo + 1,
        playerOne: scores.playerOne,
      });
    } else if (player === "right") {
      setScores({
        playerOne: scores.playerOne + 1,
        playerTwo: scores.playerTwo,
      });
    }
  };

  // Resets game on score
  useEffect(() => {
    setStart(false);
    setRound(round + 1);
  }, [scores]);

  return (
    <div>
      <div className="board-container">
        <Score playerOne={scores.playerOne} playerTwo={scores.playerTwo} />
        <Board hasStarted={start} handleScores={handleScores} key={round} />
      </div>
    </div>
  );
}

export default Singleplayer;
