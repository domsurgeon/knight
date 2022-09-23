async function prediction(targetX, targetY, bW) {
  let moves = 0;
  let position = {...initialPosition}
  let steps = []

  return await move()

  async function move() {
    const inputs = [
      targetX - position.x,
      targetY - position.y
    ];

    const path = await pathFromInputPrediction(inputs);
    position = getPositionFromPath(position, path)

    const newStep = {
      path,
      inputs,
    };

    steps.push(newStep)
    moves++

    if( (targetX - position.x === 0) && (targetY - position.y === 0)){
      return moves
    }
    if(moves > bW * 10){
      return -1
    }
    return await move()
  }
}
