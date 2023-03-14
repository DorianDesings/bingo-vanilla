import '../scss/styles.scss';

const userBoardElement = document.getElementById('user-board');
const pcBoardElement = document.getElementById('pc-board');
const bingoBoardElement = document.getElementById('bingo-board');
const buttonStartElement = document.getElementById('button-start');
const buttonRestartElement = document.getElementById('button-restart');
const gameTextElement = document.getElementById('game-text');
let numbersToPlay = Array(99)
  .fill()
  .map((_, index) => index + 1);
let winner = false;
let timeoutId;

const generateNumber = () => Math.floor(Math.random() * 99 + 1);

const generateNumbersOfBoard = () => {
  const newNumbers = [];
  while (newNumbers.length < 15) {
    const randomNumber = generateNumber();
    if (!newNumbers.includes(randomNumber)) {
      newNumbers.push(randomNumber);
    }
  }
  return newNumbers;
};

const fillBoard = board => {
  const numbers = generateNumbersOfBoard();
  const fragment = document.createDocumentFragment();
  for (const number of numbers) {
    const newNumber = document.createElement('span');
    newNumber.classList.add('number');
    newNumber.textContent = number;
    newNumber.dataset.number = number;
    fragment.append(newNumber);
  }
  board.append(fragment);
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
  extractNumberEvery2Seconds();
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
  if (numbersToPlay.length > 0 && !winner) {
    const newRandomNumber = extractRandomNumber();
    gameTextElement.textContent = `Número: ${newRandomNumber}`;
    bingoBoardElement.children[newRandomNumber - 1].classList.add(
      'number-appeared'
    );

    [...userBoardElement.children].forEach(number => {
      if (Number(number.dataset.number) === newRandomNumber)
        number.classList.add('number-user-correct');
    });

    [...pcBoardElement.children].forEach(number => {
      if (Number(number.dataset.number) === newRandomNumber)
        number.classList.add('number-pc-correct');
    });

    buttonStartElement.classList.add('hide');
    checkWin();

    timeoutId = setTimeout(extractNumberEvery2Seconds, 200);
  }
};

fillBoard(userBoardElement);
fillBoard(pcBoardElement);
buttonRestartElement.classList.add('hide');
gameTextElement.classList.add('hide');
buttonStartElement.addEventListener('click', extractNumberEvery2Seconds);
buttonRestartElement.addEventListener('click', restartGame);
