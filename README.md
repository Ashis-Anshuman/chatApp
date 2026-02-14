# 💬 Real-Time Chat Application

A full-stack real-time chat application built using the MERN stack and Socket.IO.  
This application supports authentication, OTP verification, real-time messaging, and online user tracking with a modern responsive UI.

---

## 🚀 Features

- 🔐 Authentication (Signup / Login / Logout)
- 📩 Email OTP Verification
- 👤 Profile Update
- 💬 Real-Time Messaging with Socket.IO
- 🟢 Online Users Indicator
- 📱 Responsive Layout (Mobile + Desktop)
- ⚡ Zustand for State Management
- 🔔 Toast Notifications

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Zustand
- Axios
- Socket.IO Client
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Cron Jobs (for background tasks)
- Email Service Integration

---

## 📂 Project Structure

```
CHATAPP/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controller/
│   │   ├── cron/
│   │   ├── email/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routers/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── sore/
│   │   ├── App.css/
│   │   ├── App.jsx/
│   │   ├── index.css/
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── README.md
│
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ashis-Anshuman/chatApp.git
cd chatApp
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
In the backend there is a example.env.text file rename it to .env and change the values
```

Run backend:

```bash
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔄 Real-Time Communication

Socket.IO is used for:

- Instant message delivery
- Online user tracking
- Real-time updates without refreshing

---

## 🔐 Authentication Flow

1. User Signup
2. Email OTP Verification
3. JWT Token Issued
4. Secure API Requests with Cookies
5. Socket Connection After Authentication

---

## 🌍 Deployment (Suggested)

- Backend → Render / Railway
- Frontend → Vercel / Netlify
- Database → MongoDB Atlas

---

## 📌 Future Improvements

- Typing Indicator
- Message Seen Status
- Group Chat
- File Upload Support
- Message Reactions
- Push Notifications

---

## 👨‍💻 Author

Ashis Anshuman Sahoo 
GitHub: https://github.com/Ashis-Anshuman/
