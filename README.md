# BlogSpace — Full-Stack Blog Platform

A professional, decoupled blogging platform featuring a clean **MVC architecture**, secure **JWT authentication**, and a responsive SaaS-inspired interface.

## Overview

BlogSpace is built to demonstrate robust backend engineering and relational data modeling. It features a complete RESTful API and a secure user management system, optimized for high performance and data integrity.

- **Frontend:** [blogspace-phi-two.vercel.app](https://blogspace-phi-two.vercel.app)
- **Backend API:** [blogspace-api-dy5p.onrender.com/api/health](https://blogspace-api-dy5p.onrender.com/api/health)

## Tech Stack

- **Backend:** Node.js, Express.js (RESTful MVC)
- **Database:** PostgreSQL (Neon Serverless)
- **Security:** JWT (Stateless Auth), Bcryptjs (Hashing)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript, Bootstrap 5
- **Deployment:** Vercel & Render

## Key Engineering Features

- **MVC Architecture:** Structured separation of concerns across models, controllers, and routes for scalability.
- **Stateless Authentication:** Secure JWT-based auth flow with authorization middleware for protected CRUD operations.
- **Relational Persistence:** Advanced PostgreSQL modeling with connection pooling for efficient data handling.
- **Responsive UI:** Modern dashboard aesthetic optimized for both mobile and desktop views.

## Setup & Installation

1. **Clone and Install:**
   ```bash
   git clone https://github.com/kushwith03/blogspace.git
   cd blogspace
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_secure_secret_key
   ```

3. **Run Application:**
   ```bash
   npm run dev    # Start API server (Port 3000)
   npm run serve  # Start Frontend (Port 5500)
   ```

## Author

**R Khushwith Kumar**  
Full Stack Software Engineer  
[Portfolio](https://rkhushwith-portfolio.vercel.app) • [GitHub](https://github.com/kushwith03) • [LinkedIn](https://linkedin.com/in/kushwith03)
