const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("Title is required.")
      .isString()
      .withMessage("Title is required.")
      .isLength({ min: 3 })
      .withMessage("Title needs to have at least 3 characters."),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("Title is required.")
      .isLength({ min: 3 })
      .withMessage("Title needs to have at least 3 characters."),
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
};
