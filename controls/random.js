async function random (x, y, ROUNDS ){
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

async function movesToPosition(targetPosition) {
  let countMoves = 0;
  const steps = [];
  let stepsPosiblePositions = [];
  let lastPosition = {
    ...initialPosition,
  };
  let posiblePositions = getPosiblePositions();

  return await moveFromLastPosition();

  async function moveFromLastPosition() {
    let nextPositionIndex = Math.floor(
      Math.random() * Object.keys(posiblePositions).length
    );
    let nextPositionPath = pathFromPositionsIndex(nextPositionIndex);

    const nextPosition = posiblePositions[nextPositionPath];

    let nextDistance = Math.sqrt(
      Math.pow(targetPosition.x - nextPosition.x, 2) +
        Math.pow(targetPosition.y - nextPosition.y, 2)
    );

    delete posiblePositions[nextPositionPath];

    const newStep = {
      path: nextPositionPath,
      inputs: {
        dx: targetPosition.x - lastPosition.x,
        dy: targetPosition.y - lastPosition.y,
      },
    };

    totalMoves++
    countMoves++;
    steps.push(newStep);
    stepsPosiblePositions.push({ ...posiblePositions });

    if (nextDistance === 0) {
      // FINISH

      return { countMoves, steps };
    }

    lastPosition = nextPosition;

    if (!hasPosibles()) {
      console.log('never happened!!')
      countMoves--;
      steps.pop();
      stepsPosiblePositions.pop();
      const last = steps.length - 1;

      const noff = steps[last].inputs;

      lastPosition = steps.length
        ? { x: noff.dx, y: noff.dy }
        : { ...initialPosition };

      posiblePositions = stepsPosiblePositions[last];
    } else {
      posiblePositions = getPosiblePositions();
    }

    return await moveFromLastPosition();
  }

  function hasPosibles() {
    return Object.keys(posiblePositions).length > 0;
  }

  function pathFromPositionsIndex(index) {
    return Object.keys(posiblePositions)[index];
  }

  function sortShorterDistance(positionA, positionB) {
    const aDis = Math.hypot(
      targetPosition.x - positionA.x,
      targetPosition.y - positionA.y
    );
    const bDis = Math.hypot(
      targetPosition.x - positionB.x,
      targetPosition.y - positionB.y
    );

    return aDis === bDis ? 0 : aDis > bDis ? 1 : -1;
  }

  function getPosiblePositions() {
    const allPosibles = getAllPosiblePositionsObject(lastPosition);
    const posiblesArr = Object.keys(allPosibles)
      .map((path) => ({ ...allPosibles[path], path }))
      .sort(sortShorterDistance)
      .slice(0, 3);

    const posiblesObj = posiblesArr.reduce((acc, pos) => {
      acc[pos.path] = {
        x: pos.x,
        y: pos.y,
      };
      return acc;
    }, {});

    return posiblesObj;
  }
}
