# Personal Expense Tracker

MERN Stack Developer Assessment Task

## Project
Personal Expense Tracker: Build an app where users can add, view, edit, and delete expenses (Next.js frontend is a plus).

### 1. Backend (Node.js + Express + MongoDB)
- **REST API Endpoints**:
  - `POST /expenses`: Add expense (fields: title, amount, category, date)
  - `GET /expenses`: Fetch all expenses
  - `PATCH /expenses/:id`: Update an expense
  - `DELETE /expenses/:id`: Delete an expense

### 2. Frontend (Next.js)
- **Add Expense Form**: Fields - title, amount, category (dropdown), date (picker)
- **Expense List View**:
  - Show all expenses in a table/card layout
  - Display total expense amount at the top
  - Show category badges (e.g., Food, Transport, Shopping, Others)
- **Edit/Delete Functionality**:
  - Edit button: pre-fill form with existing values
  - Delete button: remove expense from list & database

## Setup Instructions

### Prerequisites
- Node.js (v18+), npm, MongoDB Atlas, Git

### Backend (backend/)
1. `cd backend`
2. `npm install`
3. Create `.env`:

MONGO_URI=your_mongo_connection_string_here
PORT=5000

- Use your MongoDB Atlas URI (e.g., `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/expense-tracker?...`).
4. `npm start` (runs on `http://localhost:5000` or `.env` PORT)

### Frontend (frontend/)
1. `cd frontend`
2. `npm install`
3. Create `.env.local`:

NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com

- Use your Render backend URL.
4. `npm run dev` (open `http://localhost:3000`)

## Project Structure
- `backend/`: Node.js/Express API
- `frontend/`: Next.js app

## Code Quality
- Clean, well-structured, properly commented where necessary
- Mongoose validation enforced

## Version Control
- 10+ meaningful Git commits reflecting development process

## Deployment
- Backend: Render [](https://your-backend.onrender.com)
- Frontend: Vercel [](https://your-frontend.vercel.app)
- Set `MONGO_URI` and `PORT` on Render, `NEXT_PUBLIC_BACKEND_URL` on Vercel