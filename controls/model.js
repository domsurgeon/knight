const options = {
  inputs: ["dx", "dy"],
  outputs: ["nextPositionKey"],
  task: "classification",
  debug: "true",
};
let model;

startModel()

//
function startModel() {
  model = new ml5.neuralNetwork(options);
  return;
}

let oldTD = 0
async function saveSteps(steps) {

  steps.forEach(async (position) => {
    let target = {
      label: position.label,
    };

    oldTD++
    await model.addData({ ...position.inputs }, target);
  });
}

function trainModel() {
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

async function labelFromInputPrediction(inputs) {
  debugger
  const labelsPredict = await model.classify(inputs);

  const bestConfidence = Math.max(...labelsPredict.map((k) => k.confidence));
  const label = labelsPredict.find((k) => k.confidence === bestConfidence).label;

  return label;
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
