var cron = require('node-cron');
const { messageQueueEndpoint } = require('../../config/constants.js');
const readJson = require('./readJson.js');
const axios = require('axios');
var data = [];
const popOldestData = require('.././global/popOldestData.js');
axios.defaults.baseURL = messageQueueEndpoint;

module.exports = function scheduleCronjob() {
  cron.schedule('* */12 * * * *', () => {
    console.log('cron job running! ');
    data = popOldestData();
    if (!data) {
      // if the messageQueue is empty
      data = [];
    }
    callMessageQueue();
  });
};

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
