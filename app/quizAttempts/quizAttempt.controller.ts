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

    async createQuizAttempt(req: Request, res: Response): Promise<void> {
        const { userId, quizId, answers }: CreateQuizAttemptDTO = req.body;

        try {
            const quizAttempt = await this.quizAttemptService.createQuizAttempt(userId, quizId, answers);
            res.status(201).json(quizAttempt);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

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
