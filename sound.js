
var btn_fx = document.querySelector('#fx');
var btn_music = document.querySelector('#music');

btn_music.addEventListener('click', musicCkeck);



var fx_brick = new Audio();
fx_brick.src = 'wav/brick_8bit.wav';
function brickPlay() {
    if (!btn_fx.checked) {
        fx_brick.play();
    }
}

var fx_paddle = new Audio();
fx_paddle.src = 'wav/paddle_8bit.wav';
fx_paddle.volume = 0.2;
function paddlePlay() {
    if (!btn_fx.checked) {
        fx_paddle.play();
    }
}

var fx_die = new Audio();
fx_die.src = 'wav/die_8bit.wav';
fx_die.volume = 0.5;
function diePlay() {
    if (!btn_fx.checked) {
        fx_die.play();
    }
}

var loop_1 = new Audio();
loop_1.src = 'wav/loop_1_8bit.mp3';
loop_1.volume = 0.2;
function loop1_Play() {
    if (!btn_music.checked) {
        loop_1.play();
    }
}
loop_1.onended = function () {
    if (!btn_music.checked) {
        loop2_Play();
    }
};

var loop_2 = new Audio();
loop_2.src = 'wav/loop_2_8bit.wav';
loop_2.volume = 0.6;
function loop2_Play() {
    if (!btn_music.checked) {
        loop_2.play();
    }
}
loop_2.onended = function () {
    loop1_Play();
};

function musicCkeck(){
    if (btn_music.checked){
        loop_2.muted = true;
        loop_1.muted = true;
    }else{
        loop_2.muted = false;
        loop_1.muted = false;
    }
}







