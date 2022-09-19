const sharp = require("sharp");
const fs = require("fs");

const cutFiles = async () => {
  console.log("## Started to cut images");
  const filesToCut = await fs.readdirSync("./to-cut");
  console.log("Images quantity >>>", filesToCut.length);

  for (let i = 0; i < filesToCut.length; i++) {
    await sharp(`./to-cut/${filesToCut[i]}`)
      // .extract({ left: 2757, top: 177, width: 1023, height: 1425 }) -- 4k
      .extract({ left: 1413, top: 90, width: 507, height: 703 })
      .toFile(`./to-process/${filesToCut[i]}`);
  }
  console.log("## Finished to cut images");
};

module.exports = { cutFiles };
