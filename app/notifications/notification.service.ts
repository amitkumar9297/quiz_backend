import { Notification, INotification } from "./notification.model";
import { CreateNotificationDTO } from "./notification.dto";


/**
 * NotificationService class for managing notifications.
 */

export class NotificationService {
    
        /**
     * Creates a new notification.
     * 
     * @param {CreateNotificationDTO} data - The data for the new notification.
     * @returns {Promise<INotification>} A promise that resolves to the created notification.
     * @throws {Error} If there is an error while saving the notification.
     */
    async createNotification(data: CreateNotificationDTO): Promise<INotification> {
        const notification = new Notification(data);
        return notification.save();
    }

        /**
     * Retrieves notifications for a specific user by user ID.
     * 
     * @param {string} userId - The ID of the user for whom to retrieve notifications.
     * @returns {Promise<INotification[]>} A promise that resolves to an array of notifications for the user.
     * @throws {Error} If there is an error while fetching notifications.
     */

    async getNotificationsByUserId(userId: string): Promise<INotification[]> {
        return Notification.find({ userId }).sort({ createdAt: -1 });
    }


/**
     * Marks a specific notification as read by its ID.
     * 
     * @param {string} notificationId - The ID of the notification to mark as read.
     * @returns {Promise<INotification | null>} A promise that resolves to the updated notification or null if not found.
     * @throws {Error} If there is an error while marking the notification as read.
     */

    async markAsRead(notificationId: string): Promise<INotification | null> {
        return Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    }
}
