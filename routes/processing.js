var express = require('express');
var router = express.Router();
const readJson = require('./../helpers/global/readJson.js');
const { notInSystemReport } = require('./../config/constants.js');

router.post('/', function (req, res, next) {
  var numberOfMissingEntries = 0;
  var numberOfChangedEntries = 0;
  if (!Array.isArray(req.body)) {
    return res.status(400).send('Invalid data type for receiving api'); //if request body isnt array
  }

  var totalNumberOfEntriesInDatabase = readJson(
    './database/Database.json'
  ).length;
  //mutex lock
  req.body.forEach((element) => {
    if (element.reportMessage === notInSystemReport) {
      numberOfMissingEntries += 1;
    } else {
      numberOfChangedEntries += 1;
    }
  });

  var missingScore = numberOfMissingEntries / totalNumberOfEntriesInDatabase;
  var accuracyScore = numberOfChangedEntries / totalNumberOfEntriesInDatabase;
  var resp = {
    reportArray: req.body,
    missingScore: missingScore,
    accuracyScore: accuracyScore,
  };
  res.send(resp);
});

module.exports = router;
