import { Schema, model, Document } from "mongoose";

export interface IQuestion extends Document {
    quizId: Schema.Types.ObjectId; // Reference to the quiz
    questionText: string; // The question text
    options: string[]; // List of possible answers
    correctAnswer: string; // Correct answer
    questionType: "MCQ" | "TRUE_FALSE"; // Question type
}

const QuestionSchema = new Schema<IQuestion>(
    {
        quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
        questionText: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
        questionType: { type: String, enum: ["MCQ", "TRUE_FALSE"], required: true },
    },
    { timestamps: true }
);

export const Question = model<IQuestion>("Question", QuestionSchema);
