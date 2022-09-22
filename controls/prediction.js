async function prediction(targetX, targetY, bW) {
  let moves = 0;
  let position = {...initialPosition}
  let steps = []

  return await move()

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
      return moves
    }
    if(moves > bW * 10){
      return -1
    }
    return await move()
  }
}
