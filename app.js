var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");




/**
 * Board constructor - 
 * calling all the elements on the board.
 * @param {array}  this.level - level array the containes all briks.
 * @param {number} this.score - total score.
 * @param {number} this.life - total life that left.
 * @param {number} this.levelNum - number of the current level.
 * @param {boolean} this.animationState - deside when to play the animation.
 *   
 * 
 */
function Board() {
    this.level = [[],[],[],[]];
    this.score = 0;
    this.life = 3;
    this.levelNum = 1;
    this.animationState = true;
}

Board.prototype.levelCounter = function () {
    this.levelNum ++;
}

Board.prototype.init = function (level) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.pullForDraw();
    this.scoreDraw();
    this.lifeDraw();
    ball.move();
    paddle.move();
    ball.hitDetection();
}

Board.prototype.importLevel = function (levelMap) {
    if (levelMap) {
        for (var col = 0; col < levelMap.length; col++) {
            for (var row = 0; row < levelMap[col].length; row++) {
                this.level[col][row] = levelMap[col][row];
            }
        }
    }
            return levelMap;
}

Board.prototype.pullForDraw = function () {
    for (var col = 0; col < this.level.length; col++) {
        for (var row = 0; row < this.level[col].length; row++) {
            this.level[col][row].draw();
        }
    }
}

Board.prototype.scoreDraw = function () {
    ctx.font = "22px Arial bold";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+ this.score, 5, 20);
}

Board.prototype.lifeDraw = function () {
    ctx.font = "22px Arial bold";
    ctx.fillStyle = "black";
    ctx.fillText("life: "+ this.life, canvas.width - 60, 20);
}

Board.prototype.nextLevelMsg = function () {
    ctx.font = "32px Arial";
        ctx.fillStyle = "black";
        this.textsize1 = ctx.measureText('OK!!! you win the level').width;
        ctx.fillText('OK!!! you win the level', (canvas.width - this.textsize1) /2, 80);
        ctx.font = "26px Arial";
        this.textsize2 = ctx.measureText('Prepare to next one').width;
        ctx.fillText('Prepare to next one', (canvas.width - this.textsize2) /2, 160);
        ctx.font = "18px Arial";
        this.textsize2 = ctx.measureText('Press Enter or click the mouse').width;
        ctx.fillText('Press Enter or click the mouse', (canvas.width - this.textsize2) /2, 220);
}

Board.prototype.endOfTheGameMsg = function(){
     ctx.font = "24px Arial";
        ctx.fillStyle = "red";
        this.textsize1 = ctx.measureText('You finished The game').width;
        ctx.fillText('You finished The game', (canvas.width - this.textsize1) /2, 80);
        ctx.font = "36px Arial";
        ctx.fillStyle = "#1d00ff";
        this.textsize2 = ctx.measureText('your score is:' + this.score).width;
        ctx.fillText('your score is: ' + this.score, (canvas.width - this.textsize2) /2, 140);
}

Board.prototype.nextLevel = function () {
    ctx.fillStyle = 'rgba(249, 239, 207, 0.7)'
    ctx.rect(0,0,canvas.width, canvas.height);
    ctx.fill();
    this.levelCounter();
    this.importLevel(globalLevels['level' + this.levelNum]);
    if(globalLevels['level' + this.levelNum]){
        this.nextLevelMsg();
    }else{
       this.endOfTheGameMsg();
    }
    level.animationState = false;
    // document.location.reload();
}

Board.prototype.gameOver = function(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(252, 209, 209, 0.7)'
    ctx.rect(0,0,canvas.width, canvas.height);
    ctx.fill();
    ctx.font = "48px Arial";
    ctx.fillStyle = "blue";
    this.textsize3 = ctx.measureText('Game Over !!!').width;
    ctx.fillText('Game Over !!!', (canvas.width - this.textsize3)/2, 80);
    ctx.font = "32px Arial";
    ctx.fillStyle = "red";
    this.textsize3 = ctx.measureText('““”̿ ̿ ̿ ̿ ̿’̿’̵͇̿̿з=(•̪●)=ε/̵͇̿̿/̿ ̿ ̿ ̿ ̿’““').width;
    ctx.fillText('““”̿ ̿ ̿ ̿ ̿’̿’̵͇̿̿з=(•̪●)=ε/̵͇̿̿/̿ ̿ ̿ ̿ ̿’““', (canvas.width - this.textsize3)/2, 150);
    level.animationState = false;
    // document.location.reload();
}
/**
 * ball constructor function
 * @param {string} this.color - the color of the ball
 * @param {number} this.x - initial the ball place on x scale
 * @param {number} this.y - initial the ball place on y scale
 * @param {number} this.radius - initial the ball size
 * @param {number} this.dx - initial the ball direction (speed) on x scale
 * @param {number} this.dy - initial the ball direction (speed) on y scale
 * @param {boolean} this.moving - stop the ball after events
 */
