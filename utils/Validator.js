const { body } = require("express-validator");

const User = require("../models/user");

class Validator {
  static email(field) {
    return body(field)
      .isEmail()
      .withMessage("Enter a Valid Email.")
      .custom((value) => {
        return User.findAll({
          where: {
            email: value,
          },
        }).then((result) => {
          if (result.length)
            return Promise.reject("User With Similar Email Exists");
        });
      });
  }

  static password(field) {
    return body(field)
      .custom((value) => {
        if (
          !value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
          )
        ) {
          throw new Error();
        }

        return true;
      })
      .withMessage(
        "Password Must Contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
  }
}

module.exports = Validator;
