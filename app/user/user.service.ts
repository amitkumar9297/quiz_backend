import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.entity";
import  AppDataSource  from "../common/services/data-source";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { generateAccessToken, generateRefreshToken } from "../common/helper/token.helper";

export class UserService {
    private userRepository: Repository<User>;

    /**
     * Constructor for the UserService class.
     *
     * Initializes the userRepository property by getting the User repository from the AppDataSource.
     */
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    /**
     * Creates a new user with the provided data.
     *
     * @param {CreateUserDTO} data - The data for the new user.
     * @returns {Promise<User>} A promise that resolves to the created user.
     *
     * This method hashes the user's password before saving the user to the database.
     */

    async createUser(data: CreateUserDTO): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.userRepository.create({ ...data, password: hashedPassword });
        return this.userRepository.save(user);
    }




    /**
     * Logs in a user with the provided email and password.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<{ accessToken: string; refreshToken: string }>} A promise that resolves to an object with the access token and refresh token.
     *
     * This method first checks if the user exists with the provided email and password. If the user does not exist, it throws an error.
     *
     * If the user exists, it generates an access token and a refresh token. The access token is returned in the response, and the refresh token is saved to the user's record in the database.
     */
    async loginUser(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new Error("Invalid email or password");
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid email or password");
    
        const payload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
    
        // Save the refresh token to the database
        user.refreshToken = refreshToken; // Set the refresh token
        await this.userRepository.save(user); // Save the user with the new refresh token
    
        return { accessToken, refreshToken };
    }
    
    /**
     * Refreshes the access token for a user given a valid refresh token.
     *
     * @param {string} refreshToken - The refresh token to use for refreshing the access token.
     * @returns {Promise<string>} A promise that resolves to the new access token.
     * @throws {Error} If the refresh token is invalid or the user is not found.
     */

    async refreshAccessToken(refreshToken: string): Promise<string> {
        const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
        const payload = jwt.verify(refreshToken, secret) as any;

        return generateAccessToken({ userId: payload.userId, email: payload.email, role: payload.role });
    }


    /**
     * Retrieves all users from the database.
     *
     * @returns {Promise<User[]>} A promise that resolves to an array of all users.
     */
    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }


    /**
     * Retrieves a user by their ID from the database.
     *
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Promise<User | null>} A promise that resolves to the user with the given ID, or null if no user is found.
     */
    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }


    /**
     * Updates a user's details with the provided data.
     *
     * @param {number} id - The ID of the user to update.
     * @param {UpdateUserDTO} data - The data to update the user with.
     * @returns {Promise<User | null>} A promise that resolves to the updated user if the user exists,
     * or null if the user doesn't exist.
     */
    async updateUser(id: number, data: UpdateUserDTO): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) return null;

        Object.assign(user, data);
        return this.userRepository.save(user);
   }


    /**
     * Deletes a user by their ID from the database, by setting their "active" field to false.
     *
     * @param {number} id - The ID of the user to delete.
     * @returns {Promise<User | null>} A promise that resolves to the deleted user if the user exists,
     * or null if the user doesn't exist.
     */
    async deleteUser(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) return null;

        user.active = false;
        return this.userRepository.save(user);
    }

    // private generateAccessToken(payload: any): string {
    //     const secret = process.env.ACCESS_TOKEN_SECRET || "access_secret";
    //     return jwt.sign(payload, secret, { expiresIn: "1h" });
    // }

    // private generateRefreshToken(payload: any): string {
    //     const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
    //     return jwt.sign(payload, secret, { expiresIn: "7d" });
    // }
}
