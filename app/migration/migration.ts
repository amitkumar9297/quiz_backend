import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateQuizAppEntities1645897409103 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Users Table
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true },
                    { name: "name", type: "varchar", length: "255" },
                    { name: "email", type: "varchar", length: "255", isUnique: true },
                    { name: "password", type: "varchar" },
                    { name: "role", type: "enum", enum: ["USER", "ADMIN"], default: "'USER'" },
                    { name: "active", type: "boolean", default: true },
                    { name: "refreshToken", type: "varchar", isNullable: true },
                    { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
                ],
            }),
            true
        );

        // Create Quizzes Table
        await queryRunner.createTable(
            new Table({
                name: "quizzes",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "title", type: "varchar" },
                    { name: "description", type: "varchar" },
                    { name: "duration", type: "int" },
                    { name: "createdBy", type: "int" }, // This should be a foreign key
                    { name: "isActive", type: "boolean", default: true },
                    { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
                ],
            }),
            true
        );

        // Create Questions Table
        await queryRunner.createTable(
            new Table({
                name: "questions",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "quizId", type: "uuid" }, // This should be a foreign key
                    { name: "questionText", type: "varchar" },
                    { name: "options", type: "text", isArray: true },
                    { name: "correctAnswer", type: "varchar" },
                    { name: "questionType", type: "enum", enum: ["MCQ", "TRUE_FALSE"] },
                    { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
                ],
            }),
            true
        );

        // Create Quiz Attempts Table
        await queryRunner.createTable(
            new Table({
                name: "quiz_attempts",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "userId", type: "int" }, // This should be a foreign key
                    { name: "quizId", type: "uuid" }, // This should be a foreign key
                    { name: "answers", type: "jsonb" },
                    { name: "score", type: "int", default: 0 },
                    { name: "totalQuestions", type: "int" },
                    { name: "startTime", type: "timestamp" },
                    { name: "duration", type: "int" },
                    { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
                ],
            }),
            true
        );

        // Create Results Table
        await queryRunner.createTable(
            new Table({
                name: "results",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "userId", type: "int" }, // This should be a foreign key
                    { name: "quizId", type: "uuid" }, // This should be a foreign key
                    { name: "score", type: "int" },
                    { name: "totalQuestions", type: "int" },
                    { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                ],
            }),
            true
        );

        // Create Foreign Keys
        await queryRunner.createForeignKey(
            "quizzes",
            new TableForeignKey({
                columnNames: ["createdBy"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "questions",
            new TableForeignKey({
                columnNames: ["quizId"],
                referencedColumnNames: ["id"],
                referencedTableName: "quizzes",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "quiz_attempts",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "quiz_attempts",
            new TableForeignKey({
                columnNames: ["quizId"],
                referencedColumnNames: ["id"],
                referencedTableName: "quizzes",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "results",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "results",
            new TableForeignKey({
                columnNames: ["quizId"],
                referencedColumnNames: ["id"],
                referencedTableName: "quizzes",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop Foreign Keys
        await queryRunner.dropForeignKey("results", "FK_results_userId");
        await queryRunner.dropForeignKey("results", "FK_results_quizId");
        await queryRunner.dropForeignKey("quiz_attempts", "FK_quiz_attempts_userId");
        await queryRunner.dropForeignKey("quiz_attempts", "FK_quiz_attempts_quizId");
        await queryRunner.dropForeignKey("questions", "FK_questions_quizId");
        await queryRunner.dropForeignKey("quizzes", "FK_quizzes_createdBy");

        // Drop Tables
        await queryRunner.dropTable("results");
        await queryRunner.dropTable("quiz_attempts");
        await queryRunner.dropTable("questions");
        await queryRunner.dropTable("quizzes");
        await queryRunner.dropTable("users");
    }
}
