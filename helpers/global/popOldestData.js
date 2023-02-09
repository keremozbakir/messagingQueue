const fs = require('fs');
const { messageQueuePath } = require('./../../config/constants.js');
// Read the JSON file
module.exports = function popOldestData() {
  fs.readFile(messageQueuePath, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    let array = JSON.parse(data);
    array.shift();
    // Write the updated array back to the JSON file
    fs.writeFile(messageQueuePath, JSON.stringify(array), (error) => {
      if (error) {
        console.error(error);
        return;
      }
    });
    //console.log('Oldest data removed !');
  });
};
