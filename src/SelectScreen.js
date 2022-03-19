import turtle from './Assets/Emoji/turtle.png';
import mouth from './Assets/Emoji/mouth.png';
import cowboy from './Assets/Emoji/cowboy.png';
import men from './Assets/Emoji/men.png';
import clown from './Assets/Emoji/clown.png';
import nail from './Assets/Emoji/nail.png';
import React, { useState } from 'react';
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
  //second round (from props?) should just multiply by 2
  //otherwise maybe 2nd round handled here not via props
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [visitedQuestions, setVisitedQuestions] = useState([true, true, true, true, true, true]);
  const updateVisitedQuestions = (number) => {
    let tempArray = visitedQuestions;
    //if untoggling the Tile (gray -> white)
    if (!visitedQuestions[number - 1]) {
      tempArray[number - 1] = true;
      setCurrentQuestion(-1);
    } else { //Tile was selected (white -> gray)
      tempArray[number - 1] = false;
      setCurrentQuestion(number);
    }
    setVisitedQuestions(tempArray);
  };

  if (currentQuestion < 0) {
    return(
      <div id="select-screen">
        <h1>Select a tile</h1>
        <div id="tile-grid">
          <QuestionTile emoji={turtle} number={1} visited={visitedQuestions[0]}
            alt="turtle" onChosen={updateVisitedQuestions} />
          <QuestionTile emoji={mouth} number={2} visited={visitedQuestions[1]}
            alt="mouth" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={cowboy} number={3} visited={visitedQuestions[2]}
            alt="cowboy" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={men} number={4} visited={visitedQuestions[3]}
            alt="men" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={clown} number={5} visited={visitedQuestions[4]}
            alt="clown" onChosen={updateVisitedQuestions}/>
          <QuestionTile emoji={nail} number={6} visited={visitedQuestions[5]}
            alt="nail" onChosen={updateVisitedQuestions}/>
        </div>
      </div>
    );
  } else {
    return(
      <Question back={setCurrentQuestion}/>
    );
  }

}

export default SelectScreen;
