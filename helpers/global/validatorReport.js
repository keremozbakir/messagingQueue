const Joi = require('joi');

const validatorSchemaReport = Joi.object({
  Relationsnummer: Joi.string()
    .required()
    .messages({ Relationsnummer: 'Validation error' }),
  reportMessage: Joi.string()
    .required()
    .messages({ reportMessage: 'Validation error' }),
});

module.exports = {
  validatorSchemaReport,
};
