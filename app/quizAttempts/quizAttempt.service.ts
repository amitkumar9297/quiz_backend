import { Repository } from "typeorm";
import AppDataSource from "../common/services/data-source"; // Your TypeORM data source
import { QuizAttempt } from "./quizAttempt.entity";
import { Quiz } from "../quizzes/quiz.entity";
import { Question } from "../questions/question.entity";
import { Result } from "../results/result.entity"; // Assuming Result entity is defined in result.entity.ts
import { User } from "../user/user.entity";
import { sendEmail } from "../common/services/email.service";
import { CreateQuizAttemptDTO } from "./quizAttempt.dto";

export class QuizAttemptService {
    private quizAttemptRepository: Repository<QuizAttempt>;
    private quizRepository: Repository<Quiz>;
    private userRepository: Repository<User>;
    private questionRepository: Repository<Question>;
    private resultRepository: Repository<Result>; // Assuming Result repository is also needed

    constructor() {
        this.quizAttemptRepository = AppDataSource.getRepository(QuizAttempt);
        this.quizRepository = AppDataSource.getRepository(Quiz);
        this.userRepository = AppDataSource.getRepository(User);
        this.questionRepository = AppDataSource.getRepository(Question);
        this.resultRepository = AppDataSource.getRepository(Result); // Initialize Result repository
    }

    // Create a new quiz attempt for a user
    async createQuizAttempt(userId: number, quizId: string): Promise<any[]> {
        const quiz = await this.quizRepository.findOne({
            where: { id: quizId },
            relations: ["questions"] // Ensure questions are loaded
        });
        
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }

        // Create a new QuizAttempt
        const quizAttempt = this.quizAttemptRepository.create({
            user, // Assigning complete User entity
            quiz, // Assigning complete Quiz entity
            totalQuestions: quiz.questions.length,
            startTime: new Date(),
            duration: quiz.duration // Assuming duration is in minutes
        });

        await this.quizAttemptRepository.save(quizAttempt);
        return quiz.questions; // Return questions of the quiz
    }

    // Submit a quiz attempt and calculate the score
    async submitQuizAttempt(userId: number, quizId: string, answers: any[]): Promise<{ quizAttempt: QuizAttempt, result: Result } | { message: string }> {
        // Find the quiz attempt by user ID and quiz ID
        const quizAttempt = await this.quizAttemptRepository.findOne({
            where: { 
                user: { id: userId },  // userId is a number
                quiz: { id: quizId }    // quizId is a string
            },
            relations: ["quiz"] // Load quiz to access its properties if needed
        });
    
        if (!quizAttempt) {
            throw new Error('Quiz attempt not found');
        }
    
        const elapsedTime = (new Date().getTime() - new Date(quizAttempt.startTime).getTime()) / (1000 * 60); // Convert to minutes
    
        if (elapsedTime > quizAttempt.duration) {
            return { message: "You are late" };
        }
    
        let score = 0;
        for (const answer of answers) {
            const question = await this.questionRepository.findOneBy({ id: answer.questionId });
            if (question && question.correctAnswer === answer.selectedOption) {
                score++;
            }
        }
    
        quizAttempt.answers = answers; // Update answers
        quizAttempt.score = score; // Set calculated score
        await this.quizAttemptRepository.save(quizAttempt);
    
        // Create new Result instance
        const result = this.resultRepository.create({
            userId, // This should be a number
            quizId, // This should be a string
            score,
            totalQuestions: quizAttempt.totalQuestions,
        });

        // Fetch user and quiz entities for email notification
        const user = await this.userRepository.findOneBy({ id: userId }); // userId is number
        if (!user) {
            throw new Error('User not found');
        }
    
        const userEmail = user.email;
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } }); // quizId is string
        if (!quiz) {
            throw new Error('Quiz not found');
        }
    
        const quizTitle = quiz.title;

        // Email options
        const mailOptions = {
            to: userEmail,
            subject: `Quiz Result for Quiz: ${quizTitle}`,
            text: `Hello,\n\nThank you for participating in the quiz!\n\nYour score: ${score} out of ${quizAttempt.totalQuestions}\n\nBest regards,\nQuiz Team`,
        };
    
        // Send email
        await sendEmail(mailOptions);
    
        await this.resultRepository.save(result); // Save the result
    
        return { quizAttempt, result }; // Return quiz attempt and result
    }
}
