import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import  AppDataSource  from "../services/data-source"; // Your TypeORM DataSource
import { User } from "../../user/user.entity"; // TypeORM User entity

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        // Verify JWT
        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET || "access_secret"
        ) as { userId: string; email: string; role: string };

        // Fetch user from the database using TypeORM
        const userRepository = AppDataSource.getRepository(User);
        const userId = typeof payload.userId === 'number' ? payload.userId : Number(payload.userId);

    // Fetch the user
    const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is an admin
        if (user.role !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }

        // Attach user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};
