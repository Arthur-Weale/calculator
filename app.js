
let firstNumber = "";
let secondNumber = "";
let operator = null;
let justCalculated = false;
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector("input");
const equals = document.querySelector(".equals")
const clear = document.querySelector(".clear");
const deleteEntry = document.querySelector(".del");

display.value = 0;

clear.addEventListener("click", ()=> {
    display.value = "";
    firstNumber = "";
    secondNumber = "";
    operator = null;
    display.value = 0;
    
})

deleteEntry.addEventListener("click", ()=> {
    if(operate === null){
        firstNumber = firstNumber.slice(0,-1);
    }else{
        secondNumber = secondNumber.slice(0,-1);
    }
    display.value = display.value.slice(0,-1);
})

// function isOpNum(){
//     return /^[0-9+\-*/]$/
// }

let regex = /^[0-9+\-*/]$/;
//let checked = check.test()

document.addEventListener("keydown", (e) =>{
    const pressedKey = e.key;

    if(display.value === "0") {
        display.value = ""; 
    }

    if (justCalculated && operator === null && firstNumber !== "") {
        firstNumber = "";
        display.value = "";
        justCalculated = false;
    }

    if(regex.test(e.key)){
        e.preventDefault();
        if(operator === null){
        firstNumber += e.key;
        console.log(firstNumber);
        display.value += e.key;
        
        }
        else {
            secondNumber += e.key;
            display.value += e.key;
        }
    }
    
})

numberButtons.forEach(btn => {
    btn.addEventListener("click", function(e){
        if(display.value === "0") {
            display.value = ""; 
        }

        if (justCalculated && operator === null && firstNumber !== "") {
            firstNumber = "";
            display.value = "";
            justCalculated = false;
        }
        if(operator === null){
            firstNumber += e.target.value;
            console.log(firstNumber);
            display.value += e.target.value;
            //populateDisplay(firstNumber)
            //firstNumber = null;
        }
        else {
            secondNumber += e.target.value;
            display.value += e.target.value;
        }
    })
})

operators.forEach(btn => {
    btn.addEventListener("click", function(e){
        operator = e.target.value
        display.value += operator;
        //console.log(operator);        
    })
})

function sum(firstNumber, secondNumber){

    let solution = Number(firstNumber) + Number(secondNumber);
    console.log(solution);
    return solution;
}

function subtract(firstNumber, secondNumber){

    let solution = Number(firstNumber) - Number(secondNumber);
    return solution;
}

function multiply(firstNumber, secondNumber){

    let solution = Number(firstNumber) * Number(secondNumber);
    return solution;
}

function divide(firstNumber, secondNumber){
    if(Number(firstNumber) === 0 && Number(secondNumber) === 0){
        let error = "Hey Einstein you can't divide 0 by 0";
        return error;
    }
    let solution = Number(firstNumber) / Number(secondNumber);
    return solution;
}


equals.addEventListener("click", ()=>{
    //let ans = basicMath(firstNumber,secondNumber);
    console.log(firstNumber, operator, secondNumber)
    let answer = operate(firstNumber, operator, secondNumber);
    console.log(answer);
    display.value = answer;
    firstNumber = answer.toString();
    secondNumber = "";
    operator = null; 
    justCalculated = true;   
})

function operate(firstNumber, operator, secondNumber){
    if(operator === "+"){
        return sum(firstNumber, secondNumber);
    }else if(operator === "-"){
        return subtract(firstNumber, secondNumber)
    }else if(operator === "*"){
        return multiply(firstNumber, secondNumber);
    }else {
        return divide(firstNumber, secondNumber)
    }
}

const populateDisplay = function(firstNumber){
    display.value += firstNumber;
}

//Pseudo Code

/*
-Calculator takes first digit 
-stores in a variable
-takes operato , stores it i a variable
-takes final digit and stores it in a varible
-calculates the math logic */

