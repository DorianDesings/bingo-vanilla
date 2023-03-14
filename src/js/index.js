import '../scss/styles.scss';

const userBoardElement = document.getElementById('user-board');
const pcBoardElement = document.getElementById('pc-board');
const bingoBoardElement = document.getElementById('bingo-board');
const buttonElement = document.getElementById('button');
const gameTextElement = document.getElementById('game-text');
const userNumbers = [];
const pcNumbers = [];
let numbersToPlay = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
];
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

const checkWin = () => {
  const userChecks = document.querySelectorAll('.number-user-correct');
  const pcChecks = document.querySelectorAll('.number-pc-correct');
  if (userChecks.length === 15) {
    winner = true;
    console.log('GANASTE');
  } else if (pcChecks.length === 15) {
    winner = true;
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

    checkWin();

    timeoutId = setTimeout(extractNumberEvery2Seconds, 200);
  }
};

fillBoard(userBoardElement);
fillBoard(pcBoardElement);
buttonElement.addEventListener('click', extractNumberEvery2Seconds);
