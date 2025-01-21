import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "access_secret") as { userId: string; email: string; role: string };


        if (payload.role !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }

        
        req.user = payload;
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};
