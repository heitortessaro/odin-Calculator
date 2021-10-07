const DEFAULT_buttonsNumber = '#5e3439';
const DEFAULT_buttonsOperation = '#5e5934';
const DEFAULT_buttons = '#5E4434';
let varA = '';
// let varB = '';
// let result = '';
let operation = '';


// get elements
const btn0 = document.getElementById('n0');
const btn1 = document.getElementById('n1');
const btn2 = document.getElementById('n2');
const btn3 = document.getElementById('n3');
const btn4 = document.getElementById('n4');
const btn5 = document.getElementById('n5');
const btn6 = document.getElementById('n6');
const btn7 = document.getElementById('n7');
const btn8 = document.getElementById('n8');
const btn9 = document.getElementById('n9');
const comma = document.getElementById('comma');
const opSum = document.getElementById('sum');
const opSub = document.getElementById('subtraction');
const opMul = document.getElementById('multiplication');
const opDiv = document.getElementById('division');
const opEqu = document.getElementById('equal');
const opPosNeg = document.getElementById('positiveNegative');
const opAC = document.getElementById('AC');
const opC = document.getElementById('')

const oldResult1 = document.getElementById('oldResult1');
const oldResult2 = document.getElementById('oldResult2');
const oldResult3 = document.getElementById('oldResult3');
const currentOperation = document.getElementById('currentOperation');

const btns = document.getElementById('btns').querySelectorAll('button');
const btnsNumber = document.getElementsByClassName('btnNumber');
const btnsOperation = document.getElementsByClassName('btnOperation');

//add listeners
Array.from(btns).forEach(function (btn) {
    btn.addEventListener("mouseover", changeColor);
});
Array.from(btns).forEach(function (btn) {
    btn.addEventListener("mouseout", resetColor);
});

Array.from(btnsNumber).forEach(function (btn) {
    btn.addEventListener('click', clickNumber);
});

Array.from(btnsOperation).forEach(function (btn) {
    btn.addEventListener('click', clickOperation);
});

// Functions
// visual
function changeColor() {
    if (this.classList.contains('btnOperation')) {
        this.style.backgroundColor = DEFAULT_buttonsOperation;
    } else if (this.classList.contains('btnNumber')) {
        this.style.backgroundColor = DEFAULT_buttonsNumber;
    }
}

function resetColor() {
    this.style.backgroundColor = DEFAULT_buttons;
}

// calls
function clickNumber() {
    let variable = this.textContent;
    currentOperation.textContent += `${variable}`
}

function clickOperation() {
    let variable = this.textContent;
    if (variable == "AC") {
        resetAll();
        return;
    } else if (variable == "C") {
        undo();
        return;
    } else if (currentOperation.textContent == ''){
        return;
    } 
}

// function printCurrent(){
//     if var
// }

//operations
function resetAll() {
    currentOperation.textContent = '';
    oldResult1.textContent = '-';
    oldResult2.textContent = '-';
    oldResult3.textContent = '-';
}

function undo() {
    currentOperation.textContent =
        currentOperation.textContent.slice(0,
            (currentOperation.textContent.length - 1));
}

function add(a, b) {
    return (a + b);
};

function subtract(a, b) {
    return (a - b);
};

function multiply(a, b) {
    return (a * b);
};

function divide(a, b) {
    return (a / b);
}













