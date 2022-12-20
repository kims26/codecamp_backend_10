const { parentPort } = require("worker_threads");

parentPort.on("message", (maxSize) => {
  for (let i = o; i < maxSize; i++) {
    sum += 1;
  }

  parentPort.postMessage(sum);
  parentPort.close();
});
