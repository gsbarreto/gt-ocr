const sharp = require("sharp");
const fs = require("fs");

const cutFiles = async () => {
  console.log("## Started to cut images");
  const dirToRead = await fs.readdirSync("./to-cut");
  console.log("Cars quantity >>>", dirToRead.length);

  for (let i = 0; i < dirToRead.length; i++) {
    const readingDirectory = dirToRead[i];
    const filesToCut = await fs.readdirSync(`./to-cut/${readingDirectory}`);
    console.log("Processing folder >>>", readingDirectory);
    for (let j = 0; j < filesToCut.length; j++) {
      const directoryExists = await fs.existsSync(
        `./to-process/${readingDirectory}`
      );

      if (!directoryExists) {
        await fs.mkdirSync(`./to-process/${readingDirectory}`);
      }

      await sharp(`./to-cut/${readingDirectory}/${filesToCut[j]}`)
        // .extract({ left: 2757, top: 177, width: 1023, height: 1425 }) -- 4k
        .extract({ left: 1413, top: 90, width: 507, height: 703 })
        .toFile(`./to-process/${readingDirectory}/${filesToCut[j]}`);
    }
  }

  console.log("## Finished to cut images");
};

module.exports = { cutFiles };
