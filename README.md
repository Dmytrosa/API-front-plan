# Rock, Paper, Scissors Backend API

An **Express.js** backend API for an online Rock, Paper, Scissors game, built using **TypeScript** and **MongoDB**, following **Clean Architecture** principles.

## Prerequisites

Make sure you have the following before you proceed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or cloud instance)

## Required Libraries

- **Express.js**: Web framework for Node.js
- **TypeScript**: Strongly typed programming language that builds on JavaScript
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment
- **ESLint**: Linting utility for JavaScript and TypeScript
- **Nodemon**: Utility that monitors for changes in your source and automatically restarts your server
- **dotenv**: Loads environment variables from a `.env` file into `process.env`

## Setup Guide

Follow these steps to set up and run the API:

### Clone the Repository

```bash
git clone https://github.com/Dmytrosa/API-front-plan.git
cd rock-paper-scissors-backend

Install Dependencies
Run the following command to install the required Node.js dependencies:
npm install

Configure Environment Variables
Create a .env file in the root directory of the project and add the following variables, replacing the placeholder values with your actual configuration:
MONGODB_URI=your_mongodb_connection_string
PORT=3000

Build the Project
Compile the TypeScript code into JavaScript:
npm run build

Run the API
To start the server:
npm start


API Overview
This API allows you to manage Rock, Paper, Scissors games, featuring:

Player Management: Create and retrieve player profiles
Game Management: Start new games, make choices, retrieve game status, and reset games
Score Tracking: Track scores between players within a game
Clean Architecture: Ensures maintainability and scalability of the codebase


API Endpoints

Create Player
URL: /players
Method: POST
Headers: Content-Type: application/json
Body:
{
  "username": "Player1"
}
Success Response:
Code: 201 CREATED
Content:
{
  "id": "player1-id",
  "username": "Player1",
  "status": "out-of-game"
}

Get Player
URL: /players/:playerId
Method: GET
Success Response:
Code: 200 OK
Content:
{
  "id": "player1-id",
  "username": "Player1",
  "status": "out-of-game"
}

Start Game
URL: /games/start
Method: POST
Headers: Content-Type: application/json
Body:
{
  "player1Id": "player1-id",
  "player2Id": "player2-id"
}
Success Response:
Code: 201 CREATED
Content:
{
  "id": "game-id",
  "player1": {
    "id": "player1-id",
    "username": "Player1",
    "status": "in-game"
  },
  "player2": {
    "id": "player2-id",
    "username": "Player2",
    "status": "in-game"
  },
  "score": {
    "player1-id": 0,
    "player2-id": 0
  },
  "isActive": true
}

Make Choice
URL: /games/choice
Method: POST
Headers: Content-Type: application/json
Body:
{
  "gameId": "game-id",
  "playerId": "player1-id",
  "choice": "rock"
}
Success Response:
Code: 200 OK
Content:
{
  "message": "Choice made"
}

Get Game Status
URL: /games/:gameId/status
Method: GET
Success Response:
Code: 200 OK
Content:
{
  "id": "game-id",
  "player1": {
    "id": "player1-id",
    "username": "Player1",
    "status": "in-game"
  },
  "player2": {
    "id": "player2-id",
    "username": "Player2",
    "status": "in-game"
  },
  "score": {
    "player1-id": 1,
    "player2-id": 0
  },
  "isActive": true
}

Reset Game
URL: /games/reset
Method: POST
Headers: Content-Type: application/json
Body:
{
  "gameId": "game-id"
}
Success Response:
Code: 200 OK
Content:
{
  "message": "Game reset"
}


Project Structure
The project follows Clean Architecture principles, separating the code into different layers:

Domain: Contains the core business logic, including entities and repository interfaces
Application: Implements use cases that orchestrate the flow between entities and repositories
Infrastructure: Handles database models, connections, and external services
Interfaces: Manages controllers and routes for handling HTTP requests and responses