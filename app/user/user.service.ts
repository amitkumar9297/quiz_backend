import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import { User, IUser } from "./user.model";
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "./user.dto";
import { generateAccessToken, generateRefreshToken, JwtPayload } from "../common/helper/token.helper";

export class UserService {
    
    /**
     * Creates a new user with the provided data.
     * 
     * @param {CreateUserDTO} data - The data required to create a new user.
     * @returns {Promise<IUser>} The newly created user.
     * @throws {Error} If there is an error during user creation.
     */
    async createUser(data: CreateUserDTO): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userData = { ...data, password: hashedPassword };
        const user = new User(userData);
        await user.save();


        return user;
    }

    

    /**
     * Authenticates a user by checking their email and password.
     * 
     * @param {string} email - The email address of the user to authenticate.
     * @param {string} password - The password to validate against the user's stored password.
     * @returns {Promise<{ accessToken: string; refreshToken: string }>} - An object containing the generated access token and refresh token.
     * @throws {Error} If the email or password is invalid.
     */
    async loginUser(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; userId: string }> {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Generate tokens
        const payload: JwtPayload = { 
            userId: user._id.toString(), // Convert ObjectId to string
            email: user.email, 
            role: user.role 
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return { accessToken, refreshToken, userId: user._id.toString() };
    }



    
    /**
     * Generates a new access token for a given refresh token.
     * 
     * @param {string} refreshToken - The refresh token to verify and generate a new access token for.
     * @returns {Promise<string>} The new access token.
     * @throws {Error} If the refresh token is invalid or expired.
     */
    async refreshAccessToken(refreshToken: string): Promise<string> {
        try {
            // Verify refresh token
            const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret"; // Use your secret for refresh tokens
            const payload = jwt.verify(refreshToken, secret) as JwtPayload;

            // Generate new access token
            const accessToken = generateAccessToken({
                userId: payload.userId,
                email: payload.email,
                role: payload.role,
            });

            return accessToken;
        } catch (error) {
            throw new Error("Invalid or expired refresh token");
        }
    }

    

    
    /**
     * Retrieves all users from the database.
     * 
     * @returns {Promise<IUser[]>} A promise that resolves with an array of all users.
     */
    async getUsers(): Promise<IUser[]> {
        return User.find();
    }

    /**
     * Retrieves a user by their ID.
     * 
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<IUser | null>} The user if found, otherwise null.
     */
    async getUserById(id: string): Promise<IUser | null> {
        return User.findById(id);
    }


     /**
     * Updates a user's information.
     * 
     * @param {string} id - The ID of the user to update.
     * @param {UpdateUserDTO} data - The updated user data.
     * @returns {Promise<IUser | null>} The updated user if found, otherwise null.
     */
    
    async updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Marks a user as inactive (deleted) by their ID.
     * 
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<IUser | null>} The updated user if found, otherwise null.
     */
    async deleteUser(id: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, { active: false }, { new: true });
    }
}
