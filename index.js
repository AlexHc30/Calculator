const display = document.getElementById('display');
const displayExpression = document.getElementById('previousCalc');
let displayValue = 0;
let firstValue = 0;
let secondValue = 0;
let operation;
let operationSign;
let firstCalculation = true;

const operationsObj = {
    add(a,b) {
        return a + b;
    },

    subtract(a,b) {
        return a - b;
    },

    multiply(a,b) {
        //limit number of decimals when multiplying non-integers
        if(!Number.isInteger(a*b)) {
            let result = (a * b).toFixed(4);
            while(result[result.length - 1] == 0) {
                result = result.slice(0, (result.length - 1));
            } 
            return result;
        }
        return a * b;
    },

    divide(a,b) {
        if(a % b === 0) {
            return a / b;
        } else if(b == 0) {
            alert("You can't divide by 0!!")
        } else {
            let result = (a / b).toFixed(4);
            while(result[result.length - 1] == 0) {
                result = result.slice(0, (result.length - 1));
            } 
            return result;
        }
    }
};

const operate = function(operator, a, b, newOperationName, newOperation) {
    displayExpression.innerText = `${firstValue} ${operationSign} ${secondValue}`
    firstValue = operationsObj[operator](a,b);
    displayValue = firstValue;
    secondValue = 0;
    // when calculation is made by choosing operator intead of 'equals'
    if(newOperation) {
        operation = newOperationName;
        displayValue = `${displayValue}${newOperation}`
    } else {
        operation = '';
    }
    
    return [firstValue, 
            secondValue, 
            operation,
            display.textContent = displayValue,
            displayExpression,
            firstCalculation = false];
};


const numbers = Array.from(document.getElementsByClassName('numbers'));
numbers.forEach(number => number.addEventListener('click', createNumber));

function createNumber(number){
    let value;
    // condition for keyboard input
    if(typeof number == 'string') {
        value = number;
    } else {
        value = number.target.innerText;
    }

    // prevent numbers from having more than one '.' (i.e. '42.21.1')
    if((firstValue !== 0 && firstValue.toString().includes('.') && !operation && value == '.') ||
       (secondValue !==0 && secondValue.toString().includes('.') && value == '.')) {
        return;
    }
    
    // both conditions prevent adding numbers after 0, e.g. 0654
    if(displayValue === 0 && value !== '.') {
        displayValue = value;
    } else if(displayValue[displayValue.length - 1] == '0' && value !== '.') {
        displayValue = displayValue.slice(0, (displayValue.length - 1));
        displayValue = `${displayValue}${value}`;
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

function selectOperation(operator, operationText) {
    let operationName = '';
    // for cases when operations are inputed via keyboard
    if(operationText) {
        operationSign = operator;
        operationName = operationText;
    } else {
        operationSign = operator.target.textContent;
        operationName = operator.target.value;
    }

    if(firstValue && !secondValue) {
        // in case there is already an operation, replace it with a new one
        if(operation) {
            displayValue = displayValue.slice(0, (displayValue.length - 1));
        }
        displayValue = `${displayValue}${operationSign}`;
        operation = operationName;
    }

    if(firstValue && secondValue && operation) {
        calculateExpression(operationName, operationSign);
    }
    return [operation, operationSign, display.textContent = displayValue];
}


this.addEventListener('keyup', keysActivateButtons);
function keysActivateButtons(event) {
    let keyValue = event.key;
    let operationName = '';
    switch(keyValue) {
        case '.': 
        case '0': 
        case '1':
        case '2':
        case '3':
        case '4':
        case '5': 
        case '6':
        case '7':
        case '8':
        case '9':
            createNumber(keyValue);
            break;
        case '+':
            operationName = 'add';
            selectOperation(keyValue, operationName);
            break;
        case '-':
            operationName = 'subtract';
            selectOperation(keyValue, operationName);
            break;
        case '*':
            operationName = 'multiply';
            selectOperation('×', operationName);
            break;
        case '/':
            operationName = 'divide';
            selectOperation('÷', operationName);
            break;
        case 'Enter':
            calculateExpression();
            break;
        case 'Delete':
            clearEverything();
    }
}


const equals = document.querySelector('.equals');
equals.addEventListener('click', calculateExpression);

function calculateExpression(newOperationName, newOperation) {
    firstValue = Number(firstValue);
    secondValue = Number(secondValue);
    if(firstValue && secondValue && operation) {
        // for cases when value gets calculated via operator
        if(newOperationName && newOperation) {
            operate(operation, firstValue, secondValue, newOperationName, newOperation);
        } else {
            operate(operation, firstValue, secondValue);
        }
    // when user tries to divide by 0
    } else if(firstValue && secondValue === 0 && operation === 'divide') {
        alert("You can't divide by 0!!");
        displayValue = displayValue.slice(0, (displayValue.length - 1));
        return display.textContent = displayValue;
    }
}


const clear = document.querySelector('.clear');
clear.addEventListener('click', clearEverything);

function clearEverything() {
    return [displayValue = 0,
            display.textContent = displayValue,
            displayExpression.textContent = '',
            firstValue = 0,
            secondValue = 0,
            operation = '',
            firstCalculation = true];
}


// prevent overflowing the display

