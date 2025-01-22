import { Request, Response } from 'express';
import { QuizAttemptService } from './quizAttempt.service';
import { CreateQuizAttemptDTO } from './quizAttempt.dto';

/**
 * QuizAttemptController class for handling HTTP requests related to quiz attempts.
 */
export class QuizAttemptController {
    private quizAttemptService: QuizAttemptService;

    constructor() {
        this.quizAttemptService = new QuizAttemptService();
    }

    /**
     * Creates a new quiz attempt.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @returns A Promise that resolves when the response is sent.
     * @throws Error if there is an error while creating a new quiz attempt.
     */
    async createQuizAttempt(req: Request, res: Response): Promise<void> {
        const { userId, quizId, answers }: CreateQuizAttemptDTO = req.body;

        try {
            const quizAttempt = await this.quizAttemptService.createQuizAttempt(userId, quizId, answers);
            res.status(201).json(quizAttempt);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Submits a quiz attempt.
     * @param req The HTTP request object containing the user ID, quiz ID, and the user's answers in the body.
     * @param res The HTTP response object used to send the response.
     * @returns A Promise that resolves when the response is sent.
     * @throws Error if there is an error while submitting the quiz attempt.
     */
    async submitQuizAttempt(req: Request, res: Response): Promise<void> {
        const userId: number = req.body.userId; // Expecting a number
const quizId: string = req.body.quizId; // Expecting a string
const answers: any[] = req.body.answers; // The user's answers

try {
    const result = await this.quizAttemptService.submitQuizAttempt(userId, quizId, answers);
    res.status(200).json(result);
} catch (error) {
    res.status(400).json({ message: error.message });
}
    }
}
