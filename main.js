const canvas = document.getElementById("canvas")

const GAME_WIDTH = 800
let UNIT = 40
const SNAKE_COLOR = 'white'
canvas.width = canvas.height = GAME_WIDTH
const ctx = canvas.getContext('2d')
const BACKGROUND_COLOR = 'black'
ctx.fillStyle = BACKGROUND_COLOR
ctx.fillRect(0,0,GAME_WIDTH,GAME_WIDTH)

const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const GAME_DELAY = 100

function barrie() {
    ctx.beginPath()
    ctx.fillStyle = "red";
    ctx.fillRect(320,0,150,20);
    ctx.closePath()
}
function barrie1() {
    ctx.beginPath()
    ctx.fillStyle = "red";
    ctx.fillRect(780,300,20,150);
    ctx.closePath()
}
function barrie2() {
    ctx.beginPath()
    ctx.fillStyle = "red";
    ctx.fillRect(340,780,150,20);
    ctx.closePath()
}
function barrie3() {
    ctx.beginPath()
    ctx.fillStyle = "red";
    ctx.fillRect(0,300,20,150);
    ctx.closePath()
}





class Vector2d{
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}
let currentDirection = new Vector2d(-1,0)


class Snake{
    constructor() {
        this.body = [
            new  Vector2d(UNIT *2, UNIT *3),
            new  Vector2d(UNIT *3, UNIT *3),
            new  Vector2d(UNIT *4, UNIT *3),
        ]
        this.head = this.body[0]
        this.speed = new Vector2d(-1,0)
    }
    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.body[0].x , this.body[0].y, UNIT,UNIT)
        ctx.fillStyle = SNAKE_COLOR
        for (let i=1;i<this.body.length;i++){
            ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT)
        }
    }
    clear(){
        ctx.fillStyle = SNAKE_COLOR
        ctx.fillRect(this.body[0].x , this.body[0].y, UNIT,UNIT)
        ctx.fillStyle = BACKGROUND_COLOR
        for (let i=1;i<this.body.length;i++){
            ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT)
        }
    }

    handleBound (){
        if(this.head.x < 0){
            this.head.x = GAME_WIDTH - UNIT
        }
        if (this.head.x > GAME_WIDTH - UNIT){
            this.head.x = 0
        }

        if(this.head.y < 0){
            this.head.y = GAME_WIDTH - UNIT
        }
        if (this.head.y > GAME_WIDTH - UNIT){
            this.head.y = 0
        }

    }
    move(){
        this.clear()
        for (let i = this.body.length -1; i >=1 ; i--) {
            this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y

        }
        this.body[0].x += this.speed.x *UNIT
        this.body[0].y += this.speed.y *UNIT
        this.handleBound()


        this.draw()

    }
    checkEat(food){
        let head = this.body[0]
        return food.x === head.x && food.y === head.y
    }
    grow(){
        this.clear()
        let snakelength = this.body.length
        let mountX = this.body[snakelength - 1].x - this.body[snakelength -2 ].x
        let mountY = this.body[snakelength -1].y - this.body[snakelength -2].y

        let newPart = new Vector2d(
            this.body[snakelength - 1].x + mountX,
            this.body[snakelength -1].y + mountY,
        )
        this.body.push(newPart)
        this.draw()
    }
}
class Food{
    constructor(x,y) {
        this.x = x
        this.y =y

    }
    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x , this.y, UNIT,UNIT)
    }
    clear(){
        ctx.fillStyle = BACKGROUND_COLOR
        ctx.fillRect(this.x , this.y, UNIT,UNIT)
    }
    getRandomNumber(){

        let randomNumber = Math.floor(Math.random()  * GAME_WIDTH)
        randomNumber -= randomNumber % UNIT
        return randomNumber
    }
    spawn(){
        this.clear()
        this.x = this.getRandomNumber()
        this.y = this.getRandomNumber()
        this.draw()
    }


}



let player = new Snake()
player.draw()
let food = new Food()
food.spawn()
setInterval(() =>{
player.move()
    if(player.checkEat(food)){
        player.grow()
        food.spawn()
    }
    }
,GAME_DELAY);

document.onkeydown = function (e) {
    switch (e.keyCode){
        case LEFT:
            if(currentDirection.x === 1)break
            player.speed = new Vector2d(-1,0)
            currentDirection= new Vector2d(-1,0)
            break;
        case RIGHT:
            if(currentDirection.x === -1)break
            player.speed = new Vector2d(1,0)
            currentDirection = new Vector2d(1,0)
            break;
        case UP:
            if(currentDirection.y === 1)break
            player.speed = new Vector2d(0,-1)
            currentDirection = new Vector2d(0,-1)
            break;
        case DOWN:
            if(currentDirection.y === -1)break
            player.speed = new Vector2d(0,1)
            currentDirection = new Vector2d(0,-1)
            break;

        default:
            break;
    }
}
barrie();
barrie1();
barrie2();
barrie3()