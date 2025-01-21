import { Schema, model, Document } from "mongoose";

export interface IQuizAttempt extends Document {
    userId: Schema.Types.ObjectId;
    quizId: Schema.Types.ObjectId;
    answers: { questionId: Schema.Types.ObjectId; selectedOption: string }[];
    score: number;
    totalQuestions: number;
    startTime: Date; // Track the start time of the quiz
    duration: number; // Duration in minutes
}

const QuizAttemptSchema = new Schema<IQuizAttempt>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
        answers: [
            {
                questionId: { type: Schema.Types.ObjectId, ref: "Question"},
                selectedOption: { type: String, },
            },
        ],
        score: { type: Number, default: 0 },
        totalQuestions: { type: Number},
        startTime: { type: Date, required: true },
        duration: { type: Number, required: true }
    },
    { timestamps: true }
);

export const QuizAttempt = model<IQuizAttempt>("QuizAttempt", QuizAttemptSchema);
