# User & Admin Authentication with Role-Based Access (Node.js + Express + MongoDB)

A simple, beginner-friendly authentication system implementing:

- User registration
- Login using JWT
- Role-based access control
- Separate dashboards for Admin and User
- Pre-seeded Admin account and sample users/tasks
- Task ownership via userId
- Front-end: React + Vite (minimal front-end)
- Back-end: Node.js + Express + MongoDB (Mongoose)

---

## Features

### Authentication
- Register new users (name, email, password)
- Passwords hashed with bcrypt
- Login returns a JWT which includes the user's role

### Role-Based Access
- Admin dashboard: view all tasks
- User dashboard: view only tasks assigned to the logged-in user

### Tasks
- Tasks are pre-seeded on server start (seed scripts)
- Each task belongs to a user via `userId`

### Tech Stack
- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth: JWT + bcrypt
- Frontend: React + Vite (the repo includes a React SPA)

---

## Project Structure (important files/dirs)
```
d:\Project\HVA\Fullstack
│
├── back-end/
│   └── src/
│       ├── server.js             # starts server & runs seed scripts
│       ├── app.js                # express app and routes
│       ├── config/database.js    # DB connection (uses DATABASE_URL)
│       ├── controllers/
│       │   ├── authController.js
│       │   └── taskController.js
│       ├── middleware/
│       │   └── auth.js           # JWT verification + attach user
│       ├── models/
│       │   ├── User.js
│       │   └── Task.js
│       └── seed/                 # admin, users, tasks seeding
│
├── front-end/                    # React + Vite SPA
│   └── src/
│
└── Readme.md                     # this file
```

---

## Installation & Setup

### Clone repository
```bash
git clone <repo-link>
cd d:\Project\HVA\Fullstack
```

### Back-end setup
```bash
cd back-end
npm install
```

Create a `.env` file in back-end root with:

```env
PORT=5000
DATABASE_URL=<your-mongo-connection-string>
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

The server automatically runs seed scripts (admin, users, tasks) on start.

Start dev server:
```bash
npm run dev
# or in production:
npm start
```

API will be available at http://localhost:<PORT>/api

### Front-end (brief)
```bash
cd front-end
npm install
npm run dev
```
The React app runs via Vite (usually http://localhost:5173). No further front-end explanation provided here.

---

## Seeding & Default Credentials

The back-end seeds an admin user and sample users/tasks on server start (see back-end/src/seed).

Admin credential:
- Email: admin@hyperverge.co
- Password: admin123

User credential:
- Email: john@example.com
- Email: jane@example.com'
- Email: bob@example.com

- Password: password123

Sample users are created by seed scripts (check back-end/src/seed for details).

---

## API Endpoints

All endpoints are prefixed with /api on the backend.

- POST /api/auth/register
  - Body: { name, email, password }
  - Registers a new user, returns token + user data

- POST /api/auth/login
  - Body: { email, password }
  - Returns JWT token and user info

- GET /api/tasks
  - Headers: Authorization: Bearer <token>
  - Admin: returns all tasks (populates user info)
  - User: returns tasks assigned to the logged-in user

- POST /api/tasks
  - Headers: Authorization: Bearer <token>
  - Body: { title, description, status? }
  - Creates task owned by authenticated user

Health/check:
- GET /api/health

Notes:
- Responses follow shape: { success: boolean, message: string, data: ... }
- Client should send Authorization header as: Authorization: Bearer <token>

---

## Example Flows

Login:
1. POST /api/auth/login → receive token
2. Store token client-side (localStorage in this project: key `hv_token`)
3. Use token for /api/tasks requests:
   Authorization: Bearer <token>

Role redirects (front-end):
- After login the SPA redirects users to `/admin` or `/user` based on the role in token.

---

## Deployment / Render note

If you deploy the back-end or front-end to Render (or similar), the live links may take a short time to "wake up" after being idle. If a deployed URL is slow or initially unresponsive, wait ~30–60 seconds and retry.

Key Render config:
- Ensure `PORT` and `DATABASE_URL` (or MONGO_URI) and `JWT_SECRET` are set in the service environment.
- Server listens on process.env.PORT (see back-end/src/server.js).

---

