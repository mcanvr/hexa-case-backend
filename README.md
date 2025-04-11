# Generated Logos API Backend

A well-structured Node.js backend application built with Express.js and TypeScript for managing generated logos, storing data in Firebase Firestore.

## Features

- **Structured Architecture:** Follows a Controller-Service pattern for separation of concerns, enhanced maintainability, and testability.
- **API Endpoints:** Provides RESTful endpoints to:
  - Fetch all generated logos (`GET /api/v1/logos`)
  - Fetch the latest generated logo (`GET /api/v1/logos/latest`)
  - Create a new logo entry (`POST /api/v1/logos`)
- **Database Integration:** Uses Firebase Firestore for data persistence.
- **Input Validation:** Employs `Yup` for robust, schema-based request validation on creation endpoints.
- **Centralized Error Handling:** Implements a dedicated error handling middleware for consistent error responses.
- **Async Handling:** Uses a custom `asyncHandler` utility to gracefully handle errors in asynchronous route handlers.
- **Environment Variables:** Manages configuration (like port number) using `.env` files.
- **API Documentation:** Integrated Swagger UI for easy API exploration and testing, available at `/api-docs`.
- **TypeScript:** Fully typed codebase for better developer experience and fewer runtime errors.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Firebase Firestore
- **Validation:** Yup
- **API Documentation:** Swagger UI Express, Swagger JSDoc
- **Development:** Nodemon, ts-node
- **Package Manager:** Yarn (Can be adapted for npm)

## Project Structure

```
.
├── node_modules/          # Project dependencies
├── src/
│   ├── config/            # Configuration files (e.g., firebase.ts)
│   ├── controllers/       # Request/Response handling logic (logo.controller.ts)
│   ├── middleware/        # Custom Express middleware (errorHandler.ts, validateYupSchema.ts)
│   ├── models/            # Data interface definitions (GeneratedLogo.ts)
│   ├── routes/            # API route definitions (logo.routes.ts)
│   ├── services/          # Business logic and database interactions (logo.service.ts)
│   ├── utils/             # Utility functions/classes (asyncHandler.ts, errors.ts)
│   ├── validation/        # Yup validation schemas (logo.validation.ts)
│   └── index.ts           # Application entry point, server setup
├── .env                   # Environment variables (gitignored)
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata and dependencies
├── README.md              # This file
├── tsconfig.json          # TypeScript compiler configuration
└── yarn.lock              # Yarn lock file
```

## Prerequisites

- Node.js (LTS version recommended)
- Yarn (or npm)
- A Firebase project with Firestore enabled.

## Setup & Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

    - (or `npm install` if you prefer npm)

3.  **Set up Environment Variables:**
    - Create a `.env` file in the root directory by copying the example file:
      ```bash
      cp .env.example .env
      ```
    - Open the `.env` file and fill in the required values, especially the `FIREBASE_APP_*` variables. You can find these in your Firebase project settings (usually under Project settings > General > Your apps > SDK setup and configuration).
    - Ensure `.env` is listed in your `.gitignore` file (it should be by default).

## Running the Application

1.  **Development Mode:**
    - Starts the server using `ts-node` and `nodemon` for automatic restarts on file changes.
    ```bash
    yarn dev
    ```
    - The server will typically run on `http://localhost:3002` (or the port specified in your `.env`).

## API Documentation (Swagger)

Once the server is running, you can access the interactive Swagger UI documentation in your browser:

- **URL:** `http://localhost:<PORT>/api-docs`
  - (Replace `<PORT>` with the actual port number, e.g., 3002)

This interface allows you to view all available API endpoints, see their required parameters and expected responses, and even send test requests directly.

## Environment Variables

The following environment variables need to be defined in your `.env` file:

- `PORT`: The port number the server will listen on (defaults to 3002 if not set).
- `FIREBASE_APP_API_KEY`: Your Firebase project's API Key.
- `FIREBASE_APP_AUTH_DOMAIN`: Your Firebase project's Auth Domain.
- `FIREBASE_APP_PROJECT_ID`: Your Firebase project's Project ID.
- `FIREBASE_APP_STORAGE_BUCKET`: Your Firebase project's Storage Bucket URL.
- `FIREBASE_APP_MESSAGING_SENDER_ID`: Your Firebase project's Messaging Sender ID.
- `FIREBASE_APP_APP_ID`: Your Firebase project's App ID.
- `FIREBASE_APP_MEASUREMENT_ID` (Optional): Your Firebase project's Measurement ID for Google Analytics.

Make sure to create a `.env` file in the project root and define these variables. Do **not** commit the `.env` file to version control.
