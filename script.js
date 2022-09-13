
// Ход. true - игрок, false - компьютер
let step = true;
let stepCount = 0;

//кнопки игрового поля
let fieldArray = [3, 3, 3, 3, 3, 3, 3, 3, 3];

let combinationArray = [
    '' + fieldArray[0] + fieldArray[1] + fieldArray[2],
    '' + fieldArray[3] + fieldArray[4] + fieldArray[5],
    '' + fieldArray[6] + fieldArray[7] + fieldArray[8],
    '' + fieldArray[0] + fieldArray[3] + fieldArray[6],
    '' + fieldArray[1] + fieldArray[4] + fieldArray[7],
    '' + fieldArray[2] + fieldArray[5] + fieldArray[8],
    '' + fieldArray[0] + fieldArray[4] + fieldArray[8],
    '' + fieldArray[2] + fieldArray[4] + fieldArray[6]
]

let combinations = ['012', '345', '678', '036', '147', '258', '048', '246'];


// ======================================= размеры окна =================================
//установка высоты кнопок после загрузки страницы
window.addEventListener('load', resize);

//изменение высоты кнопок при изменении размеров окна
window.addEventListener('resize', resize);

function resize() {
    let fieldItems = document.getElementsByClassName('field-button');
    for (let i = 0; i < fieldItems.length; i++) {
        fieldItems[i].style.height = fieldItems[0].offsetWidth + 'px';
    }
}

// ====================================== начало новой игры ==============================

function newGame() {
    // закрываем попап
    closePopup();
    // очищаем кнопки и снимаем блокировку
    clearButtonValue();
    //сброс глобальных переменных к начальным значениям
    resetVars();
}

// сброс глобальных переменных
function resetVars() {
    step = true;
    stepCount = 0;
    fieldArray = [3, 3, 3, 3, 3, 3, 3, 3, 3];
    combinationArray = [
        '' + fieldArray[0] + fieldArray[1] + fieldArray[2],
        '' + fieldArray[3] + fieldArray[4] + fieldArray[5],
        '' + fieldArray[6] + fieldArray[7] + fieldArray[8],
        '' + fieldArray[0] + fieldArray[3] + fieldArray[6],
        '' + fieldArray[1] + fieldArray[4] + fieldArray[7],
        '' + fieldArray[2] + fieldArray[5] + fieldArray[8],
        '' + fieldArray[0] + fieldArray[4] + fieldArray[8],
        '' + fieldArray[2] + fieldArray[4] + fieldArray[6]
    ]
}

// ====================================== ячейки поля ====================================

// назначение кнопки значения Х\О
function setButtonValue(buttonID) {

    stepGame(buttonID);
    if (checkWin() == true) return;
    checkWin();
    changeStep();

    if (stepCount == 9) return;

    let compStep = computerStep();
    stepGame(compStep);
    checkWin();

    changeStep();
}

// ход
function stepGame(buttonID) {

    let button = document.getElementById(buttonID);
    if (step == true) {
        button.innerText = 'x';
        button.classList.add('user-step');
        fieldArray[buttonID] = 0;
    }
    if (step == false) {
        button.innerText = 'o';
        button.classList.add('computer-step');
        fieldArray[buttonID] = 1;
    }
    button.disabled = true;
    stepCount++;

}


// кто сейчас ходит
function changeStep() {
    if (step == true) {
        step = false;
    } else {
        step = true;
    }
}

// очищение значений кнопки
function clearButtonValue() {

    let buttons = document.getElementsByClassName('field-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].innerText = '';
        buttons[i].classList.remove('user-step');
        buttons[i].classList.remove('computer-step');
    }
}

// блокировка всех кнопок
function disabledButtons() {
    buttons = document.getElementsByClassName('field-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

// проверка полей на выйигрыш
function checkWin() {

    combinationArray = [
        '' + fieldArray[0] + fieldArray[1] + fieldArray[2],
        '' + fieldArray[3] + fieldArray[4] + fieldArray[5],
        '' + fieldArray[6] + fieldArray[7] + fieldArray[8],
        '' + fieldArray[0] + fieldArray[3] + fieldArray[6],
        '' + fieldArray[1] + fieldArray[4] + fieldArray[7],
        '' + fieldArray[2] + fieldArray[5] + fieldArray[8],
        '' + fieldArray[0] + fieldArray[4] + fieldArray[8],
        '' + fieldArray[2] + fieldArray[4] + fieldArray[6]
    ]

    for (let i = 0; i < combinationArray.length; i++) {
        if (combinationArray[i] == '000') {
            disabledButtons();
            setTimeout(() => {
                showPopup(0)
            }, 1000);
            changeScore(0);
            return true;
        }
        if (combinationArray[i] == '111') {
            disabledButtons();
            setTimeout(() => {
                showPopup(1)
            }, 1000);
            changeScore(1);
            return true;
        }
    }
    if (stepCount == 9) {
        setTimeout(() => {
            showPopup(2)
        }, 1000);
    }
}


// ======================================= счет ===========================================

//изменение счета
function changeScore(x) {
    let score = document.getElementsByClassName('score-block__score');
    score[x].innerText = +score[x].textContent + 1;
}


// ======================================= попап ===========================================

//показать попап
function showPopup(x) {
    let popup = document.getElementsByClassName('popup');
    let winner = x;
    setWinString(winner);
    popup[0].style.display = 'flex';

}

//скрыть попап
function closePopup() {
    let popup = document.getElementsByClassName('popup');
    popup[0].style.display = 'none';
}

// изменение строки о том, кто победил в попап
function setWinString(x) {
    let winString = document.getElementsByClassName('popup-body__text');

    switch (x) {
        case 0: winString[0].innerText = 'You win!'; break;
        case 1: winString[0].innerText = 'Computer win!'; break;
        case 2: winString[0].innerText = 'Draw!'; break;
    }
}

// ====================================== ход компьютера ======================================
function computerStep() {

    if (stepCount < 2) {
        for (let i = 0; i < combinationArray.length; i++) {
            if (combinationArray[i].includes('0')) {
                let pos = combinationArray[i].indexOf('3');
                let tmp = getRow(i, pos);
                return tmp;
            }
        }
    }


    for (let i = 0; i < combinationArray.length; i++) {
        if (combinationArray[i].includes('113') || combinationArray[i].includes('311') || combinationArray[i].includes('131')) {
            let pos = combinationArray[i].indexOf('3');
            let tmp = getRow(i, pos);
            return tmp;
        }
    }

    for (let i = 0; i < combinationArray.length; i++) {
        if (combinationArray[i].includes('003') || combinationArray[i].includes('300') || combinationArray[i].includes('030')) {
            let pos = combinationArray[i].indexOf('3');
            let tmp = getRow(i, pos);
            return tmp;
        }
    }

    for (let i = 0; i < combinationArray.length; i++) {
        if (combinationArray[i].includes('133') || combinationArray[i].includes('331') || combinationArray[i].includes('313')) {
            let pos = combinationArray[i].indexOf('3');
            let tmp = getRow(i, pos);
            return tmp;
        }
    }
}


function getRow(rowNum, pos) {
    let row = combinations[rowNum];
    let index = row.split('')[pos];
    return index;

}
