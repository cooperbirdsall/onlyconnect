import React, { useState, useEffect } from 'react';
import xButton from "./Assets/Icons/x.png";

function Wall(props) {
  const [backPressed, setBackPressed] = useState(false);
  const [selection, setSelection] = useState([]);
  const [currentColor, setCurrentColor] = useState("rgb(63, 137, 235)");
  //32	69	118	(blue) 42, 91, 156,,, 63, 137, 235
  //72	137	114	(green)
  //88	20	61	(burgundy)
  //58	129	142	(teal)

  /**
    Called by a WallTile when it is clicked to update the selection
    Then, check selection and evaluate
      newState:     true if selected, false if deselected
      text:         the clue itself
      groupNumber:  answer group the clue belongs to
  **/
  function tileSelected(newState, text, groupNumber) {
    const newSelection = selection;
    if (newState) {
      newSelection.push([text, groupNumber]);
      setSelection(newSelection);
      if (selection.length === 4) {
        if (selection[0][1] === selection[1][1] &&
          selection[0][1] === selection[2][1] &&
          selection[0][1] === selection[3][1]) {
            console.log("correct");
        } else {

        }
      }
    } else {
      const index = newSelection.indexOf([text, groupNumber]);
      if (index > -1) {
        newSelection.splice(index, 1);
        setSelection(newSelection);
      }
    }
  }

  /**
    Returns the user to the GameScreen when the back button is pressed
  **/
  useEffect(() => {
    if (backPressed) {
      props.back(-1);
    }
  }, [backPressed, props]);

  let tiles = [];
  props.groups.forEach((group, groupNumber) => {
    group.clues.forEach((clue) => {
      tiles.push(
        <WallTile text={clue} key={clue}
          groupNumber={groupNumber} color={currentColor} onSelected={tileSelected}/>
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
      style={{backgroundColor: selected ? props.color : "#E5E5E5"}}
      onClick={() => {
        toggle(!selected);
        console.log("selected", props.text, !selected);
        props.onSelected(!selected, props.text, props.groupNumber);
      }}>
      <p>{props.text}</p>
    </div>
  );
}

export default Wall;
