const { ValidationError } = require('../libs/errors');

const validateBody = (schema, options = {}) => {
  return (req, res, next) => {
    const schemaResult = schema.validate(req.body, options);
    if (schemaResult.error) {
      next(new ValidationError(schemaResult.error.details[0].message));
      return;
    }
    req.body = schemaResult.value;
    next();
  };
};

const validateParams = (schema, options = {}) => {
    return (req, res, next) => {
      const schemaResult = schema.validate(req.params, options);
      if (schemaResult.error) {
        next(new ValidationError(schemaResult.error.details[0].message));
        return;
      }
      req.params = schemaResult.value;
      next();
    };
  };

module.exports = {
  validateBody,
  validateParams
}