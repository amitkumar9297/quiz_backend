import { Router } from "express";
import { UserController } from "./user.controller";
import { isUserMiddleware } from "../common/middleware/isUser.middleware";
import { isAdminMiddleware } from "../common/middleware/isAdmin.middleware";
import * as userValidator from "./user.validation";

const router = Router();
const userController = new UserController();

router.post("/", userValidator.createUser ,userController.createUser.bind(userController));
router.post("/login", userValidator.loginUser,userController.LoginUser.bind(userController));
router.get("/", isAdminMiddleware, userController.getUsers.bind(userController)); 
router.get("/:id", userController.getUserById.bind(userController)); 
router.put("/:id", userValidator.updateUser ,isUserMiddleware, userController.updateUser.bind(userController)); 
router.delete("/:id", isUserMiddleware, userController.deleteUser.bind(userController)); 

router.post("/refresh-token", userController.refreshAccessToken.bind(userController));
router.post("/forgot-password", userController.forgotPassword.bind(userController));
router.post("/reset-password", userController.resetPassword.bind(userController));

export default router;
