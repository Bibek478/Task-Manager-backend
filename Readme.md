# Task Manager (Fullstack)

Small task management demo with authentication and role-based dashboards (user & admin). This repository contains a React + Vite front-end and an Express + MongoDB back-end.

Features

- User registration and login (JWT)
- Role-based routes (user / admin)
- User and admin dashboards showing tasks
- Seed scripts to populate sample users, admin and tasks

Tech stack

- Front-end: React, Vite, Tailwind CSS
- Back-end: Node.js, Express, MongoDB (Mongoose)
- Auth: JWT
- Utilities: Axios

Quick start (front-end)

1. cd into front-end:
   - cd d:\Project\HVA\Fullstack\front-end
2. Install deps:
   - npm install
3. Run dev server:
   - npm run dev
4. The app runs at the Vite dev URL (usually http://localhost:5173)

Quick start (back-end)

1. cd into back-end:
   - cd d:\Project\HVA\Fullstack\back-end
2. Install deps:
   - npm install
3. Create a .env file with required variables (see below)
4. Start dev server:
   - npm run dev
5. API will be available on the PORT set in .env (default commonly 5000)

Environment variables (back-end)

- DATABASE_URL - MongoDB connection string
- PORT - server port (e.g. 5000)
- JWT_SECRET - secret for signing tokens
- JWT_EXPIRES_IN - token expiry (e.g. "7d")

Seeding

- The back-end seeds an admin, sample users and tasks on server start (see seed/*). Ensure your DB is reachable before starting the server.

Important API endpoints

- POST /api/auth/register  -> register (body: { name, email, password })
- POST /api/auth/login     -> login (body: { email, password }) — returns token
- GET  /api/tasks          -> get tasks (needs Authorization: Bearer <token>)
  - admin: returns all tasks (populates user)
  - user: returns tasks assigned to that user
- POST /api/tasks          -> create task (auth required)

Notes on tokens and client

- The front-end stores JWT in localStorage (key: hv_token) and sends it as `Authorization: Bearer <token>`.
- After login/register the app redirects based on user role (`/admin` or `/user`).

Live link

- If you deploy the front-end and back-end (for example on Render), the hosted services may take a short time to "wake up" after being idle. Live links can therefore take a little time to respond on first access — please wait a minute and retry if the site appears slow or unresponsive immediately after opening.

Troubleshooting

- CORS: Ensure the back-end allows requests from your front-end origin or enable CORS during local testing.
- DB errors: Confirm DATABASE_URL is correct and MongoDB is reachable.
- Seed issues: If no tasks/users appear, check logs during server start to confirm seed scripts ran successfully.
