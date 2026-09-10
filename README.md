# Shopping List API

A simple Node.js + TypeScript REST API for managing a shopping list.

## Overview

This project provides a backend service for creating, reading, updating, and deleting shopping list items. It is built using Express and TypeScript, making it easy to extend and maintain.

## Features

- Create new shopping items
- View all items
- View a single item by ID
- Update item details
- Delete items
- Type-safe server code with TypeScript
- Simple environment configuration
- Lightweight API structure for local development

## Tech Stack

- Node.js
- TypeScript
- Express
- dotenv
- npm

## Project Structure

```bash
Task-1-Node-TS-Shopping-List-API/
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── ...
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── ...
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm 9 or newer

## Installation

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
copy .env.example .env
```

4. Update the environment values if needed.

## Environment Variables

Example:

```env
PORT=3000
```

## Running the Application

Start the app in development mode:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the compiled app:

```bash
npm start
```

## API Endpoints

The API is designed to manage shopping list items.

### Get all items

```http
GET /api/items
```

### Get a single item

```http
GET /api/items/:id
```

### Create an item

```http
POST /api/items
```

Request body example:

```json
{
  "name": "Milk",
  "quantity": 2,
  "completed": false
}
```

### Update an item

```http
PUT /api/items/:id
```

Request body example:

```json
{
  "name": "Milk",
  "quantity": 3,
  "completed": true
}
```

### Delete an item

```http
DELETE /api/items/:id
```

## Example Response

```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Milk",
    "quantity": 2,
    "completed": false
  }
}
```

## Error Handling

The API returns errors in JSON format when invalid requests are sent or when an item is not found. Typical status codes include:

- 200 OK
- 201 Created
- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error

## Notes

This project is a good starting point for learning:

- Express server setup
- TypeScript integration
- REST API route design
- CRUD operations
- Environment configuration

## License

This project is provided for learning and development purposes.