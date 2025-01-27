import { QuizAttempt } from './quizAttempt.model';
import { Quiz } from '../quizzes/quiz.model';
import { Question } from '../questions/question.model';
import { Result } from '../results/result.model';
import { User } from '../user/user.model';
import { sendEmail } from '../common/services/email.service';


/**
 * QuizAttemptService class for managing quiz attempts.
 */
export class QuizAttemptService {

    /**
     * Creates a new quiz attempt.
     * 
     * @param {string} userId - The ID of the user attempting the quiz.
     * @param {string} quizId - The ID of the quiz being attempted.
     * @param {any[]} answers - An array of answers provided by the user (not used in this method).
     * @returns {Promise<any[]>} A promise that resolves to the questions of the quiz.
     * @throws {Error} If the quiz is not found.
     */

    async createQuizAttempt(userId: string, quizId: string, answers: any[]) {
        const quiz = await Quiz.findById(quizId).populate('questions');;
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const quizAttempt = new QuizAttempt({
            userId,
            quizId,
            // answers,
            totalQuestions: quiz.questions.length,
            startTime: new Date(),
            duration: quiz.duration // Assuming duration is in minutes
        });

        const savedQuizAttempt = await quizAttempt.save();
        console.log("quizCreateAttemp",{ savedQuizAttempt ,questions: quiz.questions })
        // return quizAttempt;
        return { savedQuizAttempt ,questions: quiz.questions } ;
    }


    /**
     * Submits an existing quiz attempt.
     * 
     * @param {string} userId - The ID of the user submitting the quiz.
     * @param {string} quizId - The ID of the quiz being submitted.
     * @param {any[]} answers - An array of answers provided by the user.
     * @returns {Promise<{ quizAttempt: QuizAttempt, result: Result } | { message: string }>} A promise that resolves to an object containing the quiz attempt and result, or a message if submission is late.
     * @throws {Error} If the quiz attempt is not found or if the user is not found.
     */

    async submitQuizAttempt(userId: string, quizId: string,quizAttemptId: string, answers: any[]) {
        const quizAttempt = await QuizAttempt.findById(quizAttemptId);
        console.log("quizAttempt0",quizAttempt)
        if (!quizAttempt) {
            throw new Error('Quiz attempt not found');
        }

        const elapsedTime = (new Date().getTime() - new Date(quizAttempt.startTime).getTime()) / (1000 * 60); // Convert to minutes
        console.log("quizAttempt1",quizAttempt)
        if (elapsedTime > quizAttempt.duration) {
            // throw new Error('You are late. Submission time has expired.');
            return {"message":"you are late"}
        }

        let score = 0;
        for (const answer of answers) {
            const question = await Question.findById(answer.questionId);
            if (question && question.correctAnswer === answer.selectedOption) {
                score++;
            }
        }

        quizAttempt.answers = answers; // Update answers
        quizAttempt.score = score; // Set calculated score
        await quizAttempt.save();

        console.log("quizAttempt2",quizAttempt)

        const result = new Result({
            userId,
            quizId,
            quizAttemptId,
            score,
            totalQuestions: quizAttempt.totalQuestions,
        });

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
    
        const userEmail = user.email; 

        const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new Error('Quiz not found');
    }

    const quizTitle = quiz.title;
    
        // Email options
        const mailOptions = {
            to: userEmail,
            subject: `Quiz Result for Quiz ID: ${quizTitle}`,
            text: `Hello,\n\nThank you for participating in the quiz!\n\nYour score: ${score} out of ${quizAttempt.totalQuestions}\n\nBest regards,\nQuiz Team`,
        };
    
        // Send email (assuming sendEmail is your email sending function)
        await sendEmail(mailOptions);
        
        await result.save(); // Save the result
    
        return { quizAttempt, result };
        
    }
}
