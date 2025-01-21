import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const adminService = new AdminService();

/**
 * AdminController class for handling admin-related requests.
 */
export class AdminController {
   
    /**
     * Retrieves all users from the database.
     * 
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * @throws {Error} If there is an error while fetching users.
     */

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await adminService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

        /**
     * Retrieves all quizzes from the database.
     * 
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * @throws {Error} If there is an error while fetching quizzes.
     */

    async getAllQuizzes(req: Request, res: Response): Promise<void> {
        try {
            const quizzes = await adminService.getAllQuizzes();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    
     /**
     * Retrieves all questions from the database.
     * 
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * @throws {Error} If there is an error while fetching questions.
     */
    async getAllQuestions(req: Request, res: Response): Promise<void> {
        try {
            const questions = await adminService.getAllQuestions();
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

      /**
     * Retrieves all quiz attempts from the database.
     * 
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * @throws {Error} If there is an error while fetching quiz attempts.
     */
    async getAllQuizAttempts(req: Request, res: Response): Promise<void> {
        try {
            const attempts = await adminService.getAllQuizAttempts();
            res.status(200).json(attempts);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }


    /**
     * Retrieves all results from the database.
     * 
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * @throws {Error} If there is an error while fetching results.
     */

    async getAllResults(req: Request, res: Response): Promise<void> {
        try {
            const results = await adminService.getAllResults();
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
