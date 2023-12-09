const gameTime = 60;
var board = new Array(4);
var timer = [gameTime, 0];
var timeout;
var disabledGame = 1;
var hit = 0;

// Game Initialization
$(function () {
    init();
});

function init() {
    // randomly generate a black tile for each row
    for (let r = 0; r < 4; r++) {
        board[r] = new Array(4);
        let randCol = Math.floor(Math.random() * 4);
        while (r > 0 && board[r - 1][randCol] === 1) {
            randCol = Math.floor(Math.random() * 4);
        }
        board[r][randCol] = 1;
        const block = $(`#grid-${r}-${randCol}`);
        block.css("backgroundColor", "black");
    }
}

// Button Click Events
$("#hintBtn").click(function (event) {
    const hint = $("#hintBackground");
    hint.css("display", "block");
    clearTimeout(timeout);
    disabledGame = 1;
});

$("#restartBtn").on("click", function (event) {
    gameReset();
});

$("#pauseBtn").on("click", function (event) {
    if (timer[1] > 0) {
        $("#pauseBackground").css("display", "block");
        clearTimeout(timeout);
        disabledGame = 1;
    }
});

// Hide all the popup
$(window).on("click", function (event) {
    if (event.target.id === "hintClose" || event.target.id === "hintCloseBtn") {
        $("#hintBackground").css("display", "none");
        disabledGame = 0;
        if (timer[1] > 0) {
            timeRun();
        }
    }
    if (
        event.target.id === "gameoverClose" ||
        event.target.id === "gameoverRestartBtn"
    ) {
        $("#gameover").css("display", "none");
        gameReset();
    }
    if (event.target.id === "resumeBtn") {
        $("#pauseBackground").css("display", "none");
        if (timer[1] > 0) {
            disabledGame = 0;
            timeRun();
        }
    }
});

// Game Reset ( for restart the game)
function gameReset() {
    clearTimeout(timeout);
    hit = 0;
    timer = [gameTime, 0];
    disabledGame = 0;
    $("#hit").text("0");
    $("#timer").text("60.0");
    $(".grid").css("backgroundColor", "white");
    init();
}
