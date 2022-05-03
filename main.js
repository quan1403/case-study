

    const canvas = document.getElementById("canvas")

    const GAME_WIDTH = 1000
    let UNIT = 20
    const SNAKE_COLOR = 'white'
    canvas.width = canvas.height = GAME_WIDTH;
    const ctx = canvas.getContext('2d')
    const BACKGROUND_COLOR = 'black'
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_WIDTH)

    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    const GAME_DELAY = 100

    let gameOver = false;





    class Vector2d {
    constructor(x, y) {
    this.x = x
    this.y = y
}
}

    let currentDirection = new Vector2d(-1, 0)


    class Snake {
    constructor() {
    this.body = [
    new Vector2d(UNIT * 10, UNIT * 9),
    new Vector2d(UNIT * 12, UNIT * 9),
    new Vector2d(UNIT * 14, UNIT * 9),
    ]
    this.head = this.body[0]
    this.speed = new Vector2d(1, 0)
}

    draw() {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.body[0].x, this.body[0].y, UNIT, UNIT)
    ctx.fillStyle = SNAKE_COLOR
    for (let i = 1; i < this.body.length; i++) {
    ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT)
}
}

    clear() {
    ctx.fillStyle = SNAKE_COLOR
    ctx.fillRect(this.body[0].x, this.body[0].y, UNIT, UNIT)
    ctx.fillStyle = BACKGROUND_COLOR
    for (let i = 1; i < this.body.length; i++) {
    ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT)
}
}

    handleBound() {
    if (this.head.x <= 0 || this.head.x >= GAME_WIDTH) {
    gameOver = true;
}
    else if (this.head.y <= 0 || this.head.y >= GAME_WIDTH) {
    gameOver = true;
}

}

    move() { if (!gameOver) {
    this.clear()
    for (let i = this.body.length - 1; i >= 1; i--) {
    this.body[i].x = this.body[i - 1].x
    this.body[i].y = this.body[i - 1].y

}
    this.body[0].x += this.speed.x * UNIT
    this.body[0].y += this.speed.y * UNIT
    this.handleBound()


    this.draw()
} else {
    alert('GameOver')
}

}


    checkEat(food) {
    let head = this.body[0]
    return food.x === head.x && food.y === head.y
}

    grow() {
    this.clear()
    let snakelength = this.body.length
    let mountX = this.body[snakelength - 1].x - this.body[snakelength - 2].x
    let mountY = this.body[snakelength - 1].y - this.body[snakelength - 2].y

    let newPart = new Vector2d(
    this.body[snakelength - 1].x + mountX,
    this.body[snakelength - 1].y + mountY,
    )
    this.body.push(newPart)
    this.draw()
}


}

    class Food {
    constructor(x, y) {
    this.x = x
    this.y = y

}

    draw() {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.x, this.y, UNIT, UNIT)
}

    clear() {
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(this.x, this.y, UNIT, UNIT)
}

    getRandomNumber() {

    let randomNumber = Math.floor(Math.random() * GAME_WIDTH)
    randomNumber -= randomNumber % UNIT
    return randomNumber
}

    spawn() {
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
    setInterval(() => {
    player.move()
    if (player.checkEat(food)) {
    player.grow()
    food.spawn()
}
}
    , GAME_DELAY);

    document.onkeydown = function (e) {
    switch (e.keyCode) {
    case LEFT:
    if (currentDirection.x === 1) break
    player.speed = new Vector2d(-1, 0)
    currentDirection = new Vector2d(-1, 0)
    break;
    case RIGHT:
    if (currentDirection.x === -1) break
    player.speed = new Vector2d(1, 0)
    currentDirection = new Vector2d(1, 0)
    break;
    case UP:
    if (currentDirection.y === 1) break
    player.speed = new Vector2d(0, -1)
    currentDirection = new Vector2d(0, -1)
    break;
    case DOWN:
    if (currentDirection.y === -1) break
    player.speed = new Vector2d(0, 1)
    currentDirection = new Vector2d(0, -1)
    break;

    default:
    break;
}
}

