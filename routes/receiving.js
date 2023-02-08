var express = require('express');
var router = express.Router();
const updateOrSave = require('./../helpers/global/updateOrSave.js');
const saveTomessageQueue = require('./../helpers/global/saveToMessageQueue.js');
const {
  modes,
  validatorSchema,
  databasePath,
  messageQueuePath,
} = require('./../config/constants.js');

const fs = require('fs');
/* GET home page. */
router.post('/:mode', function (req, res, next) {
  var mode = req.params.mode;

  if (!modes.includes(mode)) {
    var wrongMode = true;
    console.log('not a mode ! ');
  }

  if (mode) {
    if (mode === modes[0]) {
      console.log('api running on standard mode');
      const { error, value } = validatorSchema.validate(req.body);
      if (error) {
        res.send(error);
      } else {
        updateOrSave(req.body, databasePath);
      }
    } else if (mode === modes[1]) {
      console.log('API running on comparison mode');
      //pop oldest data
      saveTomessageQueue(messageQueuePath, req.body);
    } else {
      wrongMode = true;
    }
  }
  res.sendStatus(200);
});

module.exports = router;
