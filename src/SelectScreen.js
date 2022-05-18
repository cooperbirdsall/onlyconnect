import turtle from './Assets/Emoji/turtle.png';
import mouth from './Assets/Emoji/mouth.png';
import cowboy from './Assets/Emoji/cowboy.png';
import men from './Assets/Emoji/men.png';
import clown from './Assets/Emoji/clown.png';
import nail from './Assets/Emoji/nail.png';
import xButton from "./Assets/Icons/x.png";
import React, { useState, useEffect } from 'react';
import Question from './Question.js';

/**
  One of the individual tiles with an icon. Will toggle itself when pressed.
**/
function QuestionTile(props) {
  const [toggled, toggle] = useState(props.visited);
  return(
    <div className={toggled ? "question-tile active-tile" : "question-tile toggled-tile"}
      onClick={() => {
        toggle(!toggled);
        props.onChosen(props.number);
      }}>
      <img src={props.emoji} className="tile-emoji" alt={props.alt} hidden={!toggled}/>
    </div>
  );
}

/**
  The main screen of the round. Will display the tile grid until the user selects
  a QuestionTile, at which point the SelectScreen will display the appropriate
  Question.
**/
function SelectScreen(props) {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [visitedQuestions, setVisitedQuestions] = useState([true, true, true, true, true, true]);
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
        <h1>Select a tile</h1>
        <div id="tile-grid">
          <QuestionTile emoji={turtle} number={0} visited={visitedQuestions[0]}
            alt="turtle" onChosen={updateVisitedQuestions} />
          <QuestionTile emoji={mouth} number={1} visited={visitedQuestions[1]}
            alt="mouth" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={cowboy} number={2} visited={visitedQuestions[2]}
            alt="cowboy" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={men} number={3} visited={visitedQuestions[3]}
            alt="men" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={clown} number={4} visited={visitedQuestions[4]}
            alt="clown" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={nail} number={5} visited={visitedQuestions[5]}
            alt="nail" onChosen={updateVisitedQuestions}/>
        </div>
      </div>
    );
  } else {
    return(
      <Question back={setCurrentQuestion}
        clues={props.data[props.round][currentQuestion].clue}
        answer={props.data[props.round][currentQuestion].answer}
        round={props.round} type={props.data[props.round][currentQuestion].type}/>
    );
  }

}

export default SelectScreen;
