import React, { useState, useEffect } from 'react';
import xButton from "./Assets/Icons/x.png";

function Wall(props) {
  const [backPressed, setBackPressed] = useState(false);
  const [selection, setSelection] = useState([]);
  const [currentColor, setCurrentColor] = useState("green");

  function tileSelected(newState) {

  }

  /**
    Returns the user to the GameScreen when the back button is pressed
  **/
  useEffect(() => {
    if (backPressed) {
      props.back(-1);
    }
  }, [backPressed, props])

  let tiles = [];
  props.groups.forEach((group, groupNumber) => {
    group.clues.forEach((clue) => {
      tiles.push(
        <WallTile text={clue}
          groupNumber={groupNumber} color={currentColor} onSelected={tileSelected()}/>
      );
    });
  });
  //randomize order in which to display tiles
  tiles = tiles.sort(() => Math.random() - 0.5);

  return(
    <div>
      <div id="top-menu">
        <div className="button-container back-container">
          <div id="back-button" className="button" onClick={() => { setBackPressed(true); }}>
            <img src={xButton} alt="back button" id="back-image"/>
          </div>
          <p id="back-hide" className="button-label">Back</p>
        </div>
      </div>
      <div id="wall-tile-wrapper">
        <div className="wall-tile-row">
          {tiles.slice(0,4)}
        </div>
        <div className="wall-tile-row">
          {tiles.slice(4,8)}
        </div>
        <div className="wall-tile-row">
          {tiles.slice(8,12)}
        </div>
        <div className="wall-tile-row">
          {tiles.slice(12)}
        </div>
      </div>
    </div>
  );
}

function WallTile(props) {
  const [selected, toggle] = useState(false);
  return(
    <div className="wall-tile"
      onClick={() => {
        if (selected) {
          //turn background to that of the props.currentColor
          //add props.text & groupNumber to setSelection with some props function
          //toggle(!toggle)
        } else {
          //turn background back to default
          //remove props.text from setSelection
          //toggle(!toggle)
        }
      }}>
      <p>{props.text}</p>
    </div>
  );
}

export default Wall;
