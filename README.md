# 🚀 User Management System

A full-stack User Management System built using the MERN stack as part of a technical assessment.
The application supports secure authentication, role-based access control, and complete user lifecycle management.

---

## 🔗 Live Links

* **Frontend:** https://purple-merit-assessment-psi.vercel.app
* **Backend API:** https://purplemeritassessment-backend-production.up.railway.app

---

## 📌 Project Overview

This application allows managing users with different roles and permissions in a structured and secure way.

### ✨ Features

* JWT-based Authentication
* Role-Based Access Control (Admin, Manager, User)
* Protected Routes
* User Management (Create, Edit, Deactivate)
* Search, Filter, Pagination
* Profile Page
* Modern Admin Dashboard UI
* Proper Loading & Error Handling

---

## 👤 Demo Login Credentials

Use the following credentials to test the system:

### 🔴 Admin

* Email: **[admin@gmail.com](mailto:admin@gmail.com)**
* Password: **123456**

### 🟡 Manager

* Email: **[manager@gmail.com](mailto:manager@gmail.com)**
* Password: **123456**

### 🔵 User

* Email: **[user@gmail.com](mailto:user@gmail.com)**
* Password: **123456**

---

## 🔐 Roles & Permissions

### Admin

* View all users
* Create users
* Edit users
* Deactivate users

### Manager

* View users
* Edit users (restricted)

### User

* View dashboard
* View own profile only

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt / bcryptjs

---

## 📁 Project Structure

```bash
PurpleMeritAssessment/
│
├── backend/
│   ├── backend/        # Express backend (API server)
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   └── package.json
│   │
│   └── frontend/       # React frontend (Vite + Tailwind)
│       ├── src/
│       ├── public/
│       └── package.json
```

---

## ⚠️ Project Structure Note

The project is organized inside a single `backend` directory which contains both:

* `backend/` → Node.js + Express API
* `frontend/` → React application

This structure was used for development convenience.
For deployment, the backend and frontend were deployed separately.

---

## ⚙️ Environment Variables

### Backend (.env)

Create file:

```
backend/backend/.env
```

Add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### Frontend (.env)

Create file:

```
backend/frontend/.env
```

Add:

```
VITE_API_BASE_URL=https://purplemeritassessment-backend-production.up.railway.app/api
```

For local development:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 How to Run Locally

### 1. Clone Repository

```
git clone https://github.com/ZaidKhan26/PurpleMeritAssessment.git
cd PurpleMeritAssessment
```

---

### 2. Run Backend

```
cd backend/backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

### 3. Run Frontend

Open a new terminal:

```
cd backend/frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## 🧪 How to Test

### Admin Flow

* Login as admin
* View dashboard
* Manage users (create, edit, deactivate)

### Manager Flow

* Login as manager
* Edit allowed users

### User Flow

* Login as user
* View profile
* Restricted access to admin features

---

## 🔌 API Endpoints

### Auth

* POST `/api/auth/login`
* POST `/api/auth/register`
* GET `/api/auth/me`

### Users

* GET `/api/users`
* GET `/api/users/:id`
* POST `/api/users`
* PATCH `/api/users/:id`
* PATCH `/api/users/:id/deactivate`

---

## 🚀 Deployment

### Frontend (Vercel)

https://purple-merit-assessment-psi.vercel.app

### Backend (Railway)

https://purplemeritassessment-backend-production.up.railway.app/api

---

## 📹 Demo Video

👉 https://drive.google.com/file/d/16sSCpPzZXubG2zZe3a965wxGU5ulWahE/view?usp=drive_web

---

## ⚠️ Note

If backend root URL shows "Cannot GET /", it is normal.
Use `/api` routes to interact with the backend.

---

## 👨‍💻 Author

Zaid Khan
GitHub: https://github.com/ZaidKhan26
