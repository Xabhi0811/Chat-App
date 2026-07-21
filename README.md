# Chat‑App


A real‑time chat application built with the MERN stack and Socket.IO, enabling seamless user‑to‑user messaging.

> Live demo: **chat-app.vercel.app** (if deployed)
> Repo folders: **Frontend/** and **Backend/**

---

## ✨ Features

* User signup and login with JWT authentication
* One‑to‑one real‑time chat via Socket.IO
* Persistent chat history stored in MongoDB
* Message timestamps and ordering
* Online status indicator (if implemented)
* Typing indicators (optional)
* Mobile‑responsive UI

> *Note:* Adjust this list to match your actual implementation.


---

## 🧱 Tech Stack

**Frontend**: React (Vite) + Tailwind CSS
**Backend**: Node.js, Express.js, Socket.IO
**Database**: MongoDB (Mongoose)
**Auth**: JWT
**Deployment**: Vercel (frontend), Render/Railway (backend)

---

## 📦 Project Structure

```
Chat-App/
├── Frontend/            # React client
│   ├── src/
│   ├── public/
│   └── package.json
└── Backend/             # Express + Socket.IO server
    ├── src/ or server.js
    ├── package.json
    └── .env (local only)
```

---

## ⚙️ Prerequisites

* Node.js LTS and npm/yarn
* MongoDB (local or Atlas)

---


## 🧪 Local Development

### 1) Clone and install

```bash
git clone https://github.com/Xabhi0811/Chat-App.git
cd Chat-App
```

#### Backend

```bash
cd Backend
npm install
```

Create **Backend/.env**:

```
```

Start backend:

```bash
npm run dev      # or: npm start
```

#### Frontend

```bash
cd ../Frontend
npm install
```

Create **Frontend/.env**:

```
```

Start frontend:

```bash
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔌 Environment Variables

**Backend**

* `PORT` – server port
* `MONGODB_URI` – MongoDB URI
* `JWT_SECRET` – JWT signing secret
* `CLIENT_URL` – allowed frontend origin

**Frontend** (Vite)

* `VITE_API_URL` – REST API base URL
* `VITE_SOCKET_URL` – WebSocket server URL

---

## 🚏 API (example skeleton)

**Auth**

* `POST /api/auth/signup` – register user
* `POST /api/auth/login` – login user
* `GET /api/auth/me` – current user profile

**Messages**

* `GET /api/messages/:chatId` – fetch chat history
* `POST /api/messages` – send message

---

## 🕸️ Socket Events (example)

**Client → Server**

* `join` {chatId, userId}
* `message:send` {chatId, text}

**Server → Client**

* `message:new` {message}
* `user:joined` {userId}

---

## 🧱 Production Deployment

**Frontend (Vercel)**

* Set `VITE_API_URL` and `VITE_SOCKET_URL` to backend URL

**Backend (Render/Railway/VPS)**

* Set `CLIENT_URL` to deployed frontend
* Enable WebSockets and configure CORS

**Database**

* Use MongoDB Atlas and set `MONGODB_URI`

---

## 🧰 Scripts (fill as per your package.json)

**Backend**

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

**Frontend**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## ✅ Checklist

* [ ] Add actual routes and socket events
* [ ] Confirm ports and env variable names
* [ ] Insert screenshots/GIF demos
* [ ] Add license info

---

## 📸 Screenshots

> Add UI screenshots or GIFs here.

---

## 📄 License

Specify your license (e.g., MIT). Create a `LICENSE` file.

---

## 🤝 Contributing

PRs are welcome! Please open an issue for major changes.

---

## 🙌 Acknowledgements

* Socket.IO for real‑time messaging
* MongoDB/Mongoose for database
* React + Tailwind for frontend
* Vercel/Render for deployment

---

## Troubleshooting

* **CORS errors**: Ensure `CLIENT_URL` matches frontend URL and CORS is enabled
* **WebSocket not connecting**: Check backend host supports sockets and correct URL is set
* **.env not working**: Verify `.env` file placement and naming

---

