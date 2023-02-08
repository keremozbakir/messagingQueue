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
  messagesData.forEach((messageData) => {
    const foundData = database.find(
      (dbData) => dbData.Relationsnummer === messageData.Relationsnummer
    );

    if (foundData) {
      var differentFields = compareFields(messageData, foundData);
      console.log('comparing fields');
      console.log(differentFields);

      if (differentFields.length > 0) {
        console.log('creating report');
        report = createReport(foundData.Relationsnummer, differentFields);
      } else {
        void 0;
        //do nothing
      }
    } else {
      report = createReport(foundData.Relationsnummer);
      console.log('creating report 2 ');
    }
  });

  //return this.reportArray;
  if (!report) {
    console.log('no report');
  } else {
    console.log(report);
  }

  res.send(report);
});

module.exports = router;
