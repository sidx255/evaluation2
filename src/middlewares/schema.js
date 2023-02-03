const Joi = require ("joi");

const postSchema= Joi.object({
  title: Joi.string()
    .min(1)
    .max(20)
    .required()
});
const patchSchema=Joi.object({
  title: Joi.string()
    .min(1)
    .max(20)
    .required(),
  isCompleted: Joi.boolean(),
  id: Joi.number()
});

module.exports = {postSchema,patchSchema};