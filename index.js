const display = document.getElementById('display');
let displayValue = 0;
let firstValue = 0;
let secondValue = 0;
let operation;
let firstCalculation = true;

const operationsObj = {
    add(a,b) {
        return a + b;
    },
    subtract(a,b) {
        return a - b;
    },
    multiply(a,b) {
        return a * b;
    },
    divide(a,b) {
        if(a % b === 0) {
            return a / b;
        } else {
            return (a / b).toFixed(4);
        }
    }
};

const operate = function(operator, a, b) {
    firstValue = operationsObj[operator](a,b);
    displayValue = firstValue;
    secondValue = 0;
    operation = '';
    return [firstValue, 
            secondValue, 
            operation,
            display.textContent = displayValue,
            firstCalculation = false];
};


const numbers = Array.from(document.getElementsByClassName('numbers'));
numbers.forEach(number => number.addEventListener('click', createNumber));

function createNumber(number){
    let value = number.target.innerText;

    // prevent numbers from having more than one '.' (i.e. '42.21.1')
    if(firstValue !== 0 && firstValue.includes('.') && !operation && value == '.') {
        return;
    } else if(secondValue !==0 && secondValue.includes('.') && value == '.') {
        return;
    }
    
    if(displayValue === 0 && value !== '.') {
        displayValue = value;
    // prevent inserting numbers to the back of the result number
    } else if ((firstCalculation || (!firstCalculation && operation))) {
        displayValue = `${displayValue}${value}`;
    }

    if(!operation) {
        firstValue = `${firstValue}${value}`;
        return [display.textContent = displayValue, firstValue];
    } else {
        secondValue = `${secondValue}${value}`;
        return [display.textContent = displayValue, secondValue];
    }
}


const operators = Array.from(document.getElementsByClassName('operators'));
operators.forEach(operator => operator.addEventListener('click', selectOperation));

function selectOperation(operator) {
    if(firstValue && !secondValue) {
        if(operation) {
            displayValue = displayValue.slice(0, (displayValue.length - 1));
        }
        displayValue = `${displayValue}${operator.target.textContent}`;
        operation = operator.target.value;
    }
    return [operation, display.textContent = displayValue];
}


const equals = document.querySelector('.equals');
equals.addEventListener('click', calculateExpression);

function calculateExpression() {
    firstValue = Number(firstValue);
    secondValue = Number(secondValue);
    if(firstValue && secondValue && operation) {
        operate(operation, firstValue, secondValue);
    }
}


const clear = document.querySelector('.clear');
clear.addEventListener('click', clearEverything);

function clearEverything() {
    return [displayValue = 0,
            display.textContent = displayValue,
            firstValue = 0,
            secondValue = 0,
            operation,
            firstCalculation = true];
}