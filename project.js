//All the importing packages should be at the top
//then, all the libraries.
const prompt = require("prompt-sync")();

//then all the global variables and it should be in Capital, thats a JavaScript convention
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

//1. deposit some money
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0)
      console.log("invalid deposit amount, try again");
    else return numberDepositAmount;
  }
};

//2. determine the no. of lines to bet on
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3)
      console.log("invalid deposit amount, try again");
    else return numberOfLines;
  }
};

//3. collect a bet amount
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines)
      console.log("invalid bet, try again");
    else return numberBet;
  }
};

//4. spin the slot machine
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  // console.log(symbols);
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      // console.log(reelSymbols.length);
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      // console.log(randomIndex);
      const selectedSymbol = reelSymbols[randomIndex];
      // console.log(selectedSymbol);
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
      // console.log(reelSymbols);
    }
  }
  return reels;
};

//transposing the matrix
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};


const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) rowString += " | ";
    }
    console.log(rowString);
  }
};

//5. check if user won
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) winnings += bet * SYMBOL_VALUES[symbols[0]];
  }
  return winnings;
};

//6. give the user their winnings.
//7. play again
const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balance of $" +balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    // console.log(reels);
    const rows = transpose(reels);
    // console.log(rows);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings);

    if(balance <= 0){
        console.log("you ran out of money!");
        break;
    }

    const playAgain = prompt("Do you want to play again (y/n) ?");
    if(playAgain != "y")
        break;
  }
};

//below is acting as entry point for program which should be always at end of the file.
game();
