# WAIA Hub (West African AI Hub) API

This is the backend API for the WAIA Hub, a platform for cataloging AI projects in West Africa.

## Features

- User authentication with JWT
- CRUD operations for projects
- Project reviews and "hearts" (likes)
- Tagging system for projects
- Moderation system for project approval

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Joi
- dotenv
- cors

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/waia-hub.git
   ```
2. Navigate to the project directory:
   ```bash
   cd waia-hub
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of the project.
2. Copy the contents of `.env.example` into your new `.env` file.
3. Update the environment variables in the `.env` file with your own values:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret key for signing JWTs.
   - `PORT`: The port you want the server to run on (e.g., 5000).

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will start on the port you specified in your `.env` file.

## API Endpoints

A detailed list of all API endpoints can be found in the project's route files.
