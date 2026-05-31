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
NODE_ENV=production
JWT_SECRET=your_secret
DATABASE_URL=your_supabase_postgres_url
CORS_ORIGINS=http://localhost:5173,https://your-vercel-url.vercel.app
```

### Frontend (.env)

```env
VITE_API_BASE=http://localhost:4000
VITE_API_BASE=https://your-render-backend.onrender.com
```
