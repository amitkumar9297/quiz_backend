import { body } from "express-validator";

export const validateQuizAttemptCreation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required.")
    // .isMongoId()
    .withMessage("Invalid User ID format."),

  body("quizId")
    .notEmpty()
    .withMessage("Quiz ID is required.")
    // .isMongoId()
    .withMessage("Invalid Quiz ID format."),

  body("answers")
    .isArray()
    .withMessage("Answers must be an array.")
    .custom((answers: { questionId: string; selectedOption: string }[]) => {
      if (!answers.every(answer => answer.questionId && answer.selectedOption)) {
        throw new Error("Each answer must have a questionId and a selectedOption.");
      }
      return true;
    }),

  body("score")
    .optional()
    .isNumeric()
    .withMessage("Score must be a number."),

  body("totalQuestions")
    .notEmpty()
    .withMessage("Total questions is required.")
    .isNumeric()
    .withMessage("Total questions must be a number."),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required.")
    .isISO8601()
    .withMessage("Start time must be a valid date."),

  body("duration")
    .notEmpty()
    .withMessage("Duration is required.")
    .isNumeric()
    .withMessage("Duration must be a number."),
];

export const validateQuizAttemptSubmission = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required.")
    // .isMongoId()
    .withMessage("Invalid User ID format."),

  body("quizId")
    .notEmpty()
    .withMessage("Quiz ID is required.")
    // .isMongoId()
    .withMessage("Invalid Quiz ID format."),

  body("answers")
    .isArray()
    .withMessage("Answers must be an array.")
    .custom((answers: { questionId: string; selectedOption: string }[]) => {
      if (!answers.every(answer => answer.questionId && answer.selectedOption)) {
        throw new Error("Each answer must have a questionId and a selectedOption.");
      }
      return true;
    }),
];
