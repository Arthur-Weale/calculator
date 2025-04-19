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
    //console.log(currentNumber);
}    

handleDigitClick(1);
handleDigitClick(2);

//Learning how to build an Interpreter

//Small lexer here we go.....
function isDigit(char){  //Special custom function which uses regex to test if char is a digit
    return /[0-9]/.test(char);
}

class Lexer{
    constructor (code){
        this.code = code;
        this.pos = 0;
        this.line = 0;
    }

    tokens = []; //Initialises an empty array
    tokenize() {
        //A loop to go through this.code
        for(let i = 0; i < this.code.length; i++){
            let char = this.code[i]; //initialises char to access the this.code element or character using the index [i]           console.log(char);
            if (isDigit(char)){ //Checks where the char is digit using the custome function isDigit function;
                let num = char; //If char is a digit then its stored in the variable num;
                while(isDigit(this.code[i + 1])){ //This is another loop that runs if the condition is true and will stop if its false.It checks the next character from this.code since the first character is index 0, which in this situation is like 6 this.code[i + 1] actually checks the next character which is index 1 not index 0, in a way i think it sort of peaks into the future like the next; 
                    num += this.code[i + 1]; //I think this concatenated the num with the index 1 to be e.g 61;
                    i++;// This is an increment to i which tells the loop to increment i in the while loop i think to sag "Go to the next character of this.code"
                }
                this.tokens.push({type: "number", value : num}); //Got it logging as structured object
                //this.tokens.push(num); //If the condition of the loop became false then in appends it to pushes it to the array as a doube digit;
            }else if(char === "+" || char === "-"){ // This if statement checks to see if its either + or - by using strict operators === if its that is what they are called;
                //this.tokens.push(char);// Pushes the character into the array
                this.tokens.push({type: "operator", value : char});
            }
            //this.tokens.push(char)
            //i++; //This confuses me a little bit
            }
        console.log(this.tokens); //Console logs the outputs
        return this.tokens; //If we ever what to use the tokenize method output;
    }
};

let lexer = new Lexer("42-7+3"); //Creates an new instance of Lexer;
let tokens = lexer.tokenize();//Calls the tokenize method

class Parse{
    constructor(tokens){
        this.tokens = tokens;
        this.current = 0;
    };

    parser(){
        return this.parseNumber();
        }

    parseNumber(){ //This helper method deals with numbers
        let token = this.tokens[this.current]; //Initialising this.tokens to variable token and using array selection of index [this.current]

        if(token.type !== "number"){ //This filters and checks if the token object "type" is "number"
            throw new Error(`Expected number but got ${token.type}`); //If not the number it will throw in an error;
        };

        this.current++; //This tells it to go to the next index value or is adding the index value


        console.log({
            type: "NumberLiteral",
            value: parseInt(token.value)
        });

        return {
            type: "NumberLiteral",
            value: parseInt(token.value)
        }; //returns a new object with a parse token value from string to integer
    }

    parseExpression(){
        let left = this.parseNumber(); //This i think calls the parseNumber method and stores it inside the variable left

        while(this.current < this.tokens.length &&  //This while loop makes sure that every array element is checked to see if its an operator
            this.tokens[this.current].type === "operator"){ //It checks if at the current positions is less than the length or number of items in this.tokens and if the current token and that array position , if its value is type is equal to "operator";
                const operator = this.tokens[this.current].value; //If the above is true then that token at that current index , the value which is an operator is stored in the variable operator;
                this.current++;//Steps up the position to the next
        

        let right = this.parseNumber(); //Calls parseNumber and gets its return which is stored in the variable right

        //Creates an Abstract Syntax Tree called left
        left = {
            type: "BinaryExpression",
            left,
            operator,
            right
        };
    }
    console.log(left); //logs the ast
    return left; //returns left
    }
}
    let parse = new Parse(tokens);
    let ast = parse.parseExpression();

    console.log(JSON.stringify(ast, null, 2));

    function evaluate(node){
        if(node.type === "NumberLiteral"){
            return node.value
        }

        if(node.type === "BinaryExpression"){
            leftValue = evaluate(node.left);
            rightValue = evaluate(node.right);
            operator = node.operator;

            if(operator === "+"){
                console.log(leftValue + rightValue);
                console.log(leftValue);
            }
            else if(operator === "-"){
                console.log(leftValue - rightValue);
            }
        }
    }

    const finalResult = evaluate(ast);
    console.log(finalResult)
