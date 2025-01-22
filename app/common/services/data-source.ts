import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../user/user.entity";
import { Quiz } from "../../quizzes/quiz.entity";
import { Question } from "../../questions/question.entity";
import { QuizAttempt } from "../../quizAttempts/quizAttempt.entity";
import { Result } from "../../results/result.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // Change if PostgreSQL is running on a different host
  port: 5432, // Default PostgreSQL port
  username: "postgres", // Replace with your PostgreSQL username
  password: "75WayTech", // Replace with your PostgreSQL password
  database: "Testing", // Replace with your database name
  entities: [User,Quiz,Question,QuizAttempt,Result],
  synchronize: false, // Automatically synchronize schema (not recommended in production)
  logging: true, // Set to true for debug logging
  // entities: ["src/entity/**/*.ts"], // Path to your entity files
  migrations: ["app/migration/*.ts"], // Path to your migration files
  subscribers: ["src/subscriber/**/*.ts"] // Path to your subscriber files
});

export default AppDataSource;
