# 🚀 TaskFlow - Smart Task Manager

A modern, full-stack **Task Management Web Application** built with **Node.js, Express, and MongoDB**. Designed as a **Final Year BCA Project**, TaskFlow features a professional SaaS-style dashboard, secure authentication, gamification system, and a fully responsive UI with Dark Mode.

![Last Commit](https://img.shields.io/badge/Last%20Commit-2026--03--20-blue?style=for-the-badge)
![Repo Size](https://img.shields.io/badge/Repo%20Size-~33.4 MB -orange?style=for-the-badge)
[![Stars](https://img.shields.io/github/stars/Vishwajeetsrk/TaskFlow.svg?style=for-the-badge)](https://github.com/Vishwajeetsrk/TaskFlow/stargazers)
[![Forks](https://img.shields.io/github/forks/Vishwajeetsrk/TaskFlow.svg?style=for-the-badge)](https://github.com/Vishwajeetsrk/TaskFlow/network/members)

---

## 📖 Table of Contents
- ✨ Features  
- 🛠 Tech Stack  
- 💻 Requirements  
- ⚙️ Installation & Setup  
- 📁 Project Structure  
- 🔐 Environment Variables  
- 👨‍💻 Author  
- 📄 License  

---

## ✨ Features

- 🔐 **Authentication**  
  Secure Signup, Login, and Logout with password encryption using **bcrypt**

- ✅ **Task Management**  
  Full CRUD operations (Create, Read, Update, Delete)

- 🔍 **Smart Filtering**  
  Filter tasks by **Status, Priority, Category** + Global Search

- 🎯 **Gamification System**  
  Earn **10 points** for every completed task and track progress

- 🤖 **AI Suggestions (Mock)**  
  Smart task recommendations based on activity

- 👤 **Profile Management**  
  Update name, bio, password & upload profile picture

- 📱 **Responsive Design**  
  Fully optimized for Desktop, Tablet, and Mobile

- 🌙 **Dark Mode**  
  Toggle between Light and Dark themes

---

## 🛠 Tech Stack

### 🌐 Frontend
- EJS (Templating Engine)
- Bootstrap 5
- Font Awesome

### ⚙️ Backend
- Node.js
- Express.js
- Express Session
- Method Override

### 🗄 Database
- MongoDB
- Mongoose

---

## 💻 Requirements

### 1. Software
- Node.js (v14 or higher) → https://nodejs.org  
- MongoDB (Local / Atlas) → https://www.mongodb.com  
- Git → https://git-scm.com  
- VS Code (Recommended) → https://code.visualstudio.com  

### 2. VS Code Extensions (Recommended)
- ES7+ React/Redux Snippets  
- EJS Language Support  
- MongoDB for VS Code  
- GitLens  

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Vishwajeetsrk/TaskFlow.git
```
2️⃣ Navigate to Project Folder
```bash
cd TaskFlow
```
3️⃣ Install Dependencies
```bash
npm install
```
4️⃣ Configure Environment Variables
Create a .env file in the root directory and add:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskflow_db
SESSION_SECRET=mySecretKey123
```
5️⃣ Start the Server
```bash
npm start
```
6️⃣ Open in Browser
```bash
http://localhost:3000
```


### 📁 Project Structure
```bash
TaskFlow/
│
├── server.js
├── package.json
├── .env
├── .gitignore
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
│
└── views/
    ├── login.ejs
    ├── signup.ejs
    ├── dashboard.ejs
    ├── tasks.ejs
    ├── profile.ejs
    ├── settings.ejs
    ├── about.ejs
    └── contact.ejs
```
    

🔐 Environment Variables
| Variable       | Description                       | Example                               |
| -------------- | --------------------------------- | ------------------------------------- |
| PORT           | App running port                  | 3000                                  |
| MONGODB_URI    | MongoDB connection string         | mongodb://localhost:27017/taskflow_db |
| SESSION_SECRET | Secret key for session encryption | mySecretKey123                        |

👨‍💻 Author

Vishwajeet
🎓 BCA Student

GitHub: https://github.com/Vishwajeetsrk
Email: Vishwajeet@sadc.edu.in

📄 License

This project is licensed under the MIT License.

⭐ Support

If you like this project, give it a ⭐ on GitHub!




