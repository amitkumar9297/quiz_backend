import express from "express";
import userRoutes from "./user/user.routes";
import quizRoutes from "./quizzes/quiz.routes";
import questionRoutes from "./questions/question.routes";
import quizAttemptRoutes from "./quizAttempts/quizAttempt.routes";
import resultRoutes from "./results/result.routes";
import notificationRoutes from "./notifications/notification.routes";
import adminRoutes from "./admin/admin.routes";

import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../swagger/swagger.json"
import { isAdminMiddleware } from "./common/middleware/isAdmin.middleware";


// routes
const router = express.Router();

router.use("/users" ,userRoutes);
router.use("/quizzes", quizRoutes);
router.use("/questions", questionRoutes);
router.use("/quiz-attempts", quizAttemptRoutes);
router.use("/results", resultRoutes);
router.use("/notifications", notificationRoutes);
router.use("/admin", isAdminMiddleware,adminRoutes);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));

export default router;