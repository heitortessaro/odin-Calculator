const DEFAULT_buttonsNumber = '#5e3439';
const DEFAULT_buttonsOperation = '#5e5934';
const DEFAULT_buttons = '#5E4434';
let varA = '';
let varB = '';
let result = '';
let operation = '';
let sizeVarAOperation = 0;


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
    // console.log(variable)
    if (variable == "AC") {
        resetAll();
        return;
    } else if (variable == "C") {
        eraseLast();
        return;
    } else if (variable == "▲") {
        selectUp();
    } else if (currentOperation.textContent == '') {
        return;
    } else if (variable == "=" &&
        currentOperation.textContent.length > sizeVarAOperation) {
        varB = currentOperation.textContent.slice(sizeVarAOperation);
        performeOperation();
        showResults();
    } else if (variable == "%" &&
        currentOperation.textContent.length > sizeVarAOperation) {
        varB = currentOperation.textContent.slice(sizeVarAOperation);
        performeOperationPercent();
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
    } else if (variable != '=') {
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

function selectUp() {
    if (oldResult1.textContent == '-') {
        return
    } else {
        let equalPosition = oldResult1.textContent.indexOf('=');
        currentOperation.textContent = oldResult1.textContent.slice(equalPosition + 1);
        oldResult1.textContent = oldResult2.textContent;
        oldResult2.textContent = oldResult3.textContent;
        oldResult3.textContent = '-';
        varA = '';
        result = '';
        sizeVarAOperation = 0;
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

function performeOperationPercent() {
    switch (operation) {
        case '+':
            result = addPercent(varA, varB).toString();
            break;
        case '-':
            result = subtractPercent(varA, varB).toString();
            break;
        case '*':
            result = multiplyPercent(varA, varB).toString();
            break;
        case '/':
            result = dividePercent(varA, varB).toString();
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

function addPercent(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    b = (a / 100) * b;
    return checkLenght(a + b);
};

function subtractPercent(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    b = (a / 100) * b;
    return checkLenght(a - b);
};

function multiplyPercent(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return checkLenght(a * (b / 100));
};

function dividePercent(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return checkLenght(a / (b / 100));
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












