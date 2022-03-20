import React, { useState, useEffect } from 'react';
import xButton from "./Assets/Icons/x.png";
import nextButton from "./Assets/Icons/next.png";
import eyeButton from "./Assets/Icons/eye.png";

/**
  Rounded rectangle at the bottom of the screen that shrinks as the clue
  progresses.
**/
function TimerBar(props) {
  //will probably have to make timer-bar absolute positioned
  const [timeRemaining, setTimeRemaining] = useState(1000);
  return (
    <div id="timer-bar"></div>
  );
}

/**
  Question component displays the screen with the actual Only Connect question.
**/
function Question(props) {
  const [backPressed, setBackPressed] = useState(false);

  /**
    Returns the user to the SelectScreen when the back button is pressed
  **/
  useEffect(() => {
    if (backPressed) {
      props.back(-1);
    }
  }, [backPressed, props])

  return(
    <div id="question">
      <div id="all-buttons">
        <div className="button-container back-container">
          <div id="back-button" className="button" onClick={() => { setBackPressed(true); }}>
            <img src={xButton} alt="back button" id="back-image"/>
          </div>
          <p id="back-hide" className="button-label">Back</p>
        </div>
        <div id="side-buttons">
          <div className="button-container side-container">
            <div id="next-button" className="button side-button">
              <img src={nextButton} alt="next clue button" className="button-image"/>
            </div>
            <p id="next-hide" className="button-label side-label">Next clue</p>
          </div>
          <div className="button-container side-container">
            <div id="pause-button" className="button side-button">
            </div>
            <p id="pause-hide" className="button-label side-label">Pause/Play</p>
          </div>
          <div className="button-container side-container">
            <div id="reveal-button" className="button side-button">
              <img src={eyeButton} alt="reveal answers button" className="button-image"/>
            </div>
            <p id="reveal-hide" className="button-label side-label">Reveal</p>
          </div>
        </div>
      </div>
      <div id="info-timer-container">
        <h1 id="answer">{props.answer}</h1>
        <div id="clues">
          <div className="clue">
            <p>{props.clue[0]}</p>
          </div>
          <div className="clue">
            <p>{props.clue[1]}</p>
          </div>
          <div className="clue">
            <p>{props.clue[2]}</p>
          </div>
          <div className="clue">
            <p>{props.clue[3]}</p>
          </div>
        </div>
        <TimerBar />
      </div>
    </div>
  );
}

export default Question;
