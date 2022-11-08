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
let operator = '';

const numbers = Array.from(document.getElementsByClassName('numbers'));
numbers.forEach(number => number.addEventListener('click', createNumber));

function createNumber(number){
    let value = number.target.innerText;

    if(displayValue === 0) {
        displayValue = value;
    } else {
        displayValue = `${displayValue}${value}`;
    }

    if(!operator) {
        console.log(value)
        firstValue = Number(`${firstValue}${value}`);
        return [display.textContent = displayValue, firstValue];
    } else {
        secondValue = Number(`${secondValue}${value}`);
        return [display.textContent = displayValue, secondValue];
    }
}

// temporary to test if createNumber() captures both first and second values
const addition = document.getElementById('add');
addition.addEventListener('click', function(){
    console.log(addition.value)
    displayValue = `${displayValue}${addition.textContent}`;
    return [operator = add, display.textContent = displayValue];
})