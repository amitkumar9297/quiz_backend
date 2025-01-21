import { Schema, model, Document, Types } from "mongoose";

export interface IQuiz extends Document {
    title: string;
    description: string;
    duration: number; // Duration in minutes
    questions: Types.ObjectId[]; // References to question documents
    createdBy: Types.ObjectId; // Reference to the admin who created it
    isActive: boolean; // Whether the quiz is currently active
}

const QuizSchema = new Schema<IQuiz>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Quiz = model<IQuiz>("Quiz", QuizSchema);
