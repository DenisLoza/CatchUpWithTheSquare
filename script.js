// В переменную $start присваиваем кнопку с id "start"
let $start = document.querySelector("#start")
// В переменную $game присваиваем div с id "game"
let $game = document.querySelector("#game")
// В переменную $time присваиваем span с id "time"
let $time = document.querySelector("#time")
let $result = document.querySelector("#result")
let $timeHeader = document.querySelector("#time-header")
let $resultHeader = document.querySelector("#result-header")
let $gameTime = document.querySelector("#game-time")
// счетчик результатов игры
let score = 0
let isGameStarted = false

// вешаем прослушку события click на button #start, который передаем в ф-цию startGame
$start.addEventListener("click", startGame)
// вешаем прослушку события click на div #game, который передаем в ф-цию handleBoxClick
$game.addEventListener("click", handleBoxClick)
// вешаем прослушку события значения в input на input #game-time, который передаем в ф-цию setGameTime
$gameTime.addEventListener("input", setGameTime)

function showElement($el) {
    $el.classList.remove("hide")
}

function hideElement($el) {
    $el.classList.add("hide")
}

// ф-ция (что будет происходить при нажатии на кнопку START
function startGame() {
    score = 0
    setGameTime()
    // уставнавливаем атрибут disabled=true в input после начала игры
    $gameTime.setAttribute("disabled", "true")
    isGameStarted  = true
    console.log("start")
    // скрываем кнопку START, присваиваем класс .hide, который прописан в CSS (display: none)
    hideElement($start)
    // квадрат внутри игрового поля станет белого цвета
    $game.style.backgroundColor = "#fff"


    // ф-ция счетчика времени игры заданна через интервал времени в 100 мс
    let interval = setInterval(function () {
        // получаем число с плавающей запятой из span #time
        let time = parseFloat($time.textContent)
        console.log("int")
        if (time <= 0) {
            // end game
            // когда заканчивается игра мы останавливаем интервал, чтобы не загружать браузер
            clearInterval(interval)
            // и вызываем ф-цию endGame
            endGame()
        } else {
            // пока игра продолжается передавать текущее уменьшение времени в span #time
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    // вызываем ф-цию renderBox
    renderBox()
}

// ф-ция рендерит случайным образом квадраты внутри игрового поля
function renderBox() {
    // очищаем весь html внутри тега div game (пустое игровое поле)
    $game.innerHTML = ""
    // создаем новый html элемент div
   let box = document.createElement("div")
    let boxSize = getRandom(30, 100)
    // получаем размеры поля div game
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    // размеры div box. длинна равна ширине
    box.style.height = box.style.width = boxSize + "px"
    // абсолютное позиционирование относительно div #game
    box.style.position = "absolute"
    box.style.backgroundColor = generateRandomColor()
    // указываем координаты позиционированния box внутри game
    box.style.top = getRandom(0, maxTop) + "px"
    box.style.left = getRandom(0, maxLeft) + "px"
    box.style.cursor = "pointer"
    // добавляем атрибут data-box со значением true (значение может быть любым) для box
    box.setAttribute("data-box", "true")
    // div box кладем внуть div game. afterbegin - сразу после открытия тега
    $game.insertAdjacentElement("afterbegin", box)
}

function handleBoxClick(event) {
    // если значение isGameStarted = false (фактически !true) то поле игры закрасить черным и выйти из ф-ции handleBoxClick
    if (!isGameStarted) {
        $game.innerHTML = ""
        $game.style.backgroundColor = "#000"
        let gameOver = document.createElement("div")
        gameOver.style.color = "#ff0000"
        gameOver.style.position = "absolute"
        gameOver.style.top = "10px"
        gameOver.textContent = "GAME OVER"
        $game.insertAdjacentElement("afterbegin", gameOver)
        // восстанавливаем значение атрибута disabled в input после начала игры (активируем ввод времени)
        $gameTime.removeAttribute("disabled")
        showElement($start)
        // при завершении игры скрываем поле счетчик
        hideElement($timeHeader)
        // при завершении игры показываем поле результат игры
        showElement($resultHeader)
        setGameScore()
        return
    }
    // покажет целевое событие data внути div #game (box:"true" если произошло событие click по box)
    console.log(event.target.dataset)
    // если произойдет событие, то заново генерим новый box
    if (event.target.dataset.box) {
        // увеличим счетчик р-тов игры на 1
        score++
        renderBox()
    }
}

// ф-ция установки времени игры
function setGameTime() {
    // передаем значение времени из значения в input в span #result-header
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    // вызывает ф-цию showElement и передает туда значение span #time-header
    showElement($timeHeader)
    hideElement($resultHeader)
}

// ф-ция вывода очков игры
function setGameScore() {
    $result.textContent = score.toString()
}

// ф-ция завершения игры
function endGame() {
    isGameStarted = false
}

// ф-ция получения рандомного цвета в шестнадцатиричном формате
function generateRandomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16)
}

// ф-ция получения рандомного целого числа в заданном диапазоне от min до max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
