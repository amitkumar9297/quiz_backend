import { Request, Response } from "express";
import { QuizService } from "./quiz.service";

const quizService = new QuizService();


/**
 * QuizController class for handling HTTP requests related to quizzes.
 */
export class QuizController {
/**
     * Creates a new quiz.
     * 
     * @param {Request} req - The Express request object containing quiz data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async createQuiz(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await quizService.createQuiz(req.body);
            res.status(201).json(quiz);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    
    /**
     * Retrieves all quizzes.
     * 
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */

    async getQuizzes(req: Request, res: Response): Promise<void> {
        try {
            const quizzes = await quizService.getQuizzes();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

     /**
     * Retrieves a quiz by its ID.
     * 
     * @param {Request} req - The Express request object containing the quiz ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getQuizById(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await quizService.getQuizById(req.params.id);
            if (!quiz) {
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.status(200).json(quiz);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

/**
     * Updates a quiz by its ID.
     * 
     * @param {Request} req - The Express request object containing the quiz ID in the parameters and updated quiz data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async updateQuiz(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await quizService.updateQuiz(req.params.id, req.body);
            if (!quiz) {
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.status(200).json(quiz);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

   /**
     * Deletes a quiz by its ID.
     * 
     * @param {Request} req - The Express request object containing the quiz ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async deleteQuiz(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await quizService.deleteQuiz(req.params.id);
            if (!quiz) {
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.status(200).json({ message: "Quiz deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
