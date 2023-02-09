const fs = require('fs');
module.exports = function readJson(path) {
  if (fs.existsSync(path)) {
    // Read the existing data from the file
    const dataJSON = fs.readFileSync(path);
    data = JSON.parse(dataJSON);

    return data;
  } else {
    return null;
  }
};
