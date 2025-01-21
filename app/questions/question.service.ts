import { Question, IQuestion } from "./question.model";
import { CreateQuestionDTO, UpdateQuestionDTO } from "./question.dto";


/**
 * QuestionService class for handling question-related business logic.
 */

export class QuestionService {
   
     /**
     * Creates a new question.
     * 
     * @param {CreateQuestionDTO} data - The data required to create a new question.
     * @returns {Promise<IQuestion>} A promise that resolves to the created question.
     * @throws {Error} If the question data is invalid or cannot be saved.
     */
    async createQuestion(data: CreateQuestionDTO): Promise<IQuestion> {
        const question = new Question(data);
        return question.save();
    }


    /**
     * Retrieves all questions associated with a specific quiz ID.
     * 
     * @param {string} quizId - The ID of the quiz for which to retrieve questions.
     * @returns {Promise<IQuestion[]>} A promise that resolves to an array of questions.
     * @throws {Error} If an error occurs while fetching questions.
     */

    
    async getQuestionsByQuizId(quizId: string): Promise<IQuestion[]> {
        return Question.find({ quizId });
    }

    /**
     * Retrieves a specific question by its ID.
     * 
     * @param {string} id - The ID of the question to retrieve.
     * @returns {Promise<IQuestion | null>} A promise that resolves to the found question or null if not found.
     * @throws {Error} If an error occurs while fetching the question.
     */
    async getQuestionById(id: string): Promise<IQuestion | null> {
        return Question.findById(id);
    }

    /**
     * Updates a specific question by its ID.
     * 
     * @param {string} id - The ID of the question to update.
     * @param {UpdateQuestionDTO} data - The updated data for the question.
     * @returns {Promise<IQuestion | null>} A promise that resolves to the updated question or null if not found.
     * @throws {Error} If the question is not found or the update fails.
     */
    async updateQuestion(id: string, data: UpdateQuestionDTO): Promise<IQuestion | null> {
        return Question.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Deletes a specific question by its ID.
     * 
     * @param {string} id - The ID of the question to delete.
     * @returns {Promise<IQuestion | null>} A promise that resolves to the deleted question or null if not found.
     * @throws {Error} If the question is not found or the delete operation fails.
     */

    async deleteQuestion(id: string): Promise<IQuestion | null> {
        return Question.findByIdAndDelete(id);
    }
}
