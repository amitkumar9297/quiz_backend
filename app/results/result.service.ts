import { Result, IResult } from "./result.model";
import { QuizAttempt } from "../quizAttempts/quizAttempt.model";
import { Question } from "../questions/question.model";


/**
 * ResultService class for handling operations related to quiz results.
 */
export class ResultService {
   

    /**
     * Creates a new result based on the user's latest quiz attempt.
     * 
     * @param {string} userId - The ID of the user who took the quiz.
     * @param {string} quizId - The ID of the quiz taken by the user.
     * @returns {Promise<IResult>} A promise that resolves to the created result.
     * @throws {Error} If no quiz attempts are found for the user and quiz.
     */

    async createResult(userId: string, quizId: string): Promise<IResult> {
        // Find the latest quiz attempt for the user and quiz
        const latestAttempt = await QuizAttempt.findOne({ userId, quizId })
            .sort({ createdAt: -1 });
    
        if (!latestAttempt) {
            throw new Error("No attempts found for this quiz");
        }
    
        // Calculate the score based on the user's answers
        const score = await latestAttempt.answers.reduce(async (totalPromise, answer) => {
            const total = await totalPromise;
            const question = await Question.findById(answer.questionId); 
            return question && question.correctAnswer === answer.selectedOption ? total + 1 : total;
        }, Promise.resolve(0));
    
        // Get total attempts for the quiz by the user
        const attemptsCount = await QuizAttempt.countDocuments({ userId, quizId });
    
        // Create the result object
        const result = new Result({
            userId,
            quizId,
            score,
            totalQuestions: latestAttempt.totalQuestions,
            attemptsCount,
        });
    
        return result.save();
    }

    /**
     * Retrieves all results for a specific user.
     * 
     * @param {string} userId - The ID of the user whose results are to be retrieved.
     * @returns {Promise<IResult[]>} A promise that resolves to an array of results for the user.
     */
    async getResultsByUserId(userId: string): Promise<IResult[]> {
        return Result.find({ userId }).populate("quizId");
    }

    /**
     * Retrieves the leaderboard for a specific quiz.
     * 
     * @param {string} quizId - The ID of the quiz for which the leaderboard is requested.
     * @returns {Promise<IResult[]>} A promise that resolves to an array of the top results for the quiz.
     */
    async getLeaderboard(quizId: string): Promise<any[]> {
        // Fetch results for the given quizId and populate user details
        const results = await Result.find({ quizId })
            .sort({ score: -1 })
            .populate("userId");
    
        // Create a Map to store the highest score for each user
        const userMap = new Map<string, any>();
    
        for (const result of results) {
            const userId = (result.userId as any)._id.toString(); // Use 'as any' to bypass TypeScript error
            if (!userMap.has(userId) || userMap.get(userId).score < result.score) {
                userMap.set(userId, result); // Keep only the highest score for each user
            }
        }
    
        // Convert the Map values to an array and return the top 10 results
        return Array.from(userMap.values()).slice(0, 10);
    }
    
}
