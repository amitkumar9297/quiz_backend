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

    async getQuestionsByQuizId(quizId: string): Promise<Question[]> {
        return this.questionRepository.find({
            where: { quiz: { id: quizId } },
            relations: ["quiz"],
        });
    }

    async getQuestionById(id: string): Promise<Question | null> {
        return this.questionRepository.findOne({
            where: { id },
            relations: ["quiz"],
        });
    }

    async updateQuestion(id: string, data: UpdateQuestionDTO): Promise<Question | null> {
        const question = await this.getQuestionById(id);

        if (!question) {
            return null;
        }

        Object.assign(question, data);
        return this.questionRepository.save(question);
    }

    async deleteQuestion(id: string): Promise<Question | null> {
        const question = await this.getQuestionById(id);

        if (!question) {
            return null;
        }

        await this.questionRepository.remove(question);
        return question;
    }
}
