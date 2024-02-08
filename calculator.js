const buttons = document.querySelector('.buttons');
const display = document.querySelector('#display');
const date = document.querySelector('#date');
let firstNumber = null;
let secondNumber = null;
let operator = null;
let today = new Date();
date.textContent = today.getFullYear();

let buttonBackgroundColor = null;
let pressedOperatorColors = [];

const buttonsArray = ['AC', '+/-', '%', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
const operatorArray = ['÷', 'x', '-', '+', '='];


function add(num1, num2){
    return +num1 + +num2;
}

function subtraction(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function division(num1, num2){
    if(num2 == 0) return 'Can\'t divide by 0';
    return num1 / num2;
}

function percentage(num){
    return num / 100;
}

function changeSigns(num){
    if(num > 0) return 0 - num;
    return Math.abs(num);
}

function operate(first, second, operator){
        if(operator === '+') return add(first, second);
        if(operator === '÷') return division(first, second);
        if(operator === 'x') return multiply(first, second);
        if(operator === '-') return subtraction(first, second);
        if(operator === '%') return percentage(first);
    
}

function buttonPopulate(){

    for(let b = 0; b < 19; b++){
        const button = document.createElement('button');
        if(operatorArray.includes(buttonsArray[b])){
           button.style.backgroundColor = 'rgb(6, 94, 28)';
           button.addEventListener('click',()=>{
             button.style.backgroundColor = 'rgb(170, 176, 152)';
             button.style.color = 'rgb(207, 218, 8)';
             pressedOperatorColors.push(button);
           })
        }
        button.setAttribute('class', 'button');
        if(buttonsArray[b] === '.'){
        button.setAttribute('id', 'dot');
        } else {
        button.setAttribute('id', buttonsArray[b]);
        }
        if(buttonsArray[b] === '0') button.style.flex = '1';
        button.textContent = buttonsArray[b];
        button.addEventListener('click',()=> {
            getButtonValue(button);
        })

        button.addEventListener('mouseenter', ()=>{
            buttonBackgroundColor = button.style.backgroundColor;
            button.style.backgroundColor = 'rgb(28, 147, 58)';
        })

        button.addEventListener('mouseleave', ()=>{
            button.style.backgroundColor = buttonBackgroundColor;
        })
        
        buttons.appendChild(button);
    }

}

function getButtonValue(button){
    if(isNaN(+button.textContent)){
        enableButton(true);
       if(button.textContent === '='){
        let result = 0;
        if(firstNumber && secondNumber){
             result = operate(firstNumber, secondNumber, operator);
             setDisplay(result);
             reset();
             firstNumber = result;
        } else if(firstNumber && operator && !secondNumber){
            result = operate(firstNumber, firstNumber, operator);
            setDisplay(result);
            reset();
            firstNumber = result;
        }
       } else if(button.textContent === 'AC'){
            reset();
            setDisplay(0);
       } else if(button.textContent === '+/-'){
             if(firstNumber && !operator){
                firstNumber = changeSigns(firstNumber);
                setDisplay(firstNumber);
             } else if(operator && !secondNumber){
                secondNumber = changeSigns(firstNumber);
                setDisplay(secondNumber);
             }
       } else if(button.textContent === '%'){
            setDisplay(operate(firstNumber, null, button.textContent));
            reset();
       } else if(button.textContent === '.'){
             enableButton(false);
             if(firstNumber === null){
                firstNumber = '0.';
                setDisplay(firstNumber);
             } else if(firstNumber && !operator){
                if(numberSizeFits(firstNumber + '.')) firstNumber += '.';
                setDisplay(firstNumber);
             } else if(secondNumber === null){
                secondNumber = '0.';
                setDisplay(secondNumber);
             } else {
                if(numberSizeFits(secondNumber +'.')) secondNumber += '.';
                setDisplay(secondNumber);
             }
       } else {
            if(firstNumber && secondNumber && operator){
                let result = operate(firstNumber,secondNumber, operator);
                setDisplay(result);
                reset();
                firstNumber = result;
                operator = button.textContent;
                
            }
            operator = button.textContent;
       }
    } else {
        if(firstNumber === null) {
            firstNumber = button.textContent;
            setDisplay(firstNumber);
        } else if(firstNumber && operator === null){
            if(numberSizeFits(firstNumber + button.textContent)) firstNumber += button.textContent;
            setDisplay(firstNumber)
        } else if(secondNumber === null){
            secondNumber = button.textContent;
            setDisplay(secondNumber)
        } else {
            if(numberSizeFits(secondNumber + button.textContent)) secondNumber += button.textContent;
             setDisplay(secondNumber);
        }
    }
}

function setDisplay(num){
    display.textContent = num;
}

function numberSizeFits(num){
    if(num.length <= '0000000000000000'.length) return true;
    return false;
}

function reset(){
    firstNumber = null;
    secondNumber = null;
    operator = null;
    resetOperatorColors(pressedOperatorColors);
    enableButton(true);
}

function resetOperatorColors(arr){
    for(let btn of arr){
        btn.style.color = 'rgb(240, 248, 255)';
    }
}

function enableButton(option){
    const dot = document.querySelector('#dot')
    if(option == true) dot.disabled = false;
    else dot.disabled = true;
}

buttonPopulate();