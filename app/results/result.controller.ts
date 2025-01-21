import { Request, Response } from "express";
import { ResultService } from "./result.service";


/**
 * ResultController class for handling HTTP requests related to quiz results.
 */
const resultService = new ResultService();

export class ResultController {
    
    /**
     * Creates a new quiz result.
     * 
     * @param {Request} req - The Express request object containing userId and quizId in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */

    async createResult(req: Request, res: Response): Promise<void> {
        const { userId, quizId } = req.body;
        try {
            const result = await resultService.createResult(userId, quizId);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    

     /**
     * Retrieves all results for a specific user.
     * 
     * @param {Request} req - The Express request object containing the userId in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getResults(req: Request, res: Response): Promise<void> {
        try {
            const results = await resultService.getResultsByUserId(req.params.userId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }


    /**
     * Retrieves the leaderboard for a specific quiz.
     * 
     * @param {Request} req - The Express request object containing the quizId in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getLeaderboard(req: Request, res: Response): Promise<void> {
        try {
            const leaderboard = await resultService.getLeaderboard(req.params.quizId);
            res.status(200).json(leaderboard);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
