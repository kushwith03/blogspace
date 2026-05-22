# BlogSpace

A clean, secure, and interview-ready full-stack blog application. Built with a decoupled **MVC architecture** and **JWT authentication**.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JS (Fetch API), Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Token (JWT)
- **Security:** Bcryptjs (Password Hashing), CORS, Environment Variables

## 🛠️ Project Structure

The backend follows the **MVC (Model-View-Controller)** pattern:

- `api/models/` - Database schemas and queries (Data Layer)
- `api/controllers/` - Business logic and request handling (Logic Layer)
- `api/routes/` - API endpoint definitions
- `api/middleware/` - Request filters (e.g., Auth verification)
- `api/config/` - External service configurations (DB Connection)
- `public/` - Static frontend files (UI Layer)

## 🌟 Key Technical Features

- **MVC Architecture:** Separation of concerns for better maintainability and scalability.
- **JWT Authentication:** Secure, stateless user authentication and protected routes.
- **RESTful API:** Clean API design following standard REST conventions.
- **Secure Data Persistence:** PostgreSQL integration with connection pooling and SSL.
- **Environment Management:** Centralized configuration using `dotenv`.

## ⚙️ Local Setup

### 1. Database
- Install PostgreSQL and create a database named `blogspace`.
- Run the schema: `psql -d blogspace -f schema.sql`

### 2. Backend
- Install dependencies: `npm install`
- Setup environment: `cp .env.example .env` (Update `DATABASE_URL` and `JWT_SECRET`)
- Start server: `npm run dev`

### 3. Frontend
- Start the frontend server: `npm run serve`
- The app will be available at: `http://localhost:5500`

---

## ☁️ Deployment

### Backend (Render)
1. Create a **Web Service** on Render.
2. Set **Build Command** to `npm install`.
3. Set **Start Command** to `node api/index.js`.
4. Add environment variables: `DATABASE_URL`, `FRONTEND_URL`, `JWT_SECRET`.

### Frontend (Vercel)
1. Create a project on Vercel.
2. Set the **Root Directory** to `public`.
3. Update `public/js/config.js` with your production API URL.
