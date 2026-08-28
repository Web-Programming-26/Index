var canvas = document.getElementById("mijnCanvas");
var ctx = canvas.getContext("2d");

var grootte = 20;   
var vakjes = 20;    

var slang = [];
var richtingX = 1;
var richtingY = 0;
var etenX = 5;
var etenY = 5;
var score = 0;
var timer = null;

function startSpel() {
    slang = [];
    slang.push({ x: 10, y: 10 });
    slang.push({ x: 9, y: 10 });
    slang.push({ x: 8, y: 10 });

    richtingX = 1;
    richtingY = 0;
    score = 0;
    document.getElementById("score").innerHTML = score;
    document.getElementById("melding").innerHTML = "Veel succes!";

    nieuwEten();

    clearInterval(timer);
    timer = setInterval(stap, 150);
}

function nieuwEten() {
    etenX = Math.floor(Math.random() * vakjes);
    etenY = Math.floor(Math.random() * vakjes);
}

function stap() {
    var kopX = slang[0].x + richtingX;
    var kopY = slang[0].y + richtingY;

    if (kopX < 0 || kopY < 0 || kopX >= vakjes || kopY >= vakjes) {
        gameOver();
        return;
    }

    for (var i = 0; i < slang.length; i++) {
        if (slang[i].x == kopX && slang[i].y == kopY) {
            gameOver();
            return;
        }
    }

    slang.unshift({ x: kopX, y: kopY });

    if (kopX == etenX && kopY == etenY) {
        score = score + 10;
        document.getElementById("score").innerHTML = score;
        nieuwEten();
    } else {
        slang.pop();   
    }

    tekenen();
}

function tekenen() {
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 400, 400);

    ctx.fillStyle = "yellow";
    ctx.fillRect(etenX * grootte, etenY * grootte, grootte, grootte);

    for (var i = 0; i < slang.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "#0284c7";
        }
        ctx.fillRect(slang[i].x * grootte, slang[i].y * grootte, grootte - 2, grootte - 2);
    }
}

function gameOver() {
    clearInterval(timer);
    document.getElementById("melding").innerHTML = "Game over! Je score is " + score + ".";
}

function verander(x, y) {
    if (x == -richtingX && y == -richtingY) {
        return;
    }
    richtingX = x;
    richtingY = y;
}


document.onkeydown = function (event) {
    if (event.key == "ArrowUp") {
        verander(0, -1);
    } else if (event.key == "ArrowDown") {
        verander(0, 1);
    } else if (event.key == "ArrowLeft") {
        verander(-1, 0);
    } else if (event.key == "ArrowRight") {
        verander(1, 0);
    }
};

ctx.fillStyle = "#0f172a";
ctx.fillRect(0, 0, 400, 400);
