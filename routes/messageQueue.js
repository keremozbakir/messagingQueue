var express = require('express');
var router = express.Router();
const fs = require('fs');
const createReport = require('./../helpers/global/createReport.js');
const compareFields = require('./../helpers/global/compareFields.js');

const database = JSON.parse(
  fs.readFileSync('./database/Database.json').toString()
);

router.post('/', function (req, res, next) {
  const messagesData = req.body;
  var report;
  var reportsArr = [];
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
  res.send(reportsArr);
});

module.exports = router;
