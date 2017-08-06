var ball = new Particle();
var paddle = new Paddle();
var level = new Board();



var game = {

    keyDown: function (e) {
        if (e.keyCode == 39) {
            paddle.rightPressed = true;
        }
        else if (e.keyCode == 37) {
            paddle.leftPressed = true;
        }
        else if (e.keyCode == 32) {
            ball.moving = true;
            if (level.animationState == false) {
                level.animationState = true;
                animation();
            }
        }
    },

    keyUp: function (e) {
        if (e.keyCode == 39) {
            paddle.rightPressed = false;
        }
        else if (e.keyCode == 37) {
            paddle.leftPressed = false;
        }
    },
    mouseMoveHandler: function (e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddle.x = relativeX - paddle.width / 2;
        }
    },
    resumeFromMouse: function () {
        ball.moving = true;
        if (level.animationState == false) {
            level.animationState = true;
            animation();
        }
    },

    springPositionMove: function (brick) {
        if (brick.springPosition < 630) {
            brick.springPosition += 5;
        } else {
            brick.springPosition = 0;
        }
    },

    toResumeAnimation: function () {

    },

    launchIntoFullscreen: function (element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

document.addEventListener("keydown", game.keyDown);
document.addEventListener("keyup", game.keyUp);
document.addEventListener("mousemove", game.mouseMoveHandler);
canvas.addEventListener("mousedown", game.resumeFromMouse);
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    launchIntoFullscreen.game(canvas);
  }
});

window.onload = function () {
    ball.moving = true;
    level.importLevel(globalLevels['level1']);
    loop2_Play();

}

function animation() {

    level.init();
    if (level.animationState) {
      window.requestAnimationFrame(animation);
    }

}

window.requestAnimationFrame(animation);




