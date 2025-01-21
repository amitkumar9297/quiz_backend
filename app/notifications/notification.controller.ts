import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

const notificationService = new NotificationService();


/**
 * NotificationController class for handling notification-related requests.
 */
export class NotificationController {
   
    /**
     * Creates a new notification.
     * 
     * @param {Request} req - The Express request object containing notification data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the notification is created.
     * @throws {Error} If the notification data is invalid or cannot be saved.
     */
    async createNotification(req: Request, res: Response): Promise<void> {
        try {
            const notification = await notificationService.createNotification(req.body);
            res.status(201).json(notification);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }


    /**
     * Retrieves notifications for a specific user by user ID.
     * 
     * @param {Request} req - The Express request object containing the user ID as a route parameter.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the notifications are retrieved.
     * @throws {Error} If an error occurs while fetching notifications.
     */

    
    async getNotifications(req: Request, res: Response): Promise<void> {
        try {
            const notifications = await notificationService.getNotificationsByUserId(req.params.userId);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    

        /**
     * Marks a specific notification as read by its ID.
     * 
     * @param {Request} req - The Express request object containing the notification ID as a route parameter.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the notification is marked as read.
     * @throws {Error} If the notification is not found or an error occurs during the update.
     */

    async markNotificationAsRead(req: Request, res: Response): Promise<void> {
        try {
            const notification = await notificationService.markAsRead(req.params.id);
            if (!notification) {
                res.status(404).json({ message: "Notification not found" });
                return;
            }
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
