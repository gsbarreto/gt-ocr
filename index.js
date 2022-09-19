const { createWorker } = require("tesseract.js");
const fs = require("fs");
const { cutFiles } = require("./src/services/cutImages");

const worker = createWorker({});

const getContentFromImages = async (worker, folder) => {
  const filesToProcess = await fs.readdirSync(`./to-process/${folder}`);

  let textToSave = "";

  for (let i = 0; i < filesToProcess.length; i++) {
    const filename = filesToProcess[i];
    const file = await fs.readFileSync(`./to-process/${folder}/${filename}`);
    const [name] = filename.split(".png");
    console.log("Processing file>>>", name);
    let {
      data: { text },
    } = await worker.recognize(file);
    textToSave = `${textToSave}\n${text}`;
  }

  await fs.writeFileSync(`./to-parse/${folder}.txt`, textToSave);
};

(async () => {
  await cutFiles();

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  console.log("## Starting image processing ");
  const foldersToProcess = await fs.readdirSync("./to-process");

  for (let i = 0; i < foldersToProcess.length; i++) {
    const folder = foldersToProcess[i];
    await getContentFromImages(worker, folder);
  }

  await worker.terminate();
  console.log("## Finished image processing ");
  process.exit();
})();
