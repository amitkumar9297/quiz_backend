export interface CreateQuizAttemptDTO {
    userId: string;
    quizId: string; 
    answers: { questionId: string; selectedOption: string }[]; // User's selected answers
}


