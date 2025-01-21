import { Quiz, IQuiz } from "./quiz.model";
import { CreateQuizDTO, UpdateQuizDTO } from "./quiz.dto";


/**
 * QuizService class for handling operations related to quizzes.
 */
export class QuizService {

     /**
     * Creates a new quiz.
     * 
     * @param {CreateQuizDTO} data - The data required to create a new quiz.
     * @returns {Promise<IQuiz>} A promise that resolves to the created quiz.
     */
    async createQuiz(data: CreateQuizDTO): Promise<IQuiz> {
        const quiz = new Quiz(data);
        return quiz.save();
    }

       /**
     * Retrieves all quizzes.
     * 
     * @returns {Promise<IQuiz[]>} A promise that resolves to an array of quizzes.
     */
    async getQuizzes(): Promise<IQuiz[]> {
        return Quiz.find().populate("questions createdBy", "-password");
    }

        /**
     * Retrieves a quiz by its ID.
     * 
     * @param {string} id - The ID of the quiz to retrieve.
     * @returns {Promise<IQuiz | null>} A promise that resolves to the quiz if found, or null if not found.
     */
    async getQuizById(id: string): Promise<IQuiz | null> {
        return Quiz.findById(id).populate("questions createdBy", "-password");
    }


        /**
     * Updates a quiz by its ID.
     * 
     * @param {string} id - The ID of the quiz to update.
     * @param {UpdateQuizDTO} data - The data to update the quiz with.
     * @returns {Promise<IQuiz | null>} A promise that resolves to the updated quiz if found, or null if not found.
     */

    async updateQuiz(id: string, data: UpdateQuizDTO): Promise<IQuiz | null> {
        return Quiz.findByIdAndUpdate(id, data, { new: true });
    }

     /**
     * Deletes a quiz by its ID.
     * 
     * @param {string} id - The ID of the quiz to delete.
     * @returns {Promise<IQuiz | null>} A promise that resolves to the deleted quiz if found, or null if not found.
     */
    async deleteQuiz(id: string): Promise<IQuiz | null> {
        return Quiz.findByIdAndDelete(id);
    }
}
