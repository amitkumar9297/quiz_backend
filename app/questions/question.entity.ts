import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Quiz } from "../quizzes/quiz.entity";

@Entity("questions")
export class Question {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "quizId" })
    quiz: Quiz;

    @Column()
    questionText: string;

    @Column("text", { array: true })
    options: string[];

    @Column()
    correctAnswer: string;

    @Column({ type: "enum", enum: ["MCQ", "TRUE_FALSE"] })
    questionType: "MCQ" | "TRUE_FALSE";

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
