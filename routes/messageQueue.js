var express = require('express');
var router = express.Router();
const fs = require('fs');
const { databasePath } = require('./../config/constants.js');
const createReport = require('./../helpers/global/createReport.js');
const compareFields = require('./../helpers/global/compareFields.js');
const popOldestData = require('./../helpers/global/popOldestData.js');
var report;
const database = JSON.parse(fs.readFileSync(databasePath).toString());

router.post('/', function (req, res, next) {
  const messagesData = req.body;
  var reportsArr = [];
  if (!Array.isArray(messagesData)) {
    return res.status(400).send('Invalid data type for messageQueue'); //if request body isnt array
  }

  if (messagesData.length === 0) {
    return res.status(200).send('MessageQueue empty'); // if messageQueue is empty
  }

  messagesData.forEach((messageData) => {
    var foundData = database.find(
      (dbData) => dbData.Relationsnummer === messageData.Relationsnummer
    );

    if (foundData) {
      var differentFields = compareFields(messageData, foundData);

      if (differentFields.length > 0) {
        report = createReport(foundData.Relationsnummer, differentFields);
        reportsArr.push(...report);
      } else {
        void 0;
        //do nothing
      }
    } else {
      report = createReport(messageData.Relationsnummer);
      reportsArr.push(...report);
    }
  });
  req.body = reportsArr;

  next();
});

module.exports = router;
