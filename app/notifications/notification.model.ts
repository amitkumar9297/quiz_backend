import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
    userId: Schema.Types.ObjectId; // Reference to the user receiving the notification
    message: string; // Notification message
    isRead: boolean; // Whether the notification has been read
    createdAt: Date; // Date of notification creation
}

const NotificationSchema = new Schema<INotification>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Notification = model<INotification>("Notification", NotificationSchema);
