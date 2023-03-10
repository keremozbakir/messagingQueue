var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var receivingApiRouter = require('./routes/receiving');
var messageQueueRouter = require('./routes/messageQueue');
var processingApiRouter = require('././routes/processing');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');
//const swaggerJsDoc = require('swagger-jsdoc');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use('/receiving-api', receivingApiRouter);
app.use('/message-queue', messageQueueRouter, processingApiRouter);
app.use('/processing-api', processingApiRouter);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
