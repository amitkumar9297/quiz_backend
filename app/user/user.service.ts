import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.entity";
import  AppDataSource  from "../common/services/data-source";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { generateAccessToken, generateRefreshToken } from "../common/helper/token.helper";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(data: CreateUserDTO): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.userRepository.create({ ...data, password: hashedPassword });
        return this.userRepository.save(user);
    }

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
    

    async refreshAccessToken(refreshToken: string): Promise<string> {
        const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
        const payload = jwt.verify(refreshToken, secret) as any;

        return generateAccessToken({ userId: payload.userId, email: payload.email, role: payload.role });
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) return null;

        Object.assign(user, data);
        return this.userRepository.save(user);
    }

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
