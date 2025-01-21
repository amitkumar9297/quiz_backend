
// import { OutputFile } from "swagger-autogen";

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Express Project API",
    description: "API documentation for Express project",
    contact: {
      name: "API Support",
      email: "support@example.com",
    },
  },
  host: "localhost:5000", // Update with your host
  basePath: "/api",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
  {
      name: "Quizzes",
      description: "Quiz management APIs",
    },
    // Add other tags as necessary...
  ],
  
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "../app/user/user.routes.ts", // User routes
  "../app/quizzes/quiz.routes.ts", // Quiz routes
  "../app/questions/question.routes.ts", // Question routes
  "../app/quizAttempts/quizAttempt.routes.ts", // Quiz Attempt routes
  "../app/results/result.routes.ts", // Result routes
  "../app/notifications/notification.routes.ts", // Notification routes
  "../app/admin/admin.routes.ts", // Admin routes
];

swaggerAutogen(outputFile, endpointsFiles, doc);
