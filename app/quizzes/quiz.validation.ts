import { body } from "express-validator";

export const validateQuizCreation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string."),

  body("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isString()
    .withMessage("Description must be a string."),

  body("duration")
    .notEmpty()
    .withMessage("Duration is required.")
    .isNumeric()
    .withMessage("Duration must be a number."),

  body("questions")
    .isArray()
    .withMessage("Questions must be an array of question IDs.")
    .custom((questions: string[]) => {
      if (!questions.every(question => typeof question === "string")) {
        throw new Error("Each question ID must be a string.");
      }
      return true;
    }),

  body("createdBy")
    .notEmpty()
    .withMessage("Creator ID is required.")
    .isMongoId()
    .withMessage("Invalid Creator ID format."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),
];

export const validateQuizUpdate = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number."),

  body("questions")
    .optional()
    .isArray()
    .withMessage("Questions must be an array of question IDs.")
    .custom((questions: string[]) => {
      if (!questions.every(question => typeof question === "string")) {
        throw new Error("Each question ID must be a string.");
      }
      return true;
    }),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),
];
