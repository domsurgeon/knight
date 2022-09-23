function getAllPosiblePositionsObject(position) {
  return {
    A: {
      y: position.y + 2,
      x: position.x + 1,
    },
    B: {
      y: position.y + 1,
      x: position.x + 2,
    },
    C: {
      y: position.y + -1,
      x: position.x + 2,
    },
    D: {
      y: position.y + -2,
      x: position.x + 1,
    },
    E: {
      y: position.y + -2,
      x: position.x + -1,
    },
    F: {
      y: position.y + -1,
      x: position.x + -2,
    },
    G: {
      y: position.y + 1,
      x: position.x + -2,
    },
    H: {
      y: position.y + 2,
      x: position.x + -1,
    },
  };
}

function getPositionFromPath(position, path) {
  return getAllPosiblePositionsObject(position)[path];
}

const initialPosition = {
  x: 0,
  y: 0,
};

function rememberTries() {
  const tries = $("#tries").val() * 1;
  localStorage.setItem("tries", tries);
}

function storageTries() {
  const tries = localStorage.getItem("tries") * 1 || 20;
  $("#tries").val(tries);
}

function rememberBW() {
  const boardWidth = $("#board-width").val() * 1;
  localStorage.setItem("boardWidth", boardWidth);
}

function storageBW() {
  const boardWidth = localStorage.getItem("boardWidth") * 1 || 9;
  $("#board-width").val(boardWidth);
}

const options = {
  inputs: ["dx", "dy"],
  outputs: ["path"],
  task: "classification",
  debug: "true",
};

let model;
