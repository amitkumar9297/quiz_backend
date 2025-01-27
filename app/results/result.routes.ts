import { Router } from "express";
import { ResultController } from "./result.controller";
import { isUserMiddleware } from "../common/middleware/isUser.middleware";

const router = Router();
const resultController = new ResultController();

router.post("/", resultController.createResult.bind(resultController)); 
router.get("/user/:userId", resultController.getResults.bind(resultController)); 
router.get("/leaderboard/:quizId", resultController.getLeaderboard.bind(resultController)); // Get leaderboard for a specific quiz

export default router;
