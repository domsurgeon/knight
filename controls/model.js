const options = {
  inputs: ["dx", "dy"],
  outputs: ["nextPositionKey"],
  task: "classification",
  debug: "true",
};

let model;

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

// function saveData() {
//   model.saveData();
// }

startModel()

function startModel() {
  model = new ml5.neuralNetwork(options);
  return;
}

const whileTraining = (epoch, loss) => {
  // console.log(epoch);
};
function normalizeIt() {
  model.normalizeData();
  console.log("normalized");
  console.log(model.data.training)
}

function trainModel() {
  console.log("started training");
  model.train(
    {
      epochs: 50,
    },
    whileTraining,
    () => {
      console.log("finished training");
    }
  );
}

async function saveSteps(steps) {
  steps.forEach(async (position) => {
    let target = {
      label: position.label,
    };

    await model.addData({ ...position.inputs }, target);
  });
}

async function labelFromInputPrediction(inputs) {
  const labelsPredict = await model.classify(inputs);

  const bestConfidence = Math.max(...labelsPredict.map((k) => k.confidence));
  const label = labelsPredict.find((k) => k.confidence === bestConfidence).label;

  return label;
}
