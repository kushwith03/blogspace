# BlogSpace

A clean, secure, and interview-ready full-stack blog application. Built with a decoupled architecture (Separate Frontend & Backend).

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JS (Fetch API), Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Security:** Bcryptjs (Password Hashing), CORS, Environment Variables

## 🛠️ Project Structure

- `/api` - Express.js backend (JSON API)
- `/public` - Static frontend files
- `schema.sql` - Database schema

## 🌟 Key Technical Features

- **Decoupled Architecture:** Separate frontend and backend for better scalability and independent deployment.
- **Security:** Password hashing using `bcryptjs` to ensure user data protection.
- **RESTful API:** Clean API design following REST conventions.
- **Modern UI:** Responsive design using Bootstrap 5 and custom CSS.
- **Production Ready:** Configured for easy deployment on Vercel, Render, and Neon.

## ⚙️ Local Setup

### 1. Database
- Install PostgreSQL and create a database named `blogspace`.
- Run the queries in `schema.sql` to create the tables.

### 2. Backend
- Create a `.env` file in the root: `cp .env.example .env`
- Update the variables in `.env` with your local database credentials.
- Install dependencies: `npm install`
- Start the server: `node api/index.js`

### 3. Frontend
- Open `public/index.html` using a local server (like Live Server in VS Code).
- Ensure `public/js/config.js` is pointing to `http://localhost:3000/api`.

## ☁️ Deployment

### Backend (Render)
1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `node api/index.js`.
5. Add environment variables: `DATABASE_URL`, `FRONTEND_URL`.

### Frontend (Vercel)
1. Create a new project on Vercel.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `public`.
4. Update `public/js/config.js` with your Render backend URL.

### Database (Neon/Render)
1. Provision a PostgreSQL instance.
2. Copy the connection string into the `DATABASE_URL` environment variable on Render.
