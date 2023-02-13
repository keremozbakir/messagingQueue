const fs = require('fs');
const path = 'data.json';
let data = [];
module.exports = function addToMessageQueue(path, newData) {
  // Check if the file exists
  if (fs.existsSync(path)) {
    // Read the existing data from the file
    const dataJSON = fs.readFileSync(path);
    data = JSON.parse(dataJSON);
  }

  // Add JSON data to the array
  data.push([newData]);

  const dataJSON = JSON.stringify(data);

  fs.writeFileSync(path, dataJSON);
};
