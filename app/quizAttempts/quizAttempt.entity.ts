import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity"; // Assuming User entity is defined in user.entity.ts
import { Quiz } from "../quizzes/quiz.entity"; // Assuming Quiz entity is defined in quiz.entity.ts
import { Question } from "../questions/question.entity"; // Assuming Question entity is defined in question.entity.ts

@Entity("quiz_attempts")
export class QuizAttempt {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.quizAttempts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Quiz, (quiz) => quiz.attempts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "quizId" })
    quiz: Quiz;

    @Column("jsonb") // Store answers as JSONB for flexibility
    answers: { questionId: string; selectedOption: string }[];

    @Column({ default: 0 })
    score: number;

    @Column()
    totalQuestions: number;

    @CreateDateColumn()
    startTime: Date;

    @Column()
    duration: number; // Duration in minutes

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
