const fs = require('fs');

module.exports = function updateOrSave(inputData, databasePath) {
  if (fs.existsSync(databasePath)) {
    let fileData = JSON.parse(fs.readFileSync(databasePath).toString());

    let relNummer = inputData.Relationsnummer;

    let existingDataIndex = fileData.findIndex(
      (record) => record.Relationsnummer === relNummer
    );

    if (existingDataIndex !== -1) {
      // Update the existing data

      fileData[existingDataIndex] = inputData;
    } else {
      // Append the new data

      console.log('new data');
      fileData.push(inputData);
    }
    inputData = fileData;
  } else {
    inputData = [inputData]; //if the json is empty , it saves the single data as an array so that the other data can be pushed to array.
  }

  // Write the updated data to the file
  fs.writeFileSync(databasePath, JSON.stringify(inputData, null, 2));
  console.log('Data saved to Database.json file');
};
