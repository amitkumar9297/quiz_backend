// quiz.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "../user/user.entity"; 
import { Question } from "../questions/question.entity"; 
import { QuizAttempt } from "../quizAttempts/quizAttempt.entity";
import { Result } from "../results/result.entity";

@Entity('quizzes')
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'int' })
    duration: number;

    @ManyToOne(() => User, user => user.quizzes) // Define relationship
    @JoinColumn({ name: 'createdBy' })
    createdBy: User;

    @ManyToOne(() => Question, question => question.quiz, { nullable: true })
    questions: Question[];

    @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
    attempts: QuizAttempt[];

    @OneToMany(() => Result, (result) => result.quiz) // Define the one-to-many relationship
    results: Result[]; 

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
