const fs = require('fs');
const { messageQueuePath } = require('./../../config/constants.js');

module.exports = function popOldestData() {
  if (fs.existsSync(messageQueuePath)) {
    // Read the existing data from the file
    const dataJSON = fs.readFileSync(messageQueuePath);
    data = JSON.parse(dataJSON);
  }
  // pop data
  var lastData = data.pop();
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync(messageQueuePath, dataJSON);
  return lastData;
};
