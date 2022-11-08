const add = function(a,b) {
    return a + b;
};

const subtract = function(a,b) {
    return a - b;
}

const multiply = function(a,b) {
    return a * b;
}

const divide = function(a,b) {
    return a / b;
}

const operate = function(operation, a, b) {
    return operation(a,b);
}

const display = document.getElementById('display');
let displayValue = 0;
let firstValue = 0;
let secondValue = 0;
let operation = '';


const numbers = Array.from(document.getElementsByClassName('numbers'));
numbers.forEach(number => number.addEventListener('click', createNumber));

function createNumber(number){
    let value = number.target.innerText;

    if(displayValue === 0) {
        displayValue = value;
    } else {
        displayValue = `${displayValue}${value}`;
    }

    if(!operation) {
        console.log(value)
        firstValue = Number(`${firstValue}${value}`);
        return [display.textContent = displayValue, firstValue];
    } else {
        secondValue = Number(`${secondValue}${value}`);
        return [display.textContent = displayValue, secondValue];
    }
}


const operators = Array.from(document.getElementsByClassName('operators'));
operators.forEach(operator => operator.addEventListener('click', selectOperation));

function selectOperation(operator) {
    if(firstValue && !secondValue) {
        if(!operation) {
            console.log('lalalal')
            displayValue = `${displayValue}${operator.target.textContent}`;
        } else {
            displayValue = displayValue.slice(0, (displayValue.length - 1));
            displayValue = `${displayValue}${operator.target.textContent}`;
        }
        operation = operator.target.value;
    }
    return [operation, display.textContent = displayValue];
}