import React, { useState, useEffect } from 'react';
import QuestionTile from './QuestionTile.js';
import Wall from './Wall.js';
import xButton from "./Assets/Icons/x.png";
import chinesefood from './Assets/Emoji/chinesefood.png';
import beer from './Assets/Emoji/beer.png';

function ConnectingWallMenu(props) {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [visitedQuestions, setVisitedQuestions] = useState([true, true]);
  const updateVisitedQuestions = (number) => {
    let tempArray = visitedQuestions;
    //if untoggling the Tile (gray -> white)
    if (!visitedQuestions[number]) {
      tempArray[number] = true;
      setCurrentQuestion(-1);
    } else { //Tile was selected (white -> gray)
      tempArray[number] = false;
      setCurrentQuestion(number);
    }
    setVisitedQuestions(tempArray);
  };
  const [backPressed, setBackPressed] = useState(false);

  /**
    Returns the user to the GameScreen when the back button is pressed
  **/
  useEffect(() => {
    if (backPressed) {
      props.back(-1);
    }
  }, [backPressed, props])

  if (currentQuestion < 0) {
    return(
      <div id="select-screen">
        <div id="top-menu">
          <div className="button-container back-container">
            <div id="back-button" className="button" onClick={() => { setBackPressed(true); }}>
              <img src={xButton} alt="back button" id="back-image"/>
            </div>
            <p id="back-hide" className="button-label">Back</p>
          </div>
        </div>
        <h1>Select a wall</h1>
        <div id="tile-grid">
          <QuestionTile emoji={beer} number={0} visited={visitedQuestions[0]}
            alt="turtle" onChosen={updateVisitedQuestions} />
          <QuestionTile emoji={chinesefood} number={1} visited={visitedQuestions[1]}
            alt="mouth" onChosen={updateVisitedQuestions}/>
        </div>
      </div>
    );
  } else {
    return(
      <Wall back={setCurrentQuestion} groups={props.data[2][currentQuestion]}/>
    );
  }
}

export default ConnectingWallMenu;
