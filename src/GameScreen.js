import SelectScreen from './SelectScreen.js';
import React, { useState } from 'react';

function RoundTile(props) {
  const [toggled, toggle] = useState(props.visited);
  return(
    <div className={toggled ? "question-tile active-tile" : "question-tile toggled-tile"}
      onClick={() => {
        toggle(!toggled);
        props.onChosen(props.number);
      }}>
      <p className="round-tile-label">{toggled ? props.text : ""}</p>
    </div>
  );
}

/**
  The screen where the user can select one of four rounds:
  1 & 2 - SelectScreen
**/
function GameScreen(props) {
  const [currentRound, setCurrentRound] = useState(-1);
  const [visitedRounds, setVisitedRounds] = useState([true, true, true, true]);
  const updateVisitedRounds = (number) => {
    let tempArray = visitedRounds;
    //if untoggling the Tile (gray -> white)
    if (!visitedRounds[number]) {
      tempArray[number] = true;
      setCurrentRound(-1);
    } else { //Tile was selected (white -> gray)
      tempArray[number] = false;
      setCurrentRound(number);
    }
    setVisitedRounds(tempArray);
  };

  if (currentRound < 0) {
    return (
      <div id="game-screen">
        <h1>Select a round</h1>
        <div id="round-tile-grid">
          <RoundTile number={0} visited={visitedRounds[0]}
            round={0} onChosen={updateVisitedRounds} text="1: Connections"/>
          <RoundTile number={1} visited={visitedRounds[1]}
            round={1} onChosen={updateVisitedRounds} text="2: Sequences"/>
            <p style={{color: "white"}}>Rounds 3 & 4 coming soon!</p>
        </div>
      </div>
    );
  } else {
    if (currentRound < 2) {
      return (
        <SelectScreen round={currentRound} data={props.data} back={setCurrentRound}/>
      );
    } else if (currentRound < 3) {

    } else {

    }
  }
}

export default GameScreen;
