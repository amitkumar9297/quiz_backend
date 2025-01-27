export interface CreateQuizAttemptDTO {
    userId: string;
    quizId: string; 
    quizAttemptId:string;
    answers: { questionId: string; selectedOption: string }[]; // User's selected answers
}


