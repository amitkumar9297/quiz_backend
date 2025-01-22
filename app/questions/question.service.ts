import { Repository } from "typeorm";
import AppDataSource from "../common/services/data-source"; // Your TypeORM data source
import { Question } from "./question.entity";
import { Quiz } from "../quizzes/quiz.entity";
import { CreateQuestionDTO, UpdateQuestionDTO } from "./question.dto";

export class QuestionService {
    private questionRepository: Repository<Question>;
    private quizRepository: Repository<Quiz>;

    constructor() {
        this.questionRepository = AppDataSource.getRepository(Question);
        this.quizRepository = AppDataSource.getRepository(Quiz);
    }

/**
 * Creates a new question associated with a quiz.
 * @param data - A CreateQuestionDTO object containing the details of the question to be created.
 * @returns A Promise that resolves to the newly created Question entity.
 * @throws Error if the quiz with the specified quizId is not found.
 */

    async createQuestion(data: CreateQuestionDTO): Promise<Question> {
        const quiz = await this.quizRepository.findOneBy({ id: data.quizId });

        if (!quiz) {
            throw new Error("Quiz not found");
        }

        const question = this.questionRepository.create({
            ...data,
            quiz,
        });

        return this.questionRepository.save(question);
    }

    /**
     * Retrieves all questions associated with a quiz by its ID.
     * @param quizId The unique identifier of the quiz for which to retrieve the questions.
     * @returns A Promise that resolves to an array of Question entities.
     */
    async getQuestionsByQuizId(quizId: string): Promise<Question[]> {
        return this.questionRepository.find({
            where: { quiz: { id: quizId } },
            relations: ["quiz"],
        });
    }

    /**
     * Retrieves a question by its ID.
     * @param id The unique identifier of the question to retrieve.
     * @returns A Promise that resolves to the Question entity if found, or null if not found.
     */
    async getQuestionById(id: string): Promise<Question | null> {
        return this.questionRepository.findOne({
            where: { id },
            relations: ["quiz"],
        });
    }

    /**
     * Updates a question by its ID.
     * @param id The unique identifier of the question to update.
     * @param data A UpdateQuestionDTO object containing the updated details of the question.
     * @returns A Promise that resolves to the updated Question entity if the question is found, or null if not found.
     */
    async updateQuestion(id: string, data: UpdateQuestionDTO): Promise<Question | null> {
        const question = await this.getQuestionById(id);

        if (!question) {
            return null;
        }

        Object.assign(question, data);
        return this.questionRepository.save(question);
    }

    /**
     * Deletes a question by its ID.
     * @param id The unique identifier of the question to delete.
     * @returns A Promise that resolves to the deleted Question entity if found, or null if not found.
     */
    async deleteQuestion(id: string): Promise<Question | null> {
        const question = await this.getQuestionById(id);

        if (!question) {
            return null;
        }

        await this.questionRepository.remove(question);
        return question;
    }
}
