import jwt from "jsonwebtoken";

export interface JwtPayload {
    userId: string;
    email: string;
    role: "USER" | "ADMIN";
}

// Generate Access Token
export const generateAccessToken = (payload: any): string => {
    const secret = process.env.ACCESS_TOKEN_SECRET || "access_secret";
    return jwt.sign(payload, secret, { expiresIn: "1d" }); 
};

// Generate Refresh Token
export const generateRefreshToken = (payload: any): string => {
    const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
    return jwt.sign(payload, secret, { expiresIn: "7d" }); // 7 days
};
