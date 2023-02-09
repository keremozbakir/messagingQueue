var cron = require('node-cron');
const { messageQueueEndpoint } = require('../../config/constants.js');
const readJson = require('./readJson.js');
const axios = require('axios');
var data = [];
axios.defaults.baseURL = messageQueueEndpoint;

module.exports = function scheduleCronjob() {
  cron.schedule('*/15 * * * * *', () => {
    console.log('cron job running! ');
    data = readJson('./database/messages.json');
    callMessageQueue();
  });
};

//console.log(typeof data === typeof readJson('./database/Database.json'));

async function callMessageQueue() {
  await axios
    .post('http://localhost:3000/message-queue', data)
    .then((response) => {
      console.log('response:', response.data);
    })
    .catch((error) => {
      //console.log('error:', error);
    });
}
