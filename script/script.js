const targetHolder = document.querySelector(".targetpool")
const targetDummy = document.querySelector(".dummytarget")
const gameOverScreen = document.querySelector(".gameoverscreen")
const scoreDom = document.querySelector("#score")
const timeDom = document.querySelector("#time")
const gamescreen = document.querySelector(".gamescreen")
const mainmenu = document.querySelector(".mainmenu")
const gun = document.querySelector(".gun")

const targetSource = ["/assets/target1.png", "/assets/target2.png", "/assets/target3.png"]
const gunSource = ["/assets/gun1.png", "/assets/gun2.png"]

let playerName = ""
let gunType = "1"
let targetType = "1"

let isGameStarted = false
let isGameOver = false

let score = 0
let time = 10
let spawntime = 3
let level = 30
let history = localStorage.getItem("history")

function startGame() {
    clearGame()
    spawnTarget()
    spawnTarget()
    spawnTarget()
    isGameStarted = true
    isGameOver = false
    gameOverScreen.style.display = "none"
    gamescreen.style.display = "flex"
    mainmenu.style.display = "none"
} 

function mainMenu(){
    gamescreen.style.display = "none"
    mainmenu.style.display = "flex"
}

function clearGame(){
    targetHolder.innerHTML = ""
    score = 0
    time = level
    
}

function gameOver() {
    isGameOver = true
    gameOverScreen.style.display = "flex"
}

function minusTime() {
    time -= 5
}

timeDom.innerHTML = "Time: " + Math.floor(time)

setInterval(() => {
    if (isGameStarted && isGameOver == false) {
        time -= 0.01
        timeDom.innerHTML = "Time: " + Math.round(time)
        if (time <= 0) {
            time = 0
            gameOver()
        }

        spawntime -= 0.01
        if (spawntime <= 0) {
            spawnTarget()
            spawnTarget()
            spawnTarget()
            spawntime = 3
        }
    }
}, 10);

function spawnTarget(){
    const newTarget = targetDummy.cloneNode(true)

    newTarget.src = targetSource[targetType]
    newTarget.style.display = "inline"
    newTarget.style.top = Math.random() * 450 +'px'
    newTarget.style.left = Math.random() * 1000 + 'px'
    targetHolder.appendChild(newTarget)
}

function destroy(id) {
    boomeffect()
    id.remove()
    score += 100
    scoreDom.innerHTML = "Score: " + score
}

function boomeffect() {
    const boom = document.createElement("img")
    boom.src = "/assets/boom.png"
    boom.className = "boom"
    boom.style.left = event.pageX -35 + 'px'
    boom.style.top = event.pageY -30 + 'px'
    targetHolder.appendChild(boom)
    setTimeout(() => boom.remove(), 1000)
}

function changeGun(id) {
    gunType = id
    gun.src = gunSource[gunType]
    console.log(id)
}