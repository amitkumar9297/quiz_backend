import { User } from "../user/user.model";
import { Quiz } from "../quizzes/quiz.model";
import { Question } from "../questions/question.model";
import { QuizAttempt } from "../quizAttempts/quizAttempt.model";
import { Result } from "../results/result.model";


/**
 * AdminService class for handling admin-related operations.
 */
export class AdminService {
    /**
     * Retrieves all users from the database.
     * 
     * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
     */

    async getAllUsers() {
        return User.find({});
    }

    /**
     * Retrieves all quizzes from the database.
     * 
     * @returns {Promise<Quiz[]>} A promise that resolves to an array of Quiz objects.
     */

    
    async getAllQuizzes() {
        return Quiz.find({});
    }

    /**
     * Retrieves all questions from the database.
     * 
     * @returns {Promise<Question[]>} A promise that resolves to an array of Question objects.
     */

    
    async getAllQuestions() {
        return Question.find({});
    }


     /**
     * Retrieves all quiz attempts from the database and populates user and quiz information.
     * 
     * @returns {Promise<QuizAttempt[]>} A promise that resolves to an array of QuizAttempt objects.
     */
 
    async getAllQuizAttempts() {
        return QuizAttempt.find({}).populate("userId quizId");
    }

    /**
     * Retrieves all results from the database and populates user and quiz information.
     * 
     * @returns {Promise<Result[]>} A promise that resolves to an array of Result objects.
     */

    async getAllResults() {
        return Result.find({}).populate("userId quizId");
    }
}
