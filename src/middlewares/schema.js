const Joi = require ("joi");

const patchSchema=Joi.object({
  ceo: Joi.string()
    .min(1)
    .max(20)
    .required(),
  companyId: Joi.string()
});

module.exports = {patchSchema};