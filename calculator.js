const buttons = document.querySelector('.buttons');
let firstNumber;
let secondNumber;
let operator;

const buttonsArray = ['AC', '+/-', '%', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

function add(num1, num2){
    return num1 + num2;
}

function subtraction(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function division(num1, num2){
    return num1 / num2;
}

function operate(first, second, operator){
    
}

function buttonPopulate(){

    for(let b = 0; b < 19; b++){
        const button = document.createElement('button');
        button.setAttribute('class', 'button');
        button.setAttribute('id', buttonsArray[b]);
        if(buttonsArray[b] === '0') button.style.flex = '1';
        button.textContent = buttonsArray[b];
        
        buttons.appendChild(button);
    }

}

buttonPopulate();