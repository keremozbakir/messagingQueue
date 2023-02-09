var express = require('express');
var router = express.Router();
const readJson = require('./../helpers/global/readJson.js');
const {
  differentDataReport,
  notInSystemReport,
} = require('./../config/constants.js');
router.post('/', function (req, res, next) {
  var numberOfMissingEntries = 0;
  var numberOfChangedEntries = 0;
  var totalNumberOfEntriesInDatabase = readJson(
    './database/Database.json'
  ).length;
  //const numberOfMissingEntries = req.body.reportMessage;

  req.body.forEach((element) => {
    if (element.reportMessage === 'Not existing in our system') {
      numberOfMissingEntries += 1;
    } else {
      numberOfChangedEntries += 1;
    }
  });

  var missingScore = numberOfMissingEntries / totalNumberOfEntriesInDatabase;
  var accuracyScore = numberOfChangedEntries / totalNumberOfEntriesInDatabase;
  resp = {
    reportArray: req.body,
    missingScore: missingScore,
    accuracyScore: accuracyScore,
  };
  res.send(resp);
});

module.exports = router;
