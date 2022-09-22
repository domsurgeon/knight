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
