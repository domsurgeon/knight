function startModel() {
  model = new ml5.neuralNetwork(options);
  return;
}

let oldTD = 0
async function saveSteps(steps) {

  steps.forEach(async (position) => {
    let target = {
      path: position.path,
    };

    oldTD++
    const input = [ position.inputs.dx, position.inputs.dy ]
    await model.addData(input, target);
  });
}

function trainModel() {
  $('#predict')[0].style = "";
  model.normalizeData();
  console.log("normalized");

  console.log("started training");
  model.train(
    {
      epochs: 30,
    },
    whileTraining,
    () => {
      console.log("finished training");
    }
  );
}

async function pathFromInputPrediction(inputs) {
  const pathsPredict = await model.classify(inputs);

  const bestConfidence = Math.max(...pathsPredict.map((k) => k.confidence));
  const path = pathsPredict.find((k) => k.confidence === bestConfidence).label;

  return path;
}





































function saveModel() {
  model.save();
}

function loadModel() {
  startModel()

  model.load({
    model: `model/model.json`,
    metadata: `model/model_meta.json`,
    weights: `model/model.weights.bin`,
  })
  console.log('model loaded')
}

function saveData() {
  model.saveData();
}

const whileTraining = (epoch, loss) => {
  // console.log(epoch);
};
