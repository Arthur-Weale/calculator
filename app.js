const first = document.querySelector(".first");
const second = document.querySelector(".second");
const result = document.querySelector(".result");
const plus = document.querySelector(".add");
const minus = document.querySelector(".sub");
const times = document.querySelector(".mult");
const divided = document.querySelector(".div");
const equals = document.querySelector(".equal")


// let firstDigit = 1;
// let secondDigit = 2;
// let operatorSymbol = "+" ;

// const operate = function (firstNum, operatorSymb, secondNum) {
//     let calc = (firstNum +operatorSymb+ secondNum);
//     console.log(parseInt(calc)); //This is wrong it has to be fixed.
// }

// operate(firstDigit,operatorSymbol, secondDigit);

let currentNumber = "";
let previousNumber = "";
let operator = "";

function handleDigitClick (digit) {
    currentNumber += digit.toString();
    console.log(currentNumber);
}    

handleDigitClick(1);
handleDigitClick(2);