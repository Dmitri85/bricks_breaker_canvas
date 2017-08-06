

function BrickBase(arg){
    this.width = arg.width;
    this.height = arg.height;
    this.x = arg.x;
    this.y = arg.y;
    this.score = arg.score;
    this.life = arg.life;
}

BrickBase.prototype.basicDraw = function(){
    ctx.beginPath();
}

/**
 * brick constructor
 */

function BrickRect(arg) {
    BrickBase.apply(this, arguments);
    this.color = arg.color;
   
}

BrickRect.prototype = Object.create( BrickBase.prototype );
BrickRect.prototype.constructor = BrickRect;

BrickRect.prototype.draw = function () {
    this.basicDraw();
    // ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.closePath();
}



/**
 * brick constructor
 */

function BrickSprite(arg) {
    BrickBase.apply(this, arguments);
    this.image = new Image();
    this.image.src = 'img/sprite1.png';
    this.springPosition = 0;
}

BrickSprite.prototype = Object.create( BrickBase.prototype );
BrickSprite.prototype.constructor = BrickSprite;


BrickSprite.prototype.draw = function () {
    // ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.drawImage(this.image, this.springPosition, 0, 70, 20, this.x, this.y, this.width, this.height );
    ctx.stroke();
    // ctx.closePath();
}



























// function BrickBase(arg){
//     this.width = arg.width;
//     this.height = arg.height;
//     this.x = arg.x;
//     this.y = arg.y;
//     this.score = arg.score;
//     this.life = arg.life;
// }
// /**
//  * brick constructor
//  */

// BrickBase.prototype.draw = function(){

// }


// function BrickRect(arg) {
//     BrickBase.call(this, arg.width);
//     BrickBase.call(this, arg.height);
//     BrickBase.call(this, this.x);
//     BrickBase.call(this, this.y);
//     BrickBase.call(this, this.score);
//     BrickBase.call(this, this.life);
//     this.color = arg.color;

// }

// // BrickRect.prototype = Object.create( BrickBase.prototype );
// // BrickRect.prototype.constructor = this.level[col][row];


// BrickRect.prototype.draw = function () {
//     ctx.beginPath();
//     ctx.rect(this.x, this.y, this.width, this.height);
//     ctx.fillStyle = this.color;
//     ctx.fill();
//     // ctx.closePath();
// }



// /**
//  * brick constructor
//  */

// function BrickSprite(arg) {
//     // BrickBase.call(this);
//     this.image = new Image();
//     this.image.src = 'img/sprite1.png';
//     this.springPosition = 0;
// }

// // BrickSprite.prototype = Object.create( BrickBase.prototype );
// // BrickSprite.prototype.constructor = this.level[col][row];

// BrickSprite.prototype.draw = function () {
//     ctx.beginPath();
//     ctx.rect(this.x, this.y, this.width, this.height);
//     ctx.fillStyle = this.color;
//     ctx.drawImage(this.image, this.springPosition, 0, 70, 20, this.x, this.y, this.width, this.height );
//     ctx.stroke();
//     // ctx.closePath();
// }