import { Request, Response } from "express";
import { QuestionService } from "./question.service";

const questionService = new QuestionService();

export class QuestionController {
    async createQuestion(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.createQuestion(req.body);
            res.status(201).json(question);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getQuestionsByQuizId(req: Request, res: Response): Promise<void> {
        try {
            const questions = await questionService.getQuestionsByQuizId(req.params.quizId);
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getQuestionById(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.getQuestionById(req.params.id);
            if (!question) {
                res.status(404).json({ message: "Question not found" });
                return;
            }
            res.status(200).json(question);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateQuestion(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.updateQuestion(req.params.id, req.body);
            if (!question) {
                res.status(404).json({ message: "Question not found" });
                return;
            }
            res.status(200).json(question);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteQuestion(req: Request, res: Response): Promise<void> {
        try {
            const question = await questionService.deleteQuestion(req.params.id);
            if (!question) {
                res.status(404).json({ message: "Question not found" });
                return;
            }
            res.status(200).json({ message: "Question deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
