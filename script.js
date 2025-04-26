let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

const mainDisplay = document.getElementById('main-display');
const operationDisplay = document.getElementById('operation-display');
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
    if(mainDisplay.textContent === '0' || shouldResetDisplay) resetDisplay();
    
    if(number === '.' && mainDisplay.textContent.includes('.')) return;

    mainDisplay.textContent += number;
}

function resetDisplay(){
    mainDisplay.textContent = '';
    shouldResetDisplay = false;
}

operatorButtons.forEach(button =>
    button.addEventListener('click', () => setOperator(button.dataset.operator))
);

function setOperator(operator){
    if(currentOperator !== null) evaluate();
    firstNumber = parseFloat(mainDisplay.textContent);
    currentOperator = operator;
    operationDisplay.textContent = `${firstNumber} ${currentOperator}`;
    shouldResetDisplay = true;
}

equalButton.addEventListener('click', evaluate);

function evaluate(){
    if(currentOperator === null || shouldResetDisplay) return;
    secondNumber = mainDisplay.textContent;
    const result = operate(currentOperator, firstNumber, secondNumber);
    mainDisplay.textContent = typeof result === "number" ? roundResult(result) : result;
    currentOperator = null;
    operationDisplay.textContent = '';
}

clearButton.addEventListener('click', clear);

function clear(){
    mainDisplay.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
    operationDisplay.textContent = '';
}

backspaceButton.addEventListener('click', () => {
    if(shouldResetDisplay) return;
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1) || '0';
});