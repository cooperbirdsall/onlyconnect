import SelectScreen from './SelectScreen.js';

function GameScreen(props) {
  return (
    <SelectScreen data={props.data} round={0}/>
  );
}

export default GameScreen;
