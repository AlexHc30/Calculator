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
            console.log('no / 0')
        } else {
            let result = (a / b).toFixed(4);
            while(result[result.length - 1] == 0) {
                result = result.slice(0, (result.length - 1));
            } 
            console.log('no / 0')
            return result;
        }
    }
};

const operate = function(operator, a, b, newOperationName, newOperation) {
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
            firstCalculation = false];
};


const numbers = Array.from(document.getElementsByClassName('numbers'));
numbers.forEach(number => number.addEventListener('click', createNumber));

function createNumber(number){
    let value = number.target.innerText;

    // prevent numbers from having more than one '.' (i.e. '42.21.1')
    if(firstValue !== 0 && firstValue.toString().includes('.') && !operation && value == '.') {
        return;
    } else if(secondValue !==0 && secondValue.toString().includes('.') && value == '.') {
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
        // in case there is already an operation, replace it with a new one
        if(operation) {
            displayValue = displayValue.slice(0, (displayValue.length - 1));
        }
        displayValue = `${displayValue}${operator.target.textContent}`;
        operation = operator.target.value;
    }

    if(firstValue && secondValue && operation) {
        calculateExpression(operator.target.value, operator.target.textContent);
    }
    return [operation, display.textContent = displayValue];
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
    } else if(firstValue && secondValue === 0 && operation) {
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
            firstValue = 0,
            secondValue = 0,
            operation = '',
            firstCalculation = true];
}


// make calculator work with keyboard also

