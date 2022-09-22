async function randomTrain() {

  train()

  async function train() {
    console.clear();
    let o = 0;
    const ROUNDS = 20;

    while (o < ROUNDS) {
      const randomTargetPosition = {
        x: Math.floor(Math.random() * boardWidth - boardWidth / 2),
        y: Math.floor(Math.random() * boardWidth - boardWidth / 2),
      };

      let oo = 0;
      let bestMoves = 500;
      let bestSteps = [];

      while (oo < ROUNDS) {
        const { countMoves, steps } = await movesToPosition(randomTargetPosition);
        const isBetter = countMoves < bestMoves;
        bestMoves = isBetter ? countMoves : bestMoves;
        bestSteps = isBetter ? steps : bestSteps;
        oo++;
      }
      await saveSteps(bestSteps);

      o++;
    }
    console.log('done train')
  }
}

async function movesToPosition(targetPosition) {
  // best of 50

  const moves = await getMovesFromZero();

  async function getMovesFromZero() {
    //
    let countMoves = 0;
    const steps = [];
    let stepsPosiblePositions = [];
    let lastPosition = {
      ...initialPosition,
    };
    let posiblePositions = getPosiblePositions();

    function hasPosibles() {
      return Object.keys(posiblePositions).length > 0;
    }

    function labelFromPositionsIndex(index) {
      return Object.keys(posiblePositions)[index];
    }

    function sortShorterDistance(positionA, positionB) {
      const aDis = Math.hypot(targetPosition.x - positionA.x, targetPosition.y - positionA.y)
      const bDis = Math.hypot(targetPosition.x - positionB.x, targetPosition.y - positionB.y);

      return aDis === bDis ? 0 : aDis > bDis ? 1 : -1;
    }

    function getPosiblePositions() {
      const allPosibles = getAllPosiblePositionsObject(lastPosition);
      const posiblesArr = Object.keys(allPosibles)
        .map((label) => ({ ...allPosibles[label], label }))
        .sort(sortShorterDistance)
        .slice(0, 3);

      const posiblesObj = posiblesArr.reduce((acc, pos) => {
        acc[pos.label] = {
          x: pos.x,
          y: pos.y,
        };
        return acc;
      }, {});

      return posiblesObj;
    }

    async function tryFromLastPosition() {
      let nextPositionIndex = Math.floor(
        Math.random() * Object.keys(posiblePositions).length
      );
      let nextPositionLabel = labelFromPositionsIndex(nextPositionIndex);

      const nextPosition = posiblePositions[nextPositionLabel];

      let nextDistance = Math.sqrt(
        Math.pow(targetPosition.x - nextPosition.x, 2) +
          Math.pow(targetPosition.y - nextPosition.y, 2)
      );

      delete posiblePositions[nextPositionLabel];

      const newStep = {
        label: nextPositionLabel,
        inputs: {
          dx: targetPosition.x - lastPosition.x,
          dy: targetPosition.y - lastPosition.y,
        },
      };

      countMoves++;
      steps.push(newStep);
      stepsPosiblePositions.push({ ...posiblePositions });

      if (nextDistance === 0) {
        // FINISH

        return { countMoves, steps };
      }

      lastPosition = nextPosition;

      if (!hasPosibles()) {
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

      return await tryFromLastPosition();
    }

    return await tryFromLastPosition();
  }

  return moves;
}
