# 🚀 BlogSpace — Production-Ready Full-Stack Platform

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://blogspace-phi-two.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://blogspace-api-dy5p.onrender.com/api/health)
[![Database](https://img.shields.io/badge/Database-Neon--PostgreSQL-00e599?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![Security](https://img.shields.io/badge/Auth-JWT--Bcrypt-blue?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io)

**BlogSpace** is a high-performance, decoupled full-stack blogging platform engineered with modern industry standards. It features a clean **MVC architecture**, stateless **JWT authentication**, and a professional **SaaS-inspired UI**.

🔗 **Live Demo:** [blogspace-phi-two.vercel.app](https://blogspace-phi-two.vercel.app)  
📡 **API Status:** [blogspace-api-dy5p.onrender.com/api/health](https://blogspace-api-dy5p.onrender.com/api/health)

---

## 🌟 Key Technical Features

- **🏛️ MVC Architecture:** Clean separation of concerns (Models, Controllers, Routes) for maximum maintainability.
- **🔐 Advanced Authentication:** Stateless **JWT (JSON Web Token)** implementation with **Bcryptjs** password hashing.
- **🛡️ Secure Data Access:** Dual-layer security (User account auth + individual post-level passwords).
- **📊 Robust Persistence:** Fully relational **PostgreSQL** database with optimized connection pooling.
- **🎨 Modern UI/UX:** Responsive SaaS-dashboard aesthetic built with **Bootstrap 5** and custom CSS.
- **☁️ Cloud-Native:** Optimized for distributed deployment across Vercel, Render, and Neon.

---

## 🏗️ Technical Architecture

The backend is structured using the **Model-View-Controller (MVC)** design pattern to ensure a decoupled and scalable codebase:

```text
api/
├── config/      # Database pooling and connection logic
├── controllers/ # Business logic and request processing
├── middleware/  # JWT verification and auth filters
├── models/      # Data access layer (Raw SQL / pg)
└── routes/      # RESTful endpoint definitions
```

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Variables), Vanilla JS (ES6+), Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Neon Serverless) |
| **Authentication** | JWT, LocalStorage, Bcryptjs |
| **Deployment** | Vercel (Frontend), Render (API) |

---

## ⚙️ Local Development

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL instance

### 2. Installation
```bash
git clone https://github.com/kushwith03/blogspace.git
cd blogspace
npm install
```

### 3. Environment Setup
Create a `.env` file based on `.env.example`:
```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secure_random_key
FRONTEND_URL=http://localhost:5500
```

### 4. Running the App
```bash
# Start API (Port 3000)
npm run dev

# Start Frontend (Port 5500)
npm run serve
```

---

## 🧪 API Endpoints (RESTful)

### Auth
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Authenticate and receive JWT

### Blogs
- `GET /api/blogs` - Fetch all blogs (Public)
- `GET /api/blogs/:id` - Fetch single blog (Public)
- `POST /api/blogs` - Create blog (Protected 🔐)
- `PATCH /api/blogs/:id` - Update blog (Protected 🔐)
- `DELETE /api/blogs/:id` - Delete blog (Protected 🔐)

---

## 🎓 Lessons Learned & Challenges

- **CORS Management:** Handled complex cross-origin resource sharing between Vercel and Render.
- **Route Rewrites:** Implemented professional routing in a static environment using `vercel.json`.
- **Stateless Auth:** Engineered a robust JWT middleware to secure sensitive data operations.
- **Database Scalability:** Mastered PostgreSQL connection pooling for serverless environments.

---

<p align="center">
  Built with ❤️ by <strong>Kushwith_03</strong>
</p>
