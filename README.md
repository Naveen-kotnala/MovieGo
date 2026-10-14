# 🎬 MovieGo — Movie Ticket Booking Platform

MovieGo is a full-stack movie ticket booking web application built using **React.js, Node.js, Express.js, and MongoDB**. It provides users with a seamless experience to discover movies, explore showtimes, select seats, and complete the booking flow.

## 🌐 Live Demo

- **Live Website:** [MovieGo](https://movie-go-bice.vercel.app/)
- **GitHub Repository:** [View Source Code](https://github.com/Naveen-kotnala/MovieGo)

## ✨ Features

- 🎥 **Movie Discovery:** Browse movies and explore detailed movie information.
- 🔐 **User Authentication:** User registration and login functionality.
- 🏢 **Cinema & Showtimes:** Explore cinemas, available dates, and show timings.
- 💺 **Interactive Seat Selection:** Choose seats for your preferred show.
- 🎟️ **Booking Flow:** Proceed through the booking process and view booking confirmation.
- 📱 **Responsive Interface:** User-friendly interface for different screen sizes.
- 🗄️ **Database Integration:** Store and retrieve application data using MongoDB.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- RESTful APIs
- JWT Authentication

**Database & Deployment**
- MongoDB Atlas
- Vercel — Frontend Hosting
- Render — Backend Hosting

## 🏗️ Application Architecture

```text
User
  │
  ▼
React.js Frontend
  │
  ▼
Express.js REST APIs
  │
  ▼
Node.js Backend
  │
  ▼
MongoDB Atlas
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js and npm
- MongoDB Atlas account or a MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Naveen-kotnala/MovieGo.git
cd MovieGo
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and add the environment variables required by your application:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SECRET=your_app_secret
TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

### 3. Run the Backend

```bash
npm start
```

### 4. Run the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed in the terminal.

## 🔒 Security

- Store credentials and API tokens in environment variables.
- Keep `.env` files out of version control.
- Never publish database credentials or private API tokens.

## 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 👨‍💻 Author

**Naveen Kotnala**

- GitHub: [Naveen-kotnala](https://github.com/Naveen-kotnala)
- Live Project: [MovieGo](https://movie-go-bice.vercel.app/)

---

*MovieGo — Discover movies. Select your seats. Enjoy the show.*
