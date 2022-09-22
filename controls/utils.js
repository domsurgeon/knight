function getAllPosiblePositionsObject(position) {
  return{
      0: {
        y: position.y + 2,
        x: position.x + 1,
      },
      1: {
        y: position.y + 1,
        x: position.x + 2,
      },
      2: {
        y: position.y + -1,
        x: position.x + 2,
      },
      3: {
        y: position.y + -2,
        x: position.x + 1,
      },
      4: {
        y: position.y + -2,
        x: position.x + -1,
      },
      5: {
        y: position.y + -1,
        x: position.x + -2,
      },
      6: {
        y: position.y + 1,
        x: position.x + -2,
      },
      7: {
        y: position.y + 2,
        x: position.x + -1,
      },
  }
}

function getPositionFromKey(position, key) {
  return {
    0: {
      y: position.y + 2,
      x: position.x + 1,
    },
    1: {
      y: position.y + 1,
      x: position.x + 2,
    },
    2: {
      y: position.y + -1,
      x: position.x + 2,
    },
    3: {
      y: position.y + -2,
      x: position.x + 1,
    },
    4: {
      y: position.y + -2,
      x: position.x + -1,
    },
    5: {
      y: position.y + -1,
      x: position.x + -2,
    },
    6: {
      y: position.y + 1,
      x: position.x + -2,
    },
    7: {
      y: position.y + 2,
      x: position.x + -1,
    },
  }[key]
}

const initialPosition = {
  x: 0,
  y: 0,
};

function rememberTries() {
  const tries = $("#tries").val() * 1
  localStorage.setItem('tries',tries)
}

function storageTries() {
  const tries = localStorage.getItem('tries') * 1 || 20
  $("#tries").val(tries)
}

storageTries()

function rememberBW() {
  const boardWidth = $("#board-width").val() * 1
  localStorage.setItem('boardWidth',boardWidth)
}

function storageBW() {
  const boardWidth = localStorage.getItem('boardWidth') * 1 || 20
  $("#board-width").val(boardWidth)
}

storageBW()
