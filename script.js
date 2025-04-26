let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-action="clear"]');
const equalButton = document.querySelector('[data-action="equal"]');
const backspaceButton = document.querySelector('[data-action="backspace"]');

function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    if(b === 0) return "can't divide by 0!";
    return a/b;
}
function roundResult(num){
    return Math.round(num * 1000) / 1000;
}
function operate(operator, a, b){
    a=parseFloat(a);
    b=parseFloat(b);
    switch(operator){
        case '+' : return add(a, b);
        case '-' : return subtract(a, b);
        case '*' : return multiply(a, b);
        case '/' : return divide(a, b);
        default  : return null;
    }
}

numberButtons.forEach(button =>
    button.addEventListener('click', () => appendNumber(button.dataset.number))
);

function appendNumber(number){
    if(display.textContent === '0' || shouldResetDisplay) resetDisplay();

    if(number === '.' && display.textContent.includes('.')) return;

    display.textContent += number;
}

function resetDisplay(){
    display.textContent = '';
    shouldResetDisplay = false;
}

operatorButtons.forEach(button =>
    button.addEventListener('click', () => setOperator(button.dataset.operator))
);

function setOperator(operator){
    if(currentOperator !== null) evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

equalButton.addEventListener('click', evaluate);

function evaluate(){
    if(currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;
    const result = operate(currentOperator, firstNumber, secondNumber);
    display.textContent = typeof result === "number" ? roundResult(result) : result;
    currentOperator = null;
}

clearButton.addEventListener('click', clear);

function clear(){
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
}

backspaceButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1) || '0';
});