function Particle() {
    this.color = 'black';
    this.x = canvas.width / 2;
    this.y = canvas.height - 21;
    this.radius = 10;
    this.dx = 3;
    this.dy = -3;
    this.moving = false;
}
/**
 * draw the ball
 */
Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
}
/**
 * animate the ball and check Collission with the borders and paddle
 */
Particle.prototype.move = function () {
    this.draw();
    if(this.moving){
        this.x += this.dx;
        this.y += this.dy;
    }else{
        this.x = paddle.x + (paddle.width /2) ;
        this.y = canvas.height - 21;
    }

    if ((this.x + this.radius) + this.dx > (canvas.width - this.radius) || (this.x + this.radius) + this.dx < this.radius) {
        this.dx = this.dx * (-1);
    }
    if ((this.y + this.radius) + this.dy < this.radius) {
        this.dy = - this.dy;
    } else if ((this.y + this.radius) + this.dy > canvas.height - this.radius) {
        if (this.RectCircleColliding(paddle)) {
            this.dy = - this.dy;
            paddlePlay();
        } else if ((this.y + this.radius) + this.dy > canvas.height + this.radius) {
            level.life--;
            diePlay();
            this.moving = false;
            // paddle.drawAfterLossOrWin();
            this.x = paddle.x + (paddle.width /2) ;
            this.y = canvas.height - 30;
            this.dx = 3;
            this.dy = -3;
        }
    }
    if (level.life == 0) {
        level.gameOver();
    }
}

/**
 * check Collission function
 */
Particle.prototype.RectCircleColliding = function (position) {
    var centerX = position.x + position.width / 2;
    var centerY = position.y + position.height / 2;

    var distX = Math.abs(this.x - position.x - position.width / 2);
    var distY = Math.abs(this.y - position.y - position.height / 2);

    if (distX > (position.width / 2 + this.radius)) {
        return false;
    }
    if (distY > (position.height / 2 + this.radius)) {
        return false;
    }
    if (distX <= (position.width / 2)) {
        if (Math.abs(this.y - centerY) > Math.abs(this.dy + this.y - centerY)) {
            this.dy = -this.dy;
        }
        return true;
    }
    if (distY <= (position.height / 2)) {
        if (Math.abs(this.x - centerX) > Math.abs(this.dx + this.x - centerX)) {
            this.dx = -this.dx;
        }
        return true;
    }
    var dx = distX - position.width / 2;
    var dy = distY - position.height / 2;

    if ((dx * dx + dy * dy <= (this.radius * this.radius))) {
        var d;
        if (Math.abs(this.x - centerX) > Math.abs(this.dx + this.x - centerX)) // if is moving to center x
        {
            this.dx = this.dx * (-1.1);
            d = (this.dx > 0) ? 1 : -1;
            this.dx = Math.min(Math.abs(this.dx), 3) * d;
        }
        if (Math.abs(this.y - centerY) > Math.abs(this.dy + this.y - centerY)) // if is moving to center y
        {
            this.dy = this.dy * (-1.1);
            d = (this.dy > 0) ? 1 : -1;
            this.dy = Math.min(Math.abs(this.dy), 3) * d;
        }
        return true;
    }
    return false;
},

/**
 * check Collissions with the briks
 */

    Particle.prototype.hitDetection = function () {
        var bricksLeft = false;
        for (var col = 0; col < level.level.length; col++) {
            for (var row = 0; row < level.level[col].length; row++) {
                var brick = level.level[col][row];
                game.springPositionMove(brick);
                if (brick.life > 0 && this.RectCircleColliding(brick)) {
                    level.score += brick.score;
                    brickPlay();
                    // this.dy = - this.dy;
                    brick.color = 'rgb(' + (Math.floor(Math.random() * (300 - 0)) + 0) + ',' + (Math.floor(Math.random() * (300 - 0)) + 0) + ',' + (Math.floor(Math.random() * (300 - 0)) + 0) + ')';
                    brick.life--;
                }
                if (brick.life == 0) {
                    brick.width = 0;
                    brick.height = 0;
                } else {
                    bricksLeft = true;
                }
            }
        }
        if (!bricksLeft && this.moving) {
            this.x = paddle.x + (paddle.width / 2);
            this.y = canvas.height - 30;
            this.dx = 3;
            this.dy = -3;
            level.nextLevel();
        }
    }

/**
 * paddle constructor
 */
function Paddle() {
    this.height = 10;
    this.width = 80;
    this.x = (canvas.width - this.width) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
}

Paddle.prototype.draw = function () {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = "#D4AF37";
    ctx.fill();
    ctx.closePath();
}

Paddle.prototype.move = function () {
    this.draw();

    if (this.rightPressed == true && (this.x < canvas.width - this.width)) {
        this.x += 5;
    }
    else if (this.leftPressed == true && this.x > 0) {
        this.x -= 5;
    }
}

