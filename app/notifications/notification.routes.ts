import { Router } from "express";
import { NotificationController } from "./notification.controller";

const router = Router();
const notificationController = new NotificationController();

router.post("/", notificationController.createNotification.bind(notificationController)); 
router.get("/user/:userId", notificationController.getNotifications.bind(notificationController)); 
router.put("/:id/read", notificationController.markNotificationAsRead.bind(notificationController)); // Mark notification as read

export default router;
