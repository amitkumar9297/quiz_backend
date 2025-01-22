import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToMany  } from "typeorm";
import { Quiz } from "../quizzes/quiz.entity";
import { QuizAttempt } from "../quizAttempts/quizAttempt.entity"; // Adjust the path as necessary
import { Result } from "../results/result.entity";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "enum", enum: ["USER", "ADMIN"], default: "USER" })
    role: "USER" | "ADMIN";

    @Column({ type: "boolean", default: true })
    active: boolean;

    @Column({ nullable: true }) // Add this line for refresh token
    refreshToken?: string;

    @OneToMany(() => Quiz, quiz => quiz.createdBy) // Establish the one-to-many relationship
    quizzes: Quiz[];

    @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.user)
    quizAttempts: QuizAttempt[];

    @OneToMany(() => Result, (result) => result.user) // Define the one-to-many relationship
    results: Result[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}