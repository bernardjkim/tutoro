const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

 // The email has to contain 'uw.edu'
  const regex =  /(\W|^)[\w.+\-]*@uw\.edu(\W|$)/ // matches uw.edu with regex
  if (!regex.test(data.email)) {
      errors.email = "Email should include '@uw.edu'"
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};