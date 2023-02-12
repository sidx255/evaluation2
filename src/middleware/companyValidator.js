const Joi = require('joi');

const HTTPErrors = require('../errors/HTTPErrors');

const saveDataSchema = Joi.object({
  urlLink: Joi.string().min(3).max(1000).required(),
});

const updateDataSchema = Joi.object({
  companyName: Joi.string().min(3).max(30),
  companyCEO: Joi.string().min(3).max(30)
});

const saveDataValidator = (req, res, next) => {
  try {
    const { error } = saveDataSchema.validate(req.body);
    if (error) {
      throw new HTTPErrors(error.message, 400);
    }
    else {
      next();
    }
  }
  catch (err) {
    if (err instanceof HTTPErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    else
      res.status(500).json({ 'message': 'Internal server error.' });
  }
};

const updateDataValidator = (req, res, next) => {
  try {
    const { error } = updateDataSchema.validate(req.body);
    if (error) {
      throw new HTTPErrors(error.message, 400);
    }
    else {
      next();
    }
  }
  catch (err) {
    if (err instanceof HTTPErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    else
      res.status(500).json({ 'message': 'Internal server error.' });
  }
};

module.exports = { saveDataValidator, updateDataValidator };
