const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name is required.")
      .isLength({ min: 3 })
      .withMessage("Name must have at least 3 characters."),
    body("email")
      .isString()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Enter a valid Email"),
    body("password")
      .isString()
      .withMessage("Password is required.")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters."),
    body("confirmpassword")
      .isString()
      .withMessage("Confirm password is required.")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Passwords are not the same.");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Enter a valid Email."),
    body("password").isString().withMessage("Password ir required."),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must have at least 3 characters."),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters."),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
