const { createWorker } = require("tesseract.js");
const fs = require("fs");
const { cutFiles } = require("./src/services/cutImages");

const worker = createWorker({});

const getContentFromImage = async (worker, filename) => {
  const file = await fs.readFileSync(`./to-process/${filename}`);
  const [name] = filename.split(".png");
  console.log("Processing file>>>", name);

  let {
    data: { text },
  } = await worker.recognize(file);

  await fs.writeFileSync(`./to-parse/${name}.txt`, text);
};

(async () => {
  await cutFiles();

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  console.log("## Starting image processing ");
  const filesToProcess = await fs.readdirSync("./to-process");

  for (let i = 0; i < filesToProcess.length; i++) {
    await getContentFromImage(worker, filesToProcess[i]);
  }

  await worker.terminate();
  console.log("## Finished image processing ");
  process.exit();
})();
