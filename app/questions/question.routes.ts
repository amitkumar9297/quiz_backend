import { Router } from "express";
import { QuestionController } from "./question.controller";
import { isAdminMiddleware } from "../common/middleware/isAdmin.middleware";
import { validateQuestionCreation, validateQuestionUpdate } from "./question.validation";

const router = Router();
const questionController = new QuestionController();

router.post("/",validateQuestionCreation,isAdminMiddleware, questionController.createQuestion.bind(questionController)); // Create a question
router.get("/quiz/:quizId", questionController.getQuestionsByQuizId.bind(questionController)); // Get all questions for a quiz
router.get("/:id", questionController.getQuestionById.bind(questionController)); // Get question by ID
router.put("/:id",validateQuestionUpdate,isAdminMiddleware, questionController.updateQuestion.bind(questionController)); // Update a question
router.delete("/:id", isAdminMiddleware, questionController.deleteQuestion.bind(questionController)); // Delete a question

export default router;
