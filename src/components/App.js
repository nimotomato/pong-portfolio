import '../styles/App.css';

import Titlescreen from './Titlescreen';
import Singleplayer from './Singleplayer';
import Lobby from './Lobby';

import { useEffect, useState } from 'react';


function App() {
  // Keep track of if user made choice and what choice
  const [selected, setSelected] = useState(false);


  // Called from title screen. Sets selected as button class name.
  const handleSelection = (event) => {
    setSelected(event)
  }


  // Returns the correct component depending on button clicked. 
  const handleChoice = (selected) => {
    if (selected.target.className === "single-player title-button"){
      return <Singleplayer />;
    } else if (selected.target.className === "multi-player title-button"){
      return <Lobby />;
    }
  }
  

  return (
    // Renders title screen if no choice made
    <div>
      {selected ? 
        handleChoice(selected) :
        <Titlescreen handleSelection={handleSelection}/>}
    </div>
  );
}


export default App;