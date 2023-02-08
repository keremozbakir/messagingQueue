const Joi = require('joi');
//const JoiCountry = require('@meanie/joi-country'); // Joi extension to validate country code

//JoiCountry.setValidator(countryCodeValidator);
//module.exports = Joi.extend(JoiCountry);

const validatorSchema = Joi.object({
  GueltigBis: Joi.date().required(),
  GueltigAb: Joi.date().required(),
  Relationsnummer: Joi.string().required(),
  FilialNUM: Joi.string().required(),
  PickupCountry: Joi.string().required(),
  Zustellgebiet: Joi.string().required(),
  Deaktivierung: Joi.bool().required(),
});

module.exports = {
  validatorSchema,
};
