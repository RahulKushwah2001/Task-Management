# 🚀 Task Management (Full Stack)

A production-ready full-stack task management application built with:

* ⚡ FastAPI (Backend)
* 🐘 PostgreSQL (Database)
* ⚛️ React + Tailwind CSS (Frontend)

---

## ✨ Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication

### 📁 Projects

* Create, view, delete projects
* Each user sees only their projects
* Project status (active / completed)

### 📋 Tasks

* Create, update, delete tasks
* Drag & drop task board (Kanban style)
* Status: Todo / In-Progress / Done
* Due date support
* Filter tasks by status

### 🎨 UI/UX

* Modern responsive UI
* Toast notifications
* Loading states
* Modal forms

---

## 🛠️ Tech Stack

| Layer       | Technology        |
| ----------- | ----------------- |
| Backend     | FastAPI           |
| Database    | PostgreSQL        |
| Frontend    | React             |
| Styling     | Tailwind CSS      |
| Drag & Drop | @hello-pangea/dnd |

---

## ⚙️ Setup Instructions

---

### 🔹 1. Clone Repository

```bash
git clone https://github.com/RahulKushwah2001/Task-Management.git
cd Task-Management
```

---

## 🧩 Backend Setup

---

### 📂 Navigate:

```bash
cd backend
```

---

### 🟢 Create virtual env:

```bash
python -m venv venv
venv\Scripts\activate
```

---

### 🟢 Install dependencies:

```bash
pip install -r requirements.txt
```

---

### 🟢 Configure `.env`

Create `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/taskdb
SECRET_KEY=your_secret_key
```

---

### 🟢 Run server:

```bash
uvicorn app.main:app --reload
```

---

### 🌐 API Docs:

```
http://127.0.0.1:8000/docs
```

---

## 🎨 Frontend Setup

---

### 📂 Navigate:

```bash
cd frontend
```

---

### 🟢 Install:

```bash
npm install
```

---

### 🟢 Run:

```bash
npm start
```

---

### 🌐 App:

```
http://localhost:3000
```

---

## ⚠️ Known Limitations

* No pagination for projects/tasks
* No advanced search
* No role-based access control
* Minimal validation (frontend)

---

## 🚀 Future Improvements

* Add Redux/Zustand state management
* Add unit tests (Jest / Pytest)
* Add pagination & search
* Deploy on cloud (Vercel + Render)

---

## 👨‍💻 Developer

Built by Rahul Kushwah
