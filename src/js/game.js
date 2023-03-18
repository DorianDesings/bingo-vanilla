import {
  buttonRestartElement,
  buttonStartElement,
  pcBoardElement,
  userBoardElement
} from './elements';

const gameTextElement = document.getElementById('game-text');
let numbersToPlay = Array(99)
  .fill()
  .map((_, index) => index + 1);
let winner = false;
let timeoutId;

const checkCorrectNumber = (newRandomNumber, board, className) => {
  [...board.children].forEach(number => {
    if (Number(number.dataset.number) === newRandomNumber)
      number.classList.add(className);
  });
};

const checkWin = () => {
  const userChecks = document.querySelectorAll('.number-user-correct');
  const pcChecks = document.querySelectorAll('.number-pc-correct');
  if (userChecks.length === 15) {
    winner = true;
    buttonRestartElement.classList.remove('hide');
    console.log('GANASTE');
  } else if (pcChecks.length === 15) {
    winner = true;
    buttonRestartElement.classList.remove('hide');
    console.log('PERDISTE');
  }
};

// Función para extraer un número aleatorio del array
const extractRandomNumber = () => {
  const index = Math.floor(Math.random() * numbersToPlay.length);
  // Extraemos el elemento correspondiente a ese índice
  const number = numbersToPlay[index];
  // Eliminamos ese elemento del array
  numbersToPlay.splice(index, 1);
  // Devolvemos el número extraído
  return number;
};

const extractNumberEvery2Seconds = () => {
  clearTimeout(timeoutId);
  gameTextElement.classList.remove('hide');
  if (numbersToPlay.length > 0 && !winner) {
    const newRandomNumber = extractRandomNumber();
    gameTextElement.textContent = `Número: ${newRandomNumber}`;
    document
      .querySelector(`[data-bingo='${newRandomNumber}']`)
      .classList.add('number-appeared');

    checkCorrectNumber(
      newRandomNumber,
      userBoardElement,
      'number-user-correct'
    );
    checkCorrectNumber(newRandomNumber, pcBoardElement, 'number-pc-correct');

    buttonStartElement.classList.add('hide');
    checkWin();

    timeoutId = setTimeout(extractNumberEvery2Seconds, 200);
  }
};

const restartGame = () => {
  numbersToPlay = Array(99)
    .fill()
    .map((_, index) => index + 1);
  winner = false;
  timeoutId = undefined;
  [...bingoBoardElement.children].forEach(element =>
    element.classList.remove('number-appeared')
  );
  [...userBoardElement.children].forEach(element =>
    element.classList.remove('number-user-correct')
  );

  [...pcBoardElement.children].forEach(element =>
    element.classList.remove('number-pc-correct')
  );
  buttonRestartElement.classList.add('hide');
  extractNumberEvery2Seconds();
};

export {
  checkCorrectNumber,
  checkWin,
  extractNumberEvery2Seconds,
  restartGame
};
