const DEFAULT_buttonsNumber = '#5e3439';
const DEFAULT_buttonsOperation = '#5e5934';
const DEFAULT_buttons = '#5E4434';
let varA = '';
let varB = '';
let result = '';
let operation = '';
let sizeVarAOperation = 0;


// get elements
// const btn0 = document.getElementById('n0');
// const btn1 = document.getElementById('n1');
// const btn2 = document.getElementById('n2');
// const btn3 = document.getElementById('n3');
// const btn4 = document.getElementById('n4');
// const btn5 = document.getElementById('n5');
// const btn6 = document.getElementById('n6');
// const btn7 = document.getElementById('n7');
// const btn8 = document.getElementById('n8');
// const btn9 = document.getElementById('n9');
// const comma = document.getElementById('comma');
// const opSum = document.getElementById('sum');
// const opSub = document.getElementById('subtraction');
// const opMul = document.getElementById('multiplication');
// const opDiv = document.getElementById('division');
// const opEqu = document.getElementById('equal');
// const opPosNeg = document.getElementById('positiveNegative');
// const opAC = document.getElementById('AC');
// const opC = document.getElementById('')

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
    if (currentOperation.textContent == result) {
        currentOperation.textContent = '';
    }
    let variable = this.textContent;
    currentOperation.textContent += `${variable}`;
}

function clickOperation() {
    let variable = this.textContent;
    if (variable == "AC") {
        resetAll();
        return;
    } else if (variable == "C") {
        eraseLast();
        return;
    } else if (currentOperation.textContent == '') {
        return;
    } else if (variable == "=" &&
        currentOperation.textContent.length > sizeVarAOperation) {
        varB = currentOperation.textContent.slice(sizeVarAOperation);
        performeOperation();
        showResults();
    } else if (!(operation == '') &&
        currentOperation.textContent.length > sizeVarAOperation) {
        varB = currentOperation.textContent.slice(sizeVarAOperation);
        performeOperation();
        showResults();
        // varA = currentOperation.textContent;
        operation = variable;
        currentOperation.textContent += `${variable}`
        sizeVarAOperation = currentOperation.textContent.length;
    } else if (operation != '' && operation != '-' && variable == '-' &&
        currentOperation.textContent.length == sizeVarAOperation) {
        currentOperation.textContent += `${variable}`
    } else if (!(operation == '') && (variable != '=') &&
        currentOperation.textContent.length == sizeVarAOperation) {
        eraseLast();
        operation = variable;
        currentOperation.textContent += `${variable}`
        sizeVarAOperation = currentOperation.textContent.length;
    } else if (variable != '='){
        varA = currentOperation.textContent;
        operation = variable;
        currentOperation.textContent += `${variable}`
        sizeVarAOperation = currentOperation.textContent.length;
    }
}


//operations
function resetAll() {
    currentOperation.textContent = '';
    oldResult1.textContent = '-';
    oldResult2.textContent = '-';
    oldResult3.textContent = '-';
    varA = '';
    varB = '';
    result = '';
    operation = '';
    sizeVarAOperation = 0;

}

function eraseLast() {
    if (currentOperation.textContent == result) {
        currentOperation.textContent = '';
    } else {
        currentOperation.textContent =
            currentOperation.textContent.slice(0,
                (currentOperation.textContent.length - 1));
    }
}

function performeOperation() {
    switch (operation) {
        case '+':
            result = add(varA, varB).toString();
            break;
        case '-':
            result = subtract(varA, varB).toString();
            break;
        case '*':
            result = multiply(varA, varB).toString();
            break;
        case '/':
            result = divide(varA, varB).toString();
            break;
        default:
            break;
    }
}

function showResults() {
    varA = result;
    oldResult3.textContent = oldResult2.textContent;
    oldResult2.textContent = oldResult1.textContent;
    oldResult1.textContent = currentOperation.textContent + '=' + result;
    currentOperation.textContent = varA;
    operation = '';
}

function add(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return (a + b);
};

function subtract(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return (a - b);
};

function multiply(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return checkLenght(a * b);
};

function divide(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return checkLenght(a / b);
}

function checkLenght(result) {
    if (result.toString().length > 5 &&
        result.toString().split('').some(position => {
            return position == ".";
        })) {
        result = result.toFixed(4);
    }
    return result;
}












