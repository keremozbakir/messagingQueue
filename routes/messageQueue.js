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
  popOldestData();
  messagesData.forEach((messageData) => {
    var foundData = database.find(
      (dbData) => dbData.Relationsnummer === messageData.Relationsnummer
    );

    //console.log(messageData);
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
  //res.send(reportsArr);
});

module.exports = router;
