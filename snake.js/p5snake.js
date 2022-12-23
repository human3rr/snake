lvalue = 0;
rvalue = 0;
w = 20;
canvasX = 800;
canvasY = 800;
var foodSquareLoc = [0, 0]; 
score = 0;
var snake = [];

function setup() {
  createCanvas(canvasX, canvasY);
  getNewSquareCoord(foodSquareLoc);
  snake.push(new snakeChunk(0, 0,0,0));
  textSize(32);
}

function getNewSquareCoord(loc){
  loc[0] = random(0, canvasX);
  loc[1] = random(0, canvasY);
  loc[0] = loc[0] - loc[0]%w;
  loc[1] = loc[1] - loc[1]%w;
  return loc;
}

function touchingFood(snakeX, snakeY, foodX, foodY){
  if (snakeX + w > foodX && snakeX < foodX + w && snakeY + w > foodY && snakeY < foodY + w){
    return true;
  }
}

function updateScore(){
   score = score + 1; 
}

function isOutOfBounds(){
  if(snake[0].locx > canvasX - w || snake[0].locy > canvasY - w || snake[0].locy < 0 || snake[0].locx < 0){
    return true;
  }
  return false;
}
speed = 5;
function step(count){
  if(count == 0){
    for ( i = 0; i < snake.length; i++){
    snake[i].prevx = snake[i].locx;
    snake[i].prevy = snake[i].locy;
    }
    snake[0].locx = snake[0].locx + lvalue*w;
    snake[0].locy = snake[0].locy + rvalue*w;

    count = 5;
    return count;
  }
  return --count;
}
  mcount = 5;
  prev_x = 0;
  prev_y = 0;

prevx = 0;
prevy = 0;

function snakeChunk(x, y, prevx, prevy){
  this.locx = x;
  this.locy = y;
  this.prevx = prevx;
  this.prevy = prevy;
}

function drawFood(){
  square(foodSquareLoc[0], foodSquareLoc[1], w);
}

function isItTouchingItsself(){
  for ( i = 1; i < snake.length; i++){
    if (snake[0].locx == snake[i].locx && snake[0].locy == snake[i].locy){
      return true;
    }
  }
  return false;
}
function draw() {
  background(220);
  mcount = step(mcount);
  
  fill('rgba(0,255,0, 0.25)');

  for( i = 0; i < snake.length; i++){
    if (i > 0){
      //print('snake prevx' + snake[i-1].prevx);
      //print('yo' + snake[i-1].prevy);
      snake[i].locx = snake[i-1].prevx;
      snake[i].locy = snake[i-1].prevy;
    }
    square(snake[i].locx,snake[i].locy, w);
  }

  fill(255);

  drawFood();
  
  if (touchingFood(snake[0].locx, snake[0].locy, foodSquareLoc[0], foodSquareLoc[1])){
    getNewSquareCoord(foodSquareLoc);
    thing = new snakeChunk(snake[snake.length - 1].prevx, snake[snake.length - 1].prevy,0,0);
    snake.push(thing);
    updateScore();
  }
  fill(0, 0, 0);
  text(score, 400, 30);
  
  if(isOutOfBounds() || isItTouchingItsself()){
    snake[0].locx = 0;
    snake[0].locy = 0;
    snake.splice(1, snake.length - 1);
    lvalue = 0;
    rvalue = 0;
    score = 0;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && lvalue != 1) {
    lvalue = -1;
    rvalue = 0;
  } else if (keyCode === RIGHT_ARROW && lvalue != -1) {
    lvalue = 1;
    rvalue = 0;
  } else if (keyCode === UP_ARROW && rvalue != 1) {
    rvalue = -1;
    lvalue = 0;
  } else if (keyCode === DOWN_ARROW && rvalue != -1) {
    rvalue = 1;
    lvalue = 0;
  }
}
