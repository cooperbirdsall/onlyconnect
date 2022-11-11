import React, { useState } from 'react';

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

export default QuestionTile;
