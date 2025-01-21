import { Router } from 'express';
import { QuizAttemptController } from './quizAttempt.controller';
import { isAdminMiddleware } from '../common/middleware/isAdmin.middleware';
import { validateQuizAttemptCreation, validateQuizAttemptSubmission } from './quizAttempt.validation';
import { isUserMiddleware } from '../common/middleware/isUser.middleware';

const router = Router();
const quizAttemptController = new QuizAttemptController();

router.post("/", validateQuizAttemptCreation,isUserMiddleware ,quizAttemptController.createQuizAttempt.bind(quizAttemptController)); // Create a quiz attempt
router.post("/submit", validateQuizAttemptSubmission,isUserMiddleware,quizAttemptController.submitQuizAttempt.bind(quizAttemptController)); // Submit quiz attempt

export default router;
