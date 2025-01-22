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

    /**
     * Creates a new quiz.
     * @param data A CreateQuizDTO object that contains the data to create the quiz.
     * @returns A Promise that resolves to the newly created Quiz entity.
     * @throws Error if the User referenced by the 'createdBy' field is not found.
     */
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

    /**
     * Retrieves all quizzes in the database, including their relations.
     * @returns A Promise that resolves to an array of Quiz entities.
     */
    async getQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find({ relations: ["createdBy", "questions"] }); // Load relations
    }

/**
 * Retrieves a quiz by its ID, including related entities.
 * @param id The unique identifier of the quiz.
 * @returns A Promise that resolves to the Quiz entity if found, or null if not found.
 */

    async getQuizById(id: string): Promise<Quiz | null> {
        return this.quizRepository.findOne({ where: { id }, relations: ["createdBy", "questions"] });
    }


    /**
     * Updates a quiz by its ID.
     * @param id The unique identifier of the quiz to update.
     * @param data A UpdateQuizDTO object that contains the data to update the quiz.
     * @returns A Promise that resolves to the updated Quiz entity if found, or null if not found.
     */
    async updateQuiz(id: string, data: UpdateQuizDTO): Promise<Quiz | null> {
        await this.quizRepository.update(id, data); // Update the quiz
        return this.getQuizById(id); // Retrieve the updated quiz
    }
    /**
     * Deletes a quiz by its ID.
     * @param id The unique identifier of the quiz to delete.
     * @returns A Promise that resolves to the deleted Quiz entity if found, or null if not found.
     */

    async deleteQuiz(id: string): Promise<Quiz | null> {
        const quiz = await this.getQuizById(id); // Check if the quiz exists
        if (!quiz) return null; // Return null if not found
        await this.quizRepository.delete(id); // Delete the quiz
        return quiz; // Return the deleted quiz
    }
}
