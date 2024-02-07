const buttons = document.querySelector('.buttons');
const display = document.querySelector('#display')
let firstNumber = null;
let secondNumber = null;
let operator = null;

const buttonsArray = ['AC', '+/-', '%', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

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

       } else if(button.textContent === '%'){
            setDisplay(operate(firstNumber, null,button.textContent));
            reset();
       } else if(button.textContent === '.'){
             enableButton(false);
             if(firstNumber === null){
                firstNumber = '0.';
                setDisplay(firstNumber);
             } else if(firstNumber && !operator){
                firstNumber += '.';
                setDisplay(firstNumber);
             } else if(secondNumber === null){
                secondNumber = '0.';
                setDisplay(secondNumber);
             } else {
                secondNumber += '.';
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
            firstNumber += button.textContent;
            setDisplay(firstNumber)
        } else if(secondNumber === null){
            secondNumber = button.textContent;
            setDisplay(secondNumber)
        } else {
             secondNumber += button.textContent;
             setDisplay(secondNumber);
        }
    }
}

function setDisplay(num){
    display.textContent = num;
}

function reset(){
    firstNumber = null;
    secondNumber = null;
    operator = null;
    enableButton(true);
}

function enableButton(option){
    const dot = document.querySelector('#dot')
    if(option == true) dot.disabled = false;
    else dot.disabled = true;
}

buttonPopulate();