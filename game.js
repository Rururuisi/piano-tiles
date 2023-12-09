// key press events
$(document).keydown(function (event) {
    if (disabledGame > 0) return;
    switch (event.keyCode) {
        case 87: //W
            if (board[3][0] === 1 && timer[0] > 0) {
                if (!hit) {
                    timeRun();
                }
                hitCount();
                moveDown();
            } else if (hit) {
                isGameOver(0);
            }
            break;
        case 68: //D
            if (board[3][1] === 1 && timer[0] > 0) {
                if (!hit) {
                    timeRun();
                }
                hitCount();
                moveDown();
            } else if (hit) {
                isGameOver(1);
            }
            break;
        case 75: //K
            if (board[3][2] === 1 && timer[0] > 0) {
                if (!hit) {
                    timeRun();
                }
                hitCount();
                moveDown();
            } else if (hit) {
                isGameOver(2);
            }
            break;
        case 79: //O
            if (board[3][3] === 1 && timer[0] > 0) {
                if (!hit) {
                    timeRun();
                }
                hitCount();
                moveDown();
            } else if (hit) {
                isGameOver(3);
            }
            break;
        default:
            break;
    }
});

// Click Events
$(document).click(function (event) {
    if (
        event.target.id.startsWith("grid-3") &&
        event.target.style.backgroundColor === "black" &&
        timer[0] > 0
    ) {
        if (!hit) {
            timeRun();
        }
        hitCount();
        moveDown();
    } else if (
        hit &&
        event.target.id.startsWith("grid-3") &&
        event.target.style.backgroundColor !== "black"
    ) {
        const col = parseInt(event.target.id.replace("grid-3-", ""));
        isGameOver(col);
    }
});

// Run the timer
function timeRun() {
    if (timer[0] <= 0) {
        return isGameOver();
    }
    timer[0] -= 0.1;
    timer[1] += 0.1;
    $("#timer").text(timer[0].toFixed(1).toString());
    timeout = setTimeout("timeRun()", 100);
}

// Count total hits for black tiles
function hitCount() {
    hit++;
    $("#hit").text(hit.toString());
}

// Move down the black tiles
function moveDown() {
    for (let r = 3; r >= 0; r--) {
        for (let c = 3; c >= 0; c--) {
            if (board[r][c] === 1) {
                if (r === 3) {
                    $(`#grid-${r}-${c}`).css("backgroundColor", "white");
                    board[r][c] = 0;
                } else {
                    $(`#grid-${r}-${c}`).css("backgroundColor", "white");
                    board[r][c] = 0;
                    $(`#grid-${r + 1}-${c}`).css("backgroundColor", "black");
                    board[r + 1][c] = 1;
                }
            }
        }
    }

    // generate black tile for the top row
    let randCol = Math.floor(Math.random() * 4);
    while (board[1][randCol] === 1) {
        randCol = Math.floor(Math.random() * 4);
    }
    $(`#grid-${0}-${randCol}`).css("backgroundColor", "black");
    board[0][randCol] = 1;
}

// Game Over
function isGameOver(col = -1) {
    // Set the white tile that led to game over to red
    // so that the player can know the reason
    if (timer[0] > 0) {
        $(`#grid-3-${col}`).css("backgroundColor", "red");
    }
    disabledGame = 1;
    clearTimeout(timeout);
    $("#gameTime").text(timer[1].toFixed(1).toString());
    $("#gameHits").text(hit.toString());
    // show the red tiles for 1 second then display game over popup
    setTimeout("afterTimeout()", 1000);
}

function afterTimeout() {
    // sometimes the player will hit multiple white tiles at the same time
    // so will cause multiple red tiles, clean all the red tiles
    for (let i = 0; i < 4; i++) {
        if ($(`#grid-3-${i}`)[0].style.backgroundColor === "red") {
            $(`#grid-3-${i}`).css("backgroundColor", "white");
        }
    }
    $("#gameover").css("display", "block");
}
