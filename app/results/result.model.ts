import { Schema, model, Document } from "mongoose";

export interface IResult extends Document {
    userId: Schema.Types.ObjectId; // Reference to the user
    quizId: Schema.Types.ObjectId; // Reference to the quiz
    score: number; // Score achieved in the quiz
    totalQuestions: number; // Total questions in the quiz
    createdAt: Date; // Date of attempt
}

const ResultSchema = new Schema<IResult>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
        score: { type: Number, required: true },
        totalQuestions: { type: Number, required: true },
    },
    { timestamps: true }
);

export const Result = model<IResult>("Result", ResultSchema);
