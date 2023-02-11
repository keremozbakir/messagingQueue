const modes = ['Standard', 'Comparison'];
const databasePath = './database/Database.json';
const messageQueuePath = './database/messages.json';

const {
  validatorSchema,
  validatorSchemaReports,
} = require('./../helpers/global/validator.js');

const fs = require('fs');
const differentDataReport = 'Different data in the fields: ';
const notInSystemReport = 'Not existing in our system';
const messageQueueEndpoint = 'http://localhost:3000/message-queue';

//Unit testing constants

const falseDummyDataReceiving = {
  GueltigAb: null,
  GueltigBis: '1/2/1996',
  Relationsnummer: '123',
  FilialNUM: 'fil FilialNUM new',
  PickupCountry: 'Turkey',
  Zustellgebiet: 'Zustellgebiet 12345678910',
};

const workingDummyData = {
  GueltigAb: '12/2/1996',
  GueltigBis: '1/2/1996',
  Relationsnummer: '123',
  FilialNUM: 'fil FilialNUM new',
  PickupCountry: 'Turkey',
  Zustellgebiet: 'Zustellgebiet 12345678910',
};

const requiredFieldsTesting = [
  'GueltigAb',
  'GueltigBis',
  'Relationsnummer',
  'FilialNUM',
  'PickupCountry',
  'Zustellgebiet',
];

const receivingApiTestUrl = '/receiving-api/:mode';

module.exports = {
  modes,
  databasePath,
  validatorSchema,
  messageQueuePath,
  differentDataReport,
  notInSystemReport,
  messageQueueEndpoint,
  falseDummyDataReceiving,
  workingDummyData,
  requiredFieldsTesting,
  receivingApiTestUrl,
  validatorSchemaReports,
};

exports.fs = fs;
