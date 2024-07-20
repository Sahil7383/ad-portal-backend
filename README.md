# Backend for Advertisment Portal Application

## Overview

This is the backend server for the Advertisment Portal application, built with Node.js, Express, and MySQL. It provides APIs for user authentication, advertisement management, and file handling.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [Error Handling](#error-handling)
- [License](#license)

## Features

- 📝 **User Authentication:** Secure signup and login with JWT.
- 📢 **Advertisement Management:** Create and retrieve advertisements.
- 📸 **File Upload:** Handle image uploads for advertisements.
- 🔐 **Admin Access Control:** Restrict access based on user domains.

## Technologies

- **Node.js**
- **Express**
- **MySQL** with Sequelize ORM
- **JWT (JSON Web Token)** for authentication
- **Multer** for file uploads
- **dotenv** for environment variables

## Setup

### Environment Variables

1. **Create a `.env` file:** Copy the `.env.example` file to `.env` and set your environment variables.

   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file:** Ensure the following variables are set in your `.env` file:

   ```env
   PORT=5000
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   ```

### Database Setup

1. **Install MySQL** and ensure it's running.
2. **Create the database** specified in the `.env` file.

   ```sql
   CREATE DATABASE your_database_name;
   ```

3. **Run migrations and seed the database (if applicable):**

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

### Running the Server

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**

   ```bash
   npm start
   ```

   The backend server will be available at [http://localhost:5000](http://localhost:5000).

## Error Handling

The application uses a global error handler to catch and respond to errors. Custom errors and general server errors are handled and returned with appropriate status codes and messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
