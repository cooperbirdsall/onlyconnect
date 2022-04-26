import React, { useState, useEffect } from 'react';
import xButton from "./Assets/Icons/x.png";
import nextButton from "./Assets/Icons/next.png";
import eyeButton from "./Assets/Icons/eye.png";
import pauseButton from "./Assets/Icons/pause.png";
import playButton from "./Assets/Icons/play.png";

/**
  Question component displays the screen with the actual Only Connect question.
**/
function Question(props) {
  const [backPressed, setBackPressed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [onClue, setClue] = useState(0);
  const [timerWidth, setTimerWidth] = useState(91);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerWidth > 0 && !paused) {
        setTimerWidth(timerWidth - 0.05);
      }
    }, 10);
    return () => clearInterval(interval);
  });

  function pause() {
    setPaused(!paused);
    if (timerWidth <= 0) {
      setTimerWidth(91);
    }
  }

  function reveal() {
    setRevealed(!revealed);
  }

  function nextClue() {
    if (onClue < 3) {
      setClue(onClue + 1);
    }
  }

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
      <div id="top-menu">
        <div className="button-container back-container">
          <div id="back-button" className="button" onClick={() => { setBackPressed(true); }}>
            <img src={xButton} alt="back button" id="back-image"/>
          </div>
          <p id="back-hide" className="button-label">Back</p>
        </div>
        {/*put team here*/}
        <div id="side-buttons">
          <div className="button-container side-container">
            <div onClick={nextClue} id="next-button" className="button side-button">
              <img src={nextButton} alt="next clue button" className="button-image"/>
            </div>
            <p id="next-hide" className="button-label side-label">Next clue</p>
          </div>
          <div className="button-container side-container">
            <div onClick={pause} id="pause-button" className="button side-button">
              <img src={paused ? playButton : pauseButton} alt="pause and play button"
                id={paused ? "play-image" : "pause-image"}/>
            </div>
            <p id="pause-hide" className="button-label side-label">{paused ? "Resume" : "Pause"}</p>
          </div>
          <div className="button-container side-container">
            <div onClick={reveal} id="reveal-button" className="button side-button">
              <img src={eyeButton} alt="reveal answers button" className="button-image"/>
            </div>
            <p id="reveal-hide" className="button-label side-label">Reveal</p>
          </div>
        </div>
      </div>
      <div id="info-timer-container">
        <h1 className={revealed ? "fade-in" : "fade-out"}id="answer">{revealed ? props.answer : ""}</h1>
        <div id="clues">
          <div className="clue">
            <p>{props.clues[0]}</p>
          </div>
          <div className={onClue > 0 ? "clue" : "clue-hidden"}>
            <p>{props.clues[1]}</p>
          </div>
          <div className={onClue > 1 ? "clue" : "clue-hidden"}>
            <p>{props.clues[2]}</p>
          </div>
          <div className={onClue > 2 ? "clue" : "clue-hidden"}>
            <p>{props.clues[3]}</p>
          </div>
        </div>
        <div id="timer-container">
          <div style={{ width: timerWidth + "vw" }}id="timer-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Question;
