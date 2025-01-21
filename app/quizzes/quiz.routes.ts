import { Router } from "express";
import { QuizController } from "./quiz.controller";
import { isAdminMiddleware } from "../common/middleware/isAdmin.middleware";
import { validateQuizCreation, validateQuizUpdate } from "./quiz.validation";

const router = Router();
const quizController = new QuizController();

router.post("/", validateQuizCreation,isAdminMiddleware, quizController.createQuiz.bind(quizController)); 
router.get("/", quizController.getQuizzes.bind(quizController)); 
router.get("/:id", quizController.getQuizById.bind(quizController)); 
router.put("/:id", validateQuizUpdate,isAdminMiddleware, quizController.updateQuiz.bind(quizController)); 
router.delete("/:id", isAdminMiddleware, quizController.deleteQuiz.bind(quizController)); 

export default router;
