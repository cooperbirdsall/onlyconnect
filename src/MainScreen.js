import GameScreen from './GameScreen.js';
import { data } from './Assets/Games/game2.js';

function MainScreen() {
  return (
    <GameScreen data={data}/>
  );
}

export default MainScreen;
