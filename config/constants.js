const modes = ['Standard', 'Comparison'];
const databasePath = './database/Database.json';
const messageQueuePath = './database/messages.json';

const { validatorSchema } = require('./../helpers/global/validator.js');
const fs = require('fs');
const differentDataReport = 'Different data in the fields: ';
const notInSystemReport = 'Not existing in our system';
const messageQueueEndpoint = 'http://localhost:3000/message-queue';
module.exports = {
  modes,
  databasePath,
  validatorSchema,
  messageQueuePath,
  differentDataReport,
  notInSystemReport,
  messageQueueEndpoint,
};

exports.fs = fs;
