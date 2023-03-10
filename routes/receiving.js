var express = require('express');
var router = express.Router();
const updateOrSave = require('./../helpers/global/updateOrSave.js');
const saveTomessageQueue = require('./../helpers/global/saveToMessageQueue.js');
const readJson = require('../helpers/global/readJson');
const { correctDataReceiving } = require('./../config/test.constants');
const {
  modes,
  validatorSchema,
  databasePath,
  messageQueuePath,
} = require('./../config/constants.js');

/**
 * @swagger
 * /receiving-api
 *
 *
 *
 */

// private static instance: SuggestionRepository;    private static lock = new Mutex();

router.post('/:mode', function (req, res, next) {
  var mode = req.params.mode;
  const { error, value } = validatorSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error });
  }
  if (!modes.includes(mode)) {
    var wrongMode = true;
    //not a valid mode
  }

  if (mode) {
    if (mode === modes[0]) {
      //api running on standard mode
      updateOrSave(req.body, databasePath);
    } else if (mode === modes[1]) {
      //api running on comparison mode

      saveTomessageQueue(messageQueuePath, req.body);
    } else {
      wrongMode = true;
    }
  }
  res.sendStatus(200);
});

//testing routes
router.get('/:mode/:relationsnummer', function (req, res, next) {
  let searchedSource = null;
  let jsonData = null;
  var foundElement = null;
  const relationsnummer = req.params.relationsnummer;

  if (req.params.mode === 'Standard') {
    jsonData = readJson('./database/Database.json');
    foundElement = jsonData.find(
      (obj) => obj.Relationsnummer === relationsnummer
    );
    searchedSource = 'database';
  } else if (req.params.mode === 'Comparison') {
    jsonData = readJson('./database/messages.json');
    if (jsonData.length === 0) {
      return res.status(200).send('Message Queue empty');
    }
    let obj2String = JSON.stringify(correctDataReceiving);
    jsonData.forEach((element) => {
      var singleData = element[0];
      if (JSON.stringify(singleData) === obj2String) {
        searchedSource = 'messageQueue';
        return res
          .status(200)
          .send({ message: 'Data exists in ' + searchedSource });
      }
    });

    searchedSource = 'messageQueue';
  } else {
    res.status(400).send({ message: 'Invalid mode' });
    return;
  }

  if (foundElement != null) {
    res.status(200).send({ message: 'Data exists in ' + searchedSource });
  } else {
    res.send({ message: 'Data does not exist in ' + searchedSource });
  }
});
module.exports = router;
