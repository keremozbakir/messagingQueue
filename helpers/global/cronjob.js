var cron = require('node-cron');
const { messageQueueEndpoint } = require('../../config/constants.js');
const readJson = require('./readJson.js');
const axios = require('axios');

axios.defaults.baseURL = messageQueueEndpoint;

module.exports = function scheduleCronjob() {
  cron.schedule('*/12 * * * * *', () => {
    console.log('cron job running! ');
    //data = readJson('./database/Database.json');
    //console.log(data);
    callMessageQueue();
  });
};

var data = [
  {
    GueltigAb: '1/2/1996',
    GueltigBis: '1/2/1996',
    Relationsnummer: '123',
    FilialNUM: 'fil FilialNUM new',
    PickupCountry: 'Turkey',
    Zustellgebiet: '15050',
    Deaktivierung: false,
  },
  {
    GueltigAb: '1/2/1996',
    GueltigBis: '1/2/1996',
    Relationsnummer: '123456',
    FilialNUM: 'fil FilialNUM new',
    PickupCountry: 'Bursa',
    Zustellgebiet: 'Zustellgebiet 12345678910',
    Deaktivierung: false,
  },
];

//console.log(typeof data === typeof readJson('./database/Database.json'));

async function callMessageQueue() {
  await axios
    .post('http://localhost:3000/message-queue', data)
    .then((response) => {
      console.log('response:', response.data);
    })
    .catch((error) => {
      console.log('error:', error);
    });
}
