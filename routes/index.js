var express = require('express');
var router = express.Router();
const cronjob = require('./../helpers/global/cronjob.js');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Homepage');
});

cronjob();
console.log('running on port 3000');

module.exports = router;
