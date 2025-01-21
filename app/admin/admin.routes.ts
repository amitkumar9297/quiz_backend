import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();
const adminController = new AdminController();

router.get("/users", adminController.getAllUsers.bind(adminController)); 
router.get("/quizzes", adminController.getAllQuizzes.bind(adminController));
router.get("/questions", adminController.getAllQuestions.bind(adminController));
router.get("/quiz-attempts", adminController.getAllQuizAttempts.bind(adminController));
router.get("/results", adminController.getAllResults.bind(adminController)); 

export default router;
