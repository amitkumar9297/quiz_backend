// quiz.controller.ts
import { Request, Response } from "express";
import { QuizService } from "./quiz.service";
import { CreateQuizDTO, UpdateQuizDTO } from "./quiz.dto";

const quizService = new QuizService();

export class QuizController {
    async createQuiz(req: Request, res: Response): Promise<void> {
        try {
            // Extract input data from the request body
            const data: CreateQuizDTO = req.body;
    
            // Call the service to create the quiz
            const quiz = await quizService.createQuiz(data);
    
            // Respond with the created quiz
            res.status(201).json(quiz);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    

    async getQuizzes(req: Request, res: Response): Promise<void> {
        try {
            const quizzes = await quizService.getQuizzes();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getQuizById(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await quizService.getQuizById(req.params.id);
            if (!quiz) {
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.status(200).json(quiz);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateQuiz(req: Request, res: Response): Promise<void> {
        try {
            const data: UpdateQuizDTO = req.body;
            const quiz = await quizService.updateQuiz(req.params.id, data);
            if (!quiz) {
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.status(200).json(quiz);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteQuiz(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await quizService.deleteQuiz(req.params.id);
            if (!quiz) {
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.status(200).json({ message: "Quiz deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
