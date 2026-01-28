# Notes App – Full Stack Project

## Live Demo

Frontend: https://notes-frontend-alpha-sable.vercel.app

````md
A full-stack notes application with authentication and CRUD functionality.

## Tech Stack

### Frontend

- React (Vite)
- CSS (custom, responsive)
- Fetch API
- HTTP-only cookies for auth

### Backend

- Node.js
- Express
- PostgreSQL
- Cookie-based authentication

## Features

- User signup & login
- Persistent authentication
- Create, edit, update & delete notes
- Secure cookie-based sessions
- Responsive UI (mobile friendly)

## Project Structure

```text
frontend-backend-task/
├── backend/        # Express + PostgreSQL API
├── notes-react/    # React frontend
└── README.md
```
````

## Local Development

### Backend

cd backend -> npm install -> npm run dev

### Frontend

cd notes-react -> npm install -> npm run dev

## Environment Variables

### Backend (.env)

```env
PORT=4000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notes_app
DB_USER=notes_user
DB_PASSWORD=notes_password
```

### Frontend (.env)

```env
VITE_API_BASE=http://localhost:4000
```
