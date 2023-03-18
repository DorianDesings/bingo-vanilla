import { generateNumber } from './utils';

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

export { fillBoard };
