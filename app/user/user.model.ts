import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    _id: object;
    name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
    active: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
