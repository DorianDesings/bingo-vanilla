import '../scss/styles.scss';
import { fillBoard } from './board';
import {
  buttonRestartElement,
  buttonStartElement,
  pcBoardElement,
  userBoardElement
} from './elements';
import { extractNumberEvery2Seconds, restartGame } from './game';

fillBoard(userBoardElement);
fillBoard(pcBoardElement);
buttonStartElement.addEventListener('click', extractNumberEvery2Seconds);
buttonRestartElement.addEventListener('click', restartGame);
