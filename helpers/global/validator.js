const Joi = require('joi');
//const JoiCountry = require('@meanie/joi-country'); // Joi extension to validate country code

//JoiCountry.setValidator(countryCodeValidator);
//module.exports = Joi.extend(JoiCountry);

const validatorSchema = Joi.object({
  GueltigBis: Joi.date()
    .required()
    .messages({ GueltigBis: 'Validation error' }),
  GueltigAb: Joi.date().required().messages({ GueltigAb: 'Validation error' }),
  Relationsnummer: Joi.string()
    .required()
    .messages({ Relationsnummer: 'Validation error' }),
  FilialNUM: Joi.string()
    .required()
    .messages({ FilialNUM: 'Validation error' }),
  PickupCountry: Joi.string()
    .required()
    .messages({ PickupCountry: 'Validation error' }),
  Zustellgebiet: Joi.string()
    .required()
    .messages({ Zustellgebiet: 'Validation error' }),
  Deaktivierung: Joi.bool()
    .required()
    .messages({ Deaktivierung: 'Validation error' }),
});

module.exports = {
  validatorSchema,
};
