
# 💬 DevConnect – Developer Social Platform

A full-stack social media platform for developers to connect, collaborate, and grow. Built using the MERN stack with a clean, responsive UI.

## 🌐 Live Demo
🔗 [https://dev-connect-kappa-five.vercel.app](https://dev-connect-kappa-five.vercel.app)

---

## 📸 Screenshots

### 🔐 Authentication
![Login Screenshot](client/public/screenshots/login.png)

### 🧑‍💻 Developer Profile
![Profile Screenshot](client/public/screenshots/profile.png)

### 📝 Posts & Feed
![Feed Screenshot](client/public/screenshots/feed.png)

> ⚠️ *Replace image paths with your actual screenshots or links to hosted images.*

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- bcrypt.js (Password Hashing)
- CORS, dotenv

**Deployment:**
- Frontend: Vercel
- Backend: Render

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register, login with JWT
  - Secure password hashing

- 👤 **Developer Profiles**
  - Add skills, bio, GitHub, LinkedIn, etc.

- 📝 **Interactive Posts**
  - Create/delete posts
  - Like and comment system

- 📱 **Responsive Design**
  - Clean UI for desktop and mobile

- 🔎 **Explore Dev Community**
  - View and engage with other devs' profiles

---

## ⚙️ Getting Started

### 🧩 Prerequisites
- Node.js
- npm
- MongoDB (Local or Atlas)

---

### 📦 Installation

```bash
git clone https://github.com/yourusername/devconnect.git
cd devconnect
```

#### 🔧 Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend:
```bash
npm run start
```

---

#### 🎨 Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## 📁 Folder Structure

```
devconnect/
├── client/       # React + Tailwind Frontend
│   └── src/
├── server/       # Express + MongoDB Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
└── README.md
```

---

## 🔮 Future Enhancements
- Direct messaging
- Notifications
- Follow/unfollow system
- Profile pictures

---

## 🙋‍♂️ About Me

**[Your Name]**  
📧 Open to Full-Stack Developer roles  
🔗 [LinkedIn](https://linkedin.com/in/yourusername)  
💻 [GitHub](https://github.com/yourusername)

---

## 📜 License

Licensed under the [MIT License](LICENSE).

