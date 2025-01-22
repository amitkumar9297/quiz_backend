import { Quiz } from "./quiz.entity"; // Make sure the import is correct
import { CreateQuizDTO, UpdateQuizDTO } from "./quiz.dto";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import AppDataSource from "../common/services/data-source"; // Adjust this import based on your project structure

export class QuizService {
    private quizRepository: Repository<Quiz>;

    constructor() {
        this.quizRepository = AppDataSource.getRepository(Quiz);
    }

    async createQuiz(data: CreateQuizDTO): Promise<Quiz> {
        // Fetch the User entity using the createdBy ID
        const user = await this.quizRepository.manager.findOne(User, { where: { id: data.createdBy } });
        if (!user) {
            throw new Error("User not found");
        }
    
        const quiz = this.quizRepository.create({
            title: data.title,
            description: data.description,
            duration: data.duration,
            createdBy: user, // Assign the User entity
        });
    
        return this.quizRepository.save(quiz); // Save the quiz
    }

    async getQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find({ relations: ["createdBy", "questions"] }); // Load relations
    }

    async getQuizById(id: string): Promise<Quiz | null> {
        return this.quizRepository.findOne({ where: { id }, relations: ["createdBy", "questions"] });
    }

    async updateQuiz(id: string, data: UpdateQuizDTO): Promise<Quiz | null> {
        await this.quizRepository.update(id, data); // Update the quiz
        return this.getQuizById(id); // Retrieve the updated quiz
    }

    async deleteQuiz(id: string): Promise<Quiz | null> {
        const quiz = await this.getQuizById(id); // Check if the quiz exists
        if (!quiz) return null; // Return null if not found
        await this.quizRepository.delete(id); // Delete the quiz
        return quiz; // Return the deleted quiz
    }
}
