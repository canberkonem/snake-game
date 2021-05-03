const grid = document.querySelector(".areaContainer")
const startBtn = document.querySelector(".startBtn")
const boxes = document.querySelectorAll(".box")
const resetBtn = document.querySelector(".resetBtn")
const gameResult = document.querySelector(".gameover")
let endScore = document.querySelector(".end-score")
let score = document.querySelector(".score")
let currentSnake = [1,0]
let direction = 1
let size = 20
let pointIndex = 0
let scoreText = 0
let difficulty = 400
let pointClassStore = []
let timerId

currentSnake.forEach(index => boxes[index].classList.add("snake"))

function gameStart(){
    startBtn.disabled =true
    let timerId = setInterval(move, difficulty);
    generatePoint()
    resetBtn.addEventListener("click", function(){clearInterval(timerId)})
}

function gameReset(){
  timerId = setInterval(move, difficulty);
  clearInterval(timerId)
  currentSnake.forEach(index => boxes[index].classList.remove("snake"))
  pointClassStore.forEach(index => boxes[index].classList.remove("point"))
  currentSnake = [1,0]
  currentSnake.forEach(index => boxes[index].classList.add("snake"))
  startBtn.disabled = false
  direction = 1
  scoreText = 0
  score.textContent = scoreText
  difficulty = 400

  if(grid.classList.contains("hidden")){
    gameResult.classList.add("hidden")
    grid.classList.remove("hidden")
  }
}


function move(){
    if((currentSnake[0] + size >= size*size && direction === size) ||
    (currentSnake[0] % size === size-1 && direction === 1 ) ||
    (currentSnake[0] % size === 0 && direction === -1)||
    (currentSnake[0] - size < 0 && direction === -size)||
    boxes[currentSnake[0]+direction].classList.contains("snake")
    ){
      grid.classList.add("hidden")
      gameResult.classList.remove("hidden")
      return clearInterval(timerId)
    }
    const tail = currentSnake.pop()
    boxes[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0]+direction)
    boxes[currentSnake[0]].classList.add("snake")

    if(boxes[currentSnake[0]].classList.contains("point")){
      console.log(difficulty)
        scoreText++
        score.textContent = scoreText
        endScore.textContent = scoreText
        boxes[currentSnake[0]].classList.remove("point")
        boxes[tail].classList.add("snake")
        currentSnake.push(tail)
        generatePoint()
        clearInterval(timerId)
        difficulty = difficulty * 0.90
        timerId = setInterval(move, difficulty)
        resetBtn.addEventListener("click", function(){clearInterval(timerId)})
    }
    
}



function generatePoint(){
    do{
        pointIndex = Math.floor(Math.random() * boxes.length)
    } while(boxes[pointIndex].classList.contains("snake"))
    boxes[pointIndex].classList.add("point")
    if(!pointClassStore.includes(pointIndex)){
      pointClassStore.push(pointIndex)
    }
}


window.addEventListener("keydown", function (event) {  
    console.log(event.key)
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
          if(direction!== -size){
              direction = size
          }
        break;
      case "Up": 
      case "ArrowUp":
        if(direction!== size){
            direction = -size
        }
        break;
      case "Left": 
      case "ArrowLeft":
        if(direction!== 1 ){
            direction = -1
        }
        break;
      case "Right": 
      case "ArrowRight":
        if(direction !== -1){
            direction = 1
        }
        break;
      default:
        return; 
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);

startBtn.addEventListener("click", gameStart)
resetBtn.addEventListener("click", gameReset)



