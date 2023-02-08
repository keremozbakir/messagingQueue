const modes = ['Standard', 'Comparison'];
const databasePath = 'database/Database.json';
const messageQueuePath = 'database/messages.json';
const { validatorSchema } = require('./../helpers/global/validator.js');

exports.modes = modes;
exports.databasePath = databasePath;
exports.validatorSchema = validatorSchema;
exports.messageQueuePath = messageQueuePath;
