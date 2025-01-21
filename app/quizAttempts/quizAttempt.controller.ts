import { Request, Response } from 'express';
import { QuizAttemptService } from './quizAttempt.service';
import { CreateQuizAttemptDTO } from './quizAttempt.dto';


/**
 * QuizAttemptController class for handling HTTP requests related to quiz attempts.
 */

export class QuizAttemptController {
    private quizAttemptService: QuizAttemptService;

    /**
     * Initializes a new instance of the QuizAttemptController.
     */

    constructor() {
        this.quizAttemptService = new QuizAttemptService();
    }


        /**
     * Creates a new quiz attempt.
     * 
     * @param {Request} req - The Express request object containing user ID, quiz ID, and answers in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */


    async createQuizAttempt(req: Request, res: Response) {
        const { userId, quizId, answers }: CreateQuizAttemptDTO = req.body;

        try {
            const quizAttempt = await this.quizAttemptService.createQuizAttempt(userId, quizId, answers);
            res.status(201).json(quizAttempt);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }



    /**
     * Submits an existing quiz attempt.
     * 
     * @param {Request} req - The Express request object containing user ID, quiz ID, and answers in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */

    async submitQuizAttempt(req: Request, res: Response) {
        const { userId, quizId, answers }: CreateQuizAttemptDTO = req.body;

        try {
            const quizAttempt = await this.quizAttemptService.submitQuizAttempt(userId, quizId, answers);
            res.status(200).json(quizAttempt);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}
