const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

function getDirectoryStructure(dirPath) {
  const items = fs.readdirSync(dirPath);
  const directoryStructure = items.map((item) => {
    const absolutePath = path.join(dirPath, item);
    const isDirectory = fs.statSync(absolutePath).isDirectory();
    return {
      name: item,
      path: absolutePath,
      isDirectory: isDirectory,
      children: isDirectory ? getDirectoryStructure(absolutePath) : [],
    };
  });
  return directoryStructure;
}

router.get("/files", (req, res) => {
  const directoryStructure = getDirectoryStructure("./");
  res.send(directoryStructure);
});

module.exports = router;
