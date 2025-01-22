import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "../user/user.entity"; // Import the User entity
import { Quiz } from "../quizzes/quiz.entity"; // Import the Quiz entity

@Entity("results") // Table name
export class Result {
    @PrimaryGeneratedColumn("uuid") // Auto-generated primary key of type UUID
    id: string;

    @ManyToOne(() => User, (user) => user.results, { onDelete: "CASCADE" }) // Reference to the User entity
    @JoinColumn({ name: "userId" }) // Foreign key column name
    user: User;

    @ManyToOne(() => Quiz, (quiz) => quiz.results, { onDelete: "CASCADE" }) // Reference to the Quiz entity
    @JoinColumn({ name: "quizId" }) // Foreign key column name
    quiz: Quiz;

    @Column({ type: "int" }) // Score achieved in the quiz
    score: number;

    @Column({ type: "int" }) // Total questions in the quiz
    totalQuestions: number;

    @CreateDateColumn() // Automatically sets the date of the attempt
    createdAt: Date;

    @Column()
    userId: number; // Ensure this property exists if you want to use it
    
    @Column()
    quizId: string;
}
