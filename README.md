# Task Management Backend with User Authentication and Feed

## Overview
This project is a Node.js backend application built with TypeScript. It provides APIs for user authentication, task management, and a feed section for posting content. The project is designed to be modular, scalable, and easy to integrate with any frontend.

## Features
- **User Authentication**:
  - User registration, login, and password reset.
  - Token-based authentication using JWT.
- **Task Management System**:
  - Add, update, and delete tasks.
  - Drag-and-drop functionality to move tasks between columns (Pending, Completed, Done).
- **Feed Section**:
  - Users can post photos and captions.
  - Integration with Cloudinary for image storage.
- **RESTful API**: Structured request/response formats.

---

## Installation

### Prerequisites
- Node.js 16.x or later
- MongoDB (for database operations)
- Cloudinary account (for feed image storage)

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/task-manager-backend.git
   cd task-manager-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   - Create a `.env` file in the root directory with the following keys:
     ```env
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

---

## Endpoints

### User Authentication

#### POST /auth/register
  - Registers a new user.

  **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

  **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### POST /auth/login
  - Logs in an existing user.

  **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

  **Response**:
  ```json
 {
    "message":"Login successful",
    "token":"jwt_token",
    "email":"john.tiwari1995@gmail.com",
    "name":"John doe"
 }
  ```

#### POST /auth/forgot-password
  - Initiates a password reset

---

### Task Management

#### POST /tasks
  - Creates a new task.

  **Request Headers**:
  ```bash
  Authorization: Bearer <jwt_token>
  ```

  **Request Body**:
  ```json
  {
    "name": "Task 1",
    "description": "Description for Task 1"
  }
  ```

  **Response**:
  ```json
  {
    "message": "Task created successfully"
  }
  ```

#### GET /tasks
  - Retrieves all tasks for the logged-in user.

  **Response**:
  ```json
  [
    {
      "id": "12345",
      "name": "Task 1",
      "description": "Description for Task 1",
      "status": "Pending"
    }
  ]
  ```

#### PATCH /tasks/{id}
  - Updates a task's status.

  **Request Body**:
  ```json
  {
    "status": "Completed"
  }
  ```

#### DELETE /tasks/{id}
  - Deletes a task.

  **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

### Feed Section

#### POST /feed
  - Posts a photo with a caption.

  **Request Headers**:
  ```bash
  Authorization: Bearer <jwt_token>
  ```

  **Request Body**:
  ```json
  {
    "description": "This is a sample post",
    "url": "<cloudinary_image_url>"
  }
  ```

  **Response**:
  ```json
  {
    "message": "Post created successfully"
  }
  ```

#### GET /feed
  - Retrieves all posts from all users.

  **Response**:
  ```json
  [
    {
      "id": "12345",
      "caption": "This is a sample post",
      "image_url": "<cloudinary_image_url>",
      "author": "John Doe"
    }
  ]
  ```

---

## Run with Docker

1. Build the Docker image:
   ```bash
   docker build -t task-manager-backend .
   ```

2. Run the Docker container:
   ```bash
   docker run -e MONGODB_URI=<your_mongodb_connection_string> \
              -e JWT_SECRET=<your_jwt_secret> \
              -p 3000:3000 task-manager-backend
   ```

3. Access the application:
   ```bash
   http://localhost:3000
   ```

---

## Notes
- **Google OAuth**: Integration is not implemented but can be added as a future enhancement.
- **Code Quality**: The project follows TypeScript best practices with strict typing and modular architecture.


