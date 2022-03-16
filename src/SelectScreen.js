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
  const [toggled, toggle] = useState(true);
  return(
    <div className={toggled ? "question-tile active-tile" : "question-tile toggled-tile"}
      onClick={() => {
        toggle(!toggled);
        if (toggled) {
          props.chosen(props.number);
        } else {
          props.chosen(-1);
        }
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
  if (currentQuestion < 0) {
    return(
      <div id="select-screen">
        <h1>Select a tile</h1>
        <div id="tile-grid">
          <QuestionTile emoji={turtle} number={1} alt="turtle" chosen={setCurrentQuestion}/>
          <QuestionTile emoji={mouth} number={2} alt="mouth" chosen={setCurrentQuestion}/>
          <QuestionTile emoji={cowboy} number={3} alt="cowboy" chosen={setCurrentQuestion}/>
          <QuestionTile emoji={men} number={4} alt="men" chosen={setCurrentQuestion}/>
          <QuestionTile emoji={clown} number={5} alt="clown" chosen={setCurrentQuestion}/>
          <QuestionTile emoji={nail} number={6} alt="nail" chosen={setCurrentQuestion}/>
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
