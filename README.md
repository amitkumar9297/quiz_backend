# Quiz App Backend

## Overview
This project is a backend system for a Quiz Application, built with **Node.js** and **TypeScript**. The system supports functionality for administrators to manage quizzes, users to attempt quizzes, and a result management system. It follows a modular architecture with features like authentication, rate limiting, and notifications.

---

## Features
- **Authentication**: Secure login and registration for users.
- **Quiz Management**: Admins can create, update, and delete quizzes and questions.
- **Quiz Attempt**: Users can participate in quizzes and submit their answers.
- **Result Management**: Users can view their quiz results.
- **Notification System**: Notify users about quiz-related updates.
- **Rate Limiting**: Protect APIs from excessive requests.

---

## Technologies Used
- **Node.js**: Backend runtime.
- **TypeScript**: For strong typing and maintainability.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: Database for storing application data.
- **express-rate-limit**: Middleware for rate limiting.
- **JWT**: For user authentication and authorization.

---

## Folder Structure
```plaintext
src/
  admin/
    admin.routes.ts
    admin.controller.ts
    admin.service.ts
    admin.dto.ts
    admin.model.ts
  users/
    user.routes.ts
    user.controller.ts
    user.service.ts
    user.dto.ts
    user.model.ts
  quizzes/
    quiz.routes.ts
    quiz.controller.ts
    quiz.service.ts
    quiz.dto.ts
    quiz.model.ts
  questions/
    question.routes.ts
    question.controller.ts
    question.service.ts
    question.dto.ts
    question.model.ts
  result/
    result.routes.ts
    result.controller.ts
    result.service.ts
    result.dto.ts
    result.model.ts
  notification/
    notification.routes.ts
    notification.controller.ts
    notification.service.ts
    notification.dto.ts
    notification.model.ts
  helpers/
    imports.helper.ts
    utils.ts
  app.ts
  server.ts
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiz-app-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quiz-app-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file for environment variables:
   ```plaintext
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/quizApp
   JWT_SECRET=your_jwt_secret
   RATE_LIMIT_WINDOW=15 * 60 * 1000
   RATE_LIMIT_MAX=100
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication
- **POST /api/auth/register**: User registration.
- **POST /api/auth/login**: User login.

### Quiz Management (Admin)
- **POST /api/admin/quizzes**: Create a quiz.
- **GET /api/admin/quizzes**: Get all quizzes.
- **PUT /api/admin/quizzes/:id**: Update a quiz.
- **DELETE /api/admin/quizzes/:id**: Delete a quiz.

### Quiz Attempt
- **POST /api/quizzes/:id/attempt**: Submit quiz answers.
- **GET /api/quizzes/:id/result**: View quiz results.

### Notifications
- **GET /api/notifications**: Get user notifications.

---

## Scripts
- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the TypeScript files.
- **`npm start`**: Start the production server.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## DFD Image
![DFD](https://github.com/user-attachments/assets/62e4fc99-1dac-46e7-a76c-7b6b6787f87f)

## Flow Chart

![dataFlowChart](https://github.com/user-attachments/assets/95759e7f-5fc8-4d90-8147-a8ca1b97c554)
