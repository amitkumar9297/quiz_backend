import { Request, Response } from "express";
import { UserService } from "./user.service";
import { LoginUserDTO } from "./user.dto";

const userService = new UserService();

export class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: LoginUserDTO = req.body;
            const tokens = await userService.loginUser(email, password);
            res.status(200).json(tokens);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async refreshAccessToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.headers.authorization?.split(" ")[1];
            if (!refreshToken) throw new Error("Refresh token is required");

            const accessToken = await userService.refreshAccessToken(refreshToken);
            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.getUserById(Number(req.params.id));
            if (!user) res.status(404).json({ message: "User not found" });
            else res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.updateUser(Number(req.params.id), req.body);
            if (!user) res.status(404).json({ message: "User not found" });
            else res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.deleteUser(Number(req.params.id));
            if (!user) res.status(404).json({ message: "User not found" });
            else res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
