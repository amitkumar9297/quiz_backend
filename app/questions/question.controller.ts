import { Request, Response } from "express";
import { QuestionService } from "./question.service";

const questionService = new QuestionService();

/**
 * QuestionController class for handling question-related requests.
 */
export class QuestionController {
    /**
     * Creates a new question.
     * 
     * @param {Request} req - The Express request object containing question data in the body.
     * @param {Response} res - The Express response object for sending the response.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     * @throws {Error} If the question data is invalid.
     */
    async createQuestion(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.createQuestion(req.body);
            res.status(201).json(question);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    
    /**
     * Retrieves all questions for a specific quiz.
     * 
     * @param {Request} req - The Express request object containing the quiz ID as a parameter.
     * @param {Response} res - The Express response object for sending the response.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     * @throws {Error} If an error occurs while fetching questions.
     */

    async getQuestionsByQuizId(req: Request, res: Response): Promise<void> {
        try {
            const questions = await questionService.getQuestionsByQuizId(req.params.quizId);
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    
    /**
     * Retrieves a specific question by its ID.
     * 
     * @param {Request} req - The Express request object containing the question ID as a parameter.
     * @param {Response} res - The Express response object for sending the response.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     * @throws {Error} If the question is not found or an error occurs while fetching the question.
     */
    async getQuestionById(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.getQuestionById(req.params.id);
            if (!question) {
                res.status(404).json({ message: "Question not found" });
                return;
            }
            res.status(200).json(question);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }


        /**
     * Updates a specific question by its ID.
     * 
     * @param {Request} req - The Express request object containing the question ID as a parameter and updated data in the body.
     * @param {Response} res - The Express response object for sending the response.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     * @throws {Error} If the question is not found or the update fails.
     */
    
    async updateQuestion(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.updateQuestion(req.params.id, req.body);
            if (!question) {
                res.status(404).json({ message: "Question not found" });
                return;
            }
            res.status(200).json(question);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Deletes a specific question by its ID.
     * 
     * @param {Request} req - The Express request object containing the question ID as a parameter.
     * @param {Response} res - The Express response object for sending the response.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     * @throws {Error} If the question is not found or an error occurs while deleting the question.
     */
    async deleteQuestion(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.deleteQuestion(req.params.id);
            if (!question) {
                res.status(404).json({ message: "Question not found" });
                return;
            }
            res.status(200).json({ message: "Question deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
