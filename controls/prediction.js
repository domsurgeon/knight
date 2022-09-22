function predictBoard() {
  display("predict"); // board positions => prediction(x,y)
}
function walkBoard() {
  // startModel()
  display("walk"); // board positions => prediction(x,y)
}

async function walk (x, y){
  const ROUNDS = 25;
  const targetPos = { x , y }

  let oo = 0;
  let bestMoves = 500;
  let bestSteps = [];

  while (oo < ROUNDS) {
    const { countMoves, steps } = await movesToPosition(targetPos);
    const isBetter = countMoves < bestMoves;
    bestMoves = isBetter ? countMoves : bestMoves;
    bestSteps = isBetter ? steps : bestSteps;

    oo++;
  }

  await saveSteps(bestSteps);

  return bestMoves
}

async function prediction(targetX, targetY) {
  let moves = 0;
  let position = {...initialPosition}
  let steps = []

  async function move() {
    moves ++
    const inputs = {
      dx: targetX - position.x,
      dy: targetY - position.y,
    };

    const label = await labelFromInputPrediction(inputs);
    position = getPositionFromKey(position, label)

    const newStep = {
      label,
      inputs,
    };

    steps.push(newStep)

    if( (targetX - position.x === 0) && (targetY - position.y === 0)){
      console.log("win",moves, steps)
      return moves
    }
    if(moves > boardWidth * 10){
      console.log("lose", moves, steps)
      return -1
    }
    return move()
  }

  return move()
}
