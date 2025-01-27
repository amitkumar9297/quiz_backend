import { Request, Response } from "express";
import { UserService } from "./user.service";
import { LoginUserDTO } from "./user.dto";

const userService = new UserService();

/**
* UserController class for handling HTTP requests related to user operations.
*/
export class UserController {

   /**
     * Creates a new user.
     * 
     * @param {Request} req - The Express request object containing user data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

     /**
     * Logs in a user with the provided email and password.
     * 
     * @param {Request} req - The Express request object containing email and password in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */

    async LoginUser(req: Request, res: Response): Promise<void> {
        const { email, password }: LoginUserDTO = req.body;
    
        try {
            const token = await userService.loginUser(email, password);
            res.status(200).json({ token }); // Return token on success
        } catch (error) {
            res.status(400).json({ error: "Invalid email or password" }); // Return sanitized error
        }
    }

    /**
     * Handles the forgot password feature.
     * 
     * @param {Request} req - The Express request object containing the email to send the password reset link to.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            await userService.forgotPassword(email);
            res.status(200).json({ message: "Password reset email sent" });
        } catch (error) {
            res.status(400).json({ error: error});
        }
    }

    /**
     * Resets the password for a user using the provided token.
     * 
     * @param {Request} req - The Express request object containing the token, email, and new password in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token, email, newPassword } = req.body;
            await userService.resetPassword(token, email, newPassword);
            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }


    /**
     * Refreshes the access token using the refresh token provided by the user.
     * 
     * @param {Request} req - The Express request object containing the refresh token in the Authorization header.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async refreshAccessToken(req: Request, res: Response): Promise<void> {
        const refreshToken = req.headers.authorization?.split(" ")[1]; // Extract the token from the header

        if (!refreshToken) {
            res.status(401).json({ error: "Refresh token is required" });
            return;
        }

        try {
            const newAccessToken = await userService.refreshAccessToken(refreshToken);
            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(403).json({ error: error }); // Return error if refresh token is invalid
        }
    }



     /**
     * Retrieves all users from the database.
     * 
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    /**
     * Retrieves a user by their ID.
     * 
     * @param {Request} req - The Express request object containing the user ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

 /**
     * Updates a user's information.
     * 
     * @param {Request} req - The Express request object containing the user ID in the parameters and the updated data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Deletes a user (soft delete) by marking them as inactive.
     * 
     * @param {Request} req - The Express request object containing the user ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
