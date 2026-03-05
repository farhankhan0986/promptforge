<div align="center">

# ⚒️ PromptForge

**AI-Powered Prompt Generator & Manager**

Transform rough ideas into production-grade AI prompts. Craft, refine, save, and organize — all in one place.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-FF6B35?style=flat-square)](https://groq.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://promptforge-blush.vercel.app)

[Live Demo](https://promptforge-blush.vercel.app) · [Report Bug](https://github.com/farhankhan0986/promptforge/issues) · [Request Feature](https://github.com/farhankhan0986/promptforge/issues)

</div>

---

## 📖 About

**PromptForge** is a full-stack web application that helps you engineer better AI prompts. Paste in a rough idea or concept, and PromptForge uses the **Groq API** (powered by LLaMA 3.3 70B) to transform it into a meticulously crafted, production-grade prompt — complete with role assignments, structured instructions, constraints, and output formatting.

Beyond generation, PromptForge lets you **save**, **organize by category and tags**, **search**, and **analyze** your prompt library through an elegant editorial-style dashboard.

### Why PromptForge?

- 🎯 **Better Prompts** — Transforms vague ideas into structured, high-performance prompts
- 📁 **Organized Library** — Save prompts with categories and tags for easy retrieval
- 📊 **Analytics Dashboard** — Visualize your prompt usage with category & tag breakdowns
- 🔒 **Secure & Personal** — JWT-based auth ensures your prompts stay private
- ⚡ **Blazing Fast** — Powered by Groq's ultra-fast inference engine

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Prompt Generation** | Transform rough ideas into production-grade prompts using LLaMA 3.3 70B via Groq |
| 💾 **Save & Organize** | Store prompts with custom titles, categories, and comma-separated tags |
| 🔍 **Full-Text Search** | Instantly search across titles, categories, tags, and prompt content |
| 📊 **Analytics Dashboard** | Bar charts for category distribution, top tags breakdown, and recent prompts |
| 🔐 **User Authentication** | Secure registration & login with bcrypt password hashing and JWT tokens |
| ⚙️ **Account Management** | Change password, delete all prompts, or delete your account |
| 📱 **Responsive Design** | Editorial-style UI that works beautifully on desktop and mobile |
| 📋 **Copy to Clipboard** | One-click copy for generated prompts |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| [React 19](https://react.dev) | UI library |
| [Vite 7](https://vite.dev) | Build tool & dev server |
| [React Router 7](https://reactrouter.com) | Client-side routing |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Recharts](https://recharts.org) | Data visualization (dashboard charts) |
| [Lucide React](https://lucide.dev) | Icon library |
| [Sonner](https://sonner.emilkowal.dev) | Toast notifications |
| [Axios](https://axios-http.com) | HTTP client |

### Backend

| Technology | Purpose |
|-----------|---------|
| [Node.js](https://nodejs.org) | Runtime environment |
| [Express 5](https://expressjs.com) | Web framework |
| [PostgreSQL](https://www.postgresql.org) | Relational database |
| [pg](https://node-postgres.com) | PostgreSQL client for Node.js |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password hashing |
| [JSON Web Tokens](https://jwt.io) | Authentication |
| [Groq API](https://groq.com) | AI prompt generation (LLaMA 3.3 70B) |

---

## 📁 Project Structure

```
promptforge/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   ├── components/
│   │   ├── ChatArea.jsx
│   │   └── PromptCard.jsx
│   │   ├── context/
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Chats.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── promptController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── promptRoutes.js
│   ├── utils/
│   │   └── groq.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** database (local or hosted, e.g., [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app))
- **Groq API Key** — Get one free at [console.groq.com](https://console.groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/farhankhan0986/promptforge.git
cd promptforge
```

### 2. Set Up the Database

Create the required tables in your PostgreSQL database:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    improved_prompt TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
DATABASE_URL=postgresql://username:password@host:5432/database_name
JWT_SECRET=your_super_secret_jwt_key
GROQ_API_KEY=gsk_your_groq_api_key_here
PORT=5000
```

Start the backend server:

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

### 4. Configure the Frontend

```bash
cd ../client
npm install
```

> **Note:** The frontend API base URL is configured in `client/src/services/api.js`. Update it to point to your backend server if needed (defaults to your deployed backend or `http://localhost:5000/api`).

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Reference

All API endpoints require JWT authentication (via `Authorization: Bearer <token>` header) unless noted otherwise.

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login & receive JWT token | ❌ |
| GET | `/api/auth/me` | Get current user profile | ✅ |
| PUT | `/api/auth/change-password` | Change password | ✅ |
| DELETE | `/api/auth/delete` | Delete user account | ✅ |

### Prompts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/prompts/generate` | Generate an improved prompt via AI | ✅ |
| POST | `/api/prompts` | Save a prompt | ✅ |
| GET | `/api/prompts` | Get all saved prompts for the user | ✅ |
| DELETE | `/api/prompts/:id` | Delete a specific prompt | ✅ |
| DELETE | `/api/prompts` | Delete all prompts for the user | ✅ |

#### Example: Generate a Prompt

```bash
curl -X POST http://localhost:5000/api/prompts/generate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": "Write a blog post about machine learning"}'
```

---

## 🌐 Deployment

### Frontend (Vercel)

The frontend is configured for Vercel deployment with `client/vercel.json` for SPA routing:

- Connect your GitHub repo to Vercel  
- Set the Root Directory to `client`  
- Vite will auto-detect the build settings  
- Deploy  

### Backend (Render / Railway / Any Node.js Host)

- Set the Root Directory to `server`
- Set Build Command to `npm install`
- Set Start Command to `node server.js`
- Configure the environment variables (`DATABASE_URL`, `JWT_SECRET`, `GROQ_API_KEY`)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

---

## 📄 License

This project is open source and available under the ISC License.

---

## 👤 Author

Name: Farhan Abid


Email: farhankhan080304@gmail.com 

GitHub: `@farhankhan0986`


<div align="center">
If you found this project helpful, please consider giving it a ⭐
</div>
