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
  const [lastClueRoundTwo, setLastClue] = useState("?");
  const [lastClueClass, setLastClueClass] = useState(() => {
    if (props.round !== 1) {
      return "";
    } else {
      return " round-two-last-clue";
    }
  });
  const [lastClueContentClass, setLastClueContentClass] = useState(() => {
    if (props.round !== 1) {
      return "";
    } else {
      return "question-mark";
    }
  });
  //to make sure the timer disappears when it concludes
  const [timerWidth, setTimerWidth] = useState(91);
  const [timerColor, setTimerColor] = useState("#EF8354");

  /*
    Timer functionality
  */
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerWidth > 0 && !paused) {
        setTimerWidth(timerWidth - 0.0125);
        if (timerColor !== "#EF8354") {
          setTimerColor("#EF8354");
        }
      } else if (timerWidth <= 0 && !paused) {
        if (timerColor !== "#4F5D75") {
          setTimerColor("#4F5D75");
          setPaused(true);
        }
      }
    }, 10);
    return () => clearInterval(interval);
  });

  //Listen for KeyPress
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    //Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  function pause() {
    setPaused(!paused);
    if (timerWidth <= 0) {
      setTimerWidth(91);
    }
  }

  function reveal() {
    setRevealed(!revealed);
    if (props.round === 1) {
      setClue(3);
      setLastClueClass("");
      setLastClue(props.clues[3]);
      setLastClueContentClass("");
    }
  }

  function nextClue() {
    if (props.round < 1) {
      if (onClue < 3) {
        setClue(onClue + 1);
      }
    } else {
      if (onClue < 2) {
        setClue(onClue + 1);
      }
    }
  }

  function handleKeyPress(event) {
    if (event.keyCode === 32) {
      nextClue();
    } else if (event.keyCode === 13 || event.keyCode === 82) {
      reveal();
    } else if (event.keyCode === 80) {
      pause();
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

  let clueFormat;
  if (props.type === "pictures") {
    clueFormat =
    <div onClick={nextClue} id="clues">
      <div className="clue clue-image-container">
        <img alt="" className="clue-image" src={props.clues[0]}/>
      </div>
      <div className={onClue > 0 ? "clue clue-image-container" : "clue-hidden clue-image-container"}>
        {onClue > 0 &&
          <img alt="" className="clue-image" src={props.clues[1]}/>
        }
      </div>
      <div className={onClue > 1 ? "clue clue-image-container" : "clue-hidden clue-image-container"}>
        {onClue > 1 &&
          <img alt="" className="clue-image" src={props.clues[2]}/>
        }
      </div>
      <div className={onClue > 2 ? "clue clue-image-container"+lastClueClass : "clue-hidden clue-image-container"+lastClueClass}>
        {onClue > 2 && props.round !== 1 &&
          <img alt="" className="clue-image" src={props.clues[3]}/>
        }
        {onClue > 2 && props.round === 1 && revealed &&
          <img alt="" className="clue-image" src={props.clues[3]}/>
        }
        { props.round === 1 && !revealed &&
          <p className="question-mark">?</p>
        }
      </div>
    </div>;
  } else {
    clueFormat =
    <div onClick={nextClue} id="clues">
      <div className="clue">
        <p>{props.clues[0]}</p>
      </div>
      <div className={onClue > 0 ? "clue" : "clue-hidden"}>
        <p>{props.clues[1]}</p>
      </div>
      <div className={onClue > 1 ? "clue" : "clue-hidden"}>
        <p>{props.clues[2]}</p>
      </div>
      <div className={onClue > 2 ? "clue"+lastClueClass : "clue-hidden"+lastClueClass}>
        <p className={props.round === 0 ? "" : lastClueContentClass}>
          {props.round === 0 ? props.clues[3] : lastClueRoundTwo}
        </p>
      </div>
    </div>;
  }

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
            <p id="pause-hide" className="button-label side-label">{paused ? "Play" : "Pause"}</p>
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
        <h1 className={revealed ? "fade-in" : "fade-out"} id="answer">{revealed ? props.answer : ""}</h1>
        {clueFormat}
        <div id="timer-container">
          <div style={{ width: timerWidth + "vw", backgroundColor: timerColor}}id="timer-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Question;
