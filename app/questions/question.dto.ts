export interface CreateQuestionDTO {
    quizId: string; // ID of the associated quiz
    questionText: string;
    options: string[];
    correctAnswer: string;
    questionType: "MCQ" | "TRUE_FALSE";
}

export interface UpdateQuestionDTO {
    questionText?: string;
    options?: string[];
    correctAnswer?: string;
    questionType?: "MCQ" | "TRUE_FALSE";
}
