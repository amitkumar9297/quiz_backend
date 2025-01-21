import { body } from "express-validator";

export const validateQuestionCreation = [
  body("quizId")
    .notEmpty()
    .withMessage("Quiz ID is required.")
    .isMongoId()
    .withMessage("Invalid Quiz ID format."),

  body("questionText")
    .notEmpty()
    .withMessage("Question text is required.")
    .isString()
    .withMessage("Question text must be a string."),

  body("options")
    .isArray({ min: 2 })
    .withMessage("Options must be an array with at least 2 items.")
    .custom((options: string[]) => {
      if (options.some(option => typeof option !== "string")) {
        throw new Error("All options must be strings.");
      }
      return true;
    }),

  body("correctAnswer")
    .notEmpty()
    .withMessage("Correct answer is required.")
    .isString()
    .withMessage("Correct answer must be a string."),

  body("questionType")
    .notEmpty()
    .withMessage("Question type is required.")
    .isIn(["MCQ", "TRUE_FALSE"])
    .withMessage("Question type must be either 'MCQ' or 'TRUE_FALSE'."),
];

export const validateQuestionUpdate = [
  body("questionText")
    .optional()
    .isString()
    .withMessage("Question text must be a string."),

  body("options")
    .optional()
    .isArray({ min: 2 })
    .withMessage("Options must be an array with at least 2 items.")
    .custom((options: string[]) => {
      if (options.some(option => typeof option !== "string")) {
        throw new Error("All options must be strings.");
      }
      return true;
    }),

  body("correctAnswer")
    .optional()
    .isString()
    .withMessage("Correct answer must be a string."),

  body("questionType")
    .optional()
    .isIn(["MCQ", "TRUE_FALSE"])
    .withMessage("Question type must be either 'MCQ' or 'TRUE_FALSE'."),
];
