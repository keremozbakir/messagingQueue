const databasePath = './database/Database.json';
const messageQueuePath = './database/messages.json';
const standardModeUrl = '/receiving-api/Standard';
const comparisonModeUrl = '/receiving-api/Comparison';
const wrongEndpoint = '/receiving-api/Comparison/hello-world';
const messageQueueUrl = '/message-queue';
const processingApiUrl = '/processing-api';

const falseDataReceiving = {
  GueltigAb: null,
  GueltigBis: '1/2/1996',
  Relationsnummer: '5123e234323343sdfs',
  FilialNUM: 'fil FilialNUM new',
  PickupCountry: 'Turkey',
  Zustellgebiet: 'Zustellgebiet 12345678910',
  Deaktivierung: false,
};

const correctDataReceiving = {
  GueltigAb: '1/2/1996',
  GueltigBis: '1/2/1996',
  Relationsnummer: '1',
  FilialNUM: 'fil FilialNUM new',
  PickupCountry: 'Turkey',
  Zustellgebiet: 'Zustellgebiet 12345678910',
  Deaktivierung: false,
};

const correctDataReceivingRelNum2 = {
  GueltigAb: '1/2/1996',
  GueltigBis: '1/2/1996',
  Relationsnummer: '2',
  FilialNUM: 'fil FilialNUM new',
  PickupCountry: 'Turkey',
  Zustellgebiet: 'Zustellgebiet 12345678910',
  Deaktivierung: false,
};

const wrongFieldReceiving = {
  GueltigAb: '1/2/1996',
  GueltigBis: '1/2/1996',
  Relationsnummer: '5123e234323343sdfs',
  FilialNUM: 'fil FilialNUM new',
  PickupCountry: 'Turkey',
  Zustellgebiet: 'Zustellgebiet 12345678910',
  Deaktivierung: 'this is a false field',
};

const messageQueueData = [
  {
    GueltigAb: '1/2/1996',
    GueltigBis: '1/2/1996',
    Relationsnummer: '1',
    FilialNUM: 'fil FilialNUM new',
    PickupCountry: 'Turkey',
    Zustellgebiet: 'Zustellgebiet 12345678910',
    Deaktivierung: true,
  },
];

const messageQueueBadData = [
  {
    GueltigAb: '1/2/1996',
    GueltigBis: '1/2/1996',
    Relationsnummer: '123',
    FilialNUM: 'fil FilialNUM new',
    PickupCountry: 'Turkey',
    Zustellgebiet: 'Zustellgebiet 12345678910', //deaktivierung missing
  },
];

const processingData = [
  {
    Relationsnummer: '123',
    reportMessage: 'Not existing in our system',
  },
];

module.exports = {
  databasePath,
  messageQueuePath,
  standardModeUrl,
  comparisonModeUrl,
  falseDataReceiving,
  correctDataReceiving,
  wrongFieldReceiving,
  wrongEndpoint,
  correctDataReceivingRelNum2,
  messageQueueUrl,
  messageQueueData,
  messageQueueBadData,
  processingApiUrl,
  processingData,
};
