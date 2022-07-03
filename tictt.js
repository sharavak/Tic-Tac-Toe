const values = document.querySelectorAll('td');
const X = document.querySelector('.X');
const O = document.querySelector('.O');
let table = document.querySelector('table');
let reset = document.querySelector('.resetGame');
let posName = document.querySelector('span')
let winCon = document.querySelector('.res')
let contWin = document.querySelector('.winner');

let computerPlayer =''
let userPlayer = '';
let fill = 0;
let t = 0;
let roam = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function choice(userPlayer) {
    if (userPlayer === 'X') {
        computerPlayer = 'O';
        return computerPlayer;
    }
    else {
        computerPlayer = 'X';
        return computerPlayer;
    }
}

X.addEventListener('click', function () {
    roam = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (v of values) {
        v.style.cursor = 'pointer';
    }
    userPlayer = X.textContent;
    X.disabled = true;
    O.disabled = true;
    computerPlayer = choice(userPlayer);
    playing(userPlayer, roam, computerPlayer);
})

O.addEventListener('click', function () {
    for (v of values) {
        v.style.cursor = 'pointer';
    }
    roam = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    userPlayer = O.textContent;
    X.disabled = true;
    O.disabled = true;
    computerPlayer = choice(userPlayer);
    computer(computerPlayer, t, roam,fill);
})

function winner(values,t) {
    if(( values[0].textContent === t && values[1].textContent === t && values[2].textContent === t) ||
        (values[3].textContent === t && values[4].textContent === t && values[5].textContent === t) ||
        (values[6].textContent === t && values[7].textContent === t && values[8].textContent === t) ||
        (values[0].textContent === t && values[4].textContent === t && values[8].textContent === t) ||
        (values[2].textContent === t && values[4].textContent === t && values[6].textContent === t) ||
        (values[0].textContent === t && values[3].textContent === t && values[6].textContent === t) ||
        (values[0].textContent === t && values[4].textContent === t && values[8].textContent === t) ||
        (values[2].textContent === t && values[5].textContent === t && values[8].textContent === t) ||
        (values[1].textContent === t && values[4].textContent === t && values[7].textContent === t)) {    
        return true
    }
}

function disa() {
    for (let v of values) {
        v.style.cursor='no-drop'
    }
}
function computerDis() {
    contWin.classList.add('winners');
    winCon.textContent = `${computerPlayer} won the game`;
}
function playerDis() {
    contWin.classList.add('winners');
    winCon.textContent = `${userPlayer} won the game`;
}

function computer(computerPlayer, t, roam, fill) {
    if (tie(values)) {
        disa()
        contWin.classList.add('winners');
        winCon.textContent = `Draw`;
    }else{
        setTimeout(() => {

                posName.textContent = `computer turn:${computerPlayer}`;
                let filledId = '';
                fill = Math.floor(Math.random() * roam.length);
                fill = roam[fill]
                filledId = roam.indexOf(fill);
                if (tie(values) === true) {
                    disa();
                    contWin.classList.add('winners');
                    winCon.textContent = `Draw`;
                } else {
                    filledId = parseInt(values[fill].id)
                    values[filledId].textContent = computerPlayer;
                    fill = roam.indexOf(filledId);
                    roam.splice(fill, 1);
                    if (computerPlayer === 'O') {
                        t = computerPlayer;
                        posName.textContent = `Player turn:${userPlayer}`
                        values[filledId].style.color = 'rgb(18 ,124 ,149)'
                        if (winner(values, t)) {
                            computerDis();
                        }
                    }
                    else {
                        posName.textContent = `Player turn:${userPlayer}`;
                        values[filledId].style.color = 'rgb(58, 32, 3)';
                        t = computerPlayer;
                        if (winner(values, t)) {
                            disa();
                            computerDis();
                        }
                        else {
                            if (tie(values)) {
                                disa();
                                contWin.classList.add('winners');
                                winCon.textContent = `Draw`;
                            }
                            else {
                                posName.textContent = `Player turn:${userPlayer}`;
                                playing(userPlayer, roam, computerPlayer);
                            }
                        }
                    }
                }
            
        }, 100)
    }
    
}
    

function tie(values) {
    if (values[0].textContent !== '' && values[1].textContent !== '' && values[2].textContent !== '' && values[3].textContent !== '' && values[4].textContent !== '' && values[5].textContent !== '' && values[6].textContent !== ''
        && values[7].textContent !== '' && values[8].textContent !== '') {
        return true
    }
  
}

function playing() {
    for (let i = 0; i < values.length; i++) {
        posName.textContent = `Player turn:${userPlayer}`
        values[i].addEventListener('click', function (e) {
                if (userPlayer === 'X') {
                    if (values[i].textContent === '') {
                        values[i].style.color = 'rgb(58, 32, 3)';
                        values[i].textContent = userPlayer;
                        roam.splice(roam.indexOf(i), 1);
                        t = values[i].textContent;
                        if (winner(values, t)) {
                            disa();
                            playerDis();
                        }
                        else {
                            posName.textContent = `computer turn:${computerPlayer}`;
                            computer(computerPlayer, t, roam, fill);
                        }
                    }
                }
                else {
                    posName.textContent = `computer turn:${computerPlayer}`;
                    playerO(i);
                }
            }, { once: true })
        }
    
}

function playerO(i) {
    posName.textContent=`Player turn:${userPlayer}`
    if (values[i].textContent === '') {
        values[i].style.color = 'rgb(18 ,124 ,149)';
        values[i].textContent = userPlayer;
        t = values[i].textContent
        roam.splice(roam.indexOf(i), 1);
        if (winner(values, t)) {
            disa();
            playerDis();
        }
        else {
            posName.textContent = `computer turn:${computerPlayer}`;
            computer(computerPlayer, t, roam, fill);
        }
    }
}
reset.addEventListener('click',resetGame)
function resetGame() {
    for (v of values) {
        v.textContent = '';
    }
    fill = 0;
    userPlayer = '';
    computerPlayer = '';
    X.disabled = false;
    O.disabled = false;
    posName.textContent = '';
    winCon.textContent = '';
    contWin.classList.remove('winners');

}
