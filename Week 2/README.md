# Week 2 API — Build & Deploy Your API

A small Express app fulfilling the Week 2 assignment.

## Routes

| Method | Path        | Description                                      |
|--------|-------------|---------------------------------------------------|
| GET    | `/`         | Serves a static HTML page ("My Week 2 API!")      |
| GET    | `/api`      | Returns `"My Week 2 API!"` as plain text          |
| POST   | `/user`     | Body: `{ "name": "...", "email": "..." }` → `"Hello, [name]!"` (400 if missing) |
| GET    | `/user/:id` | Returns `"User [id] profile"`                     |

## Features

- JSON body parsing via `express.json()`
- Error handling: 400 for missing `name`/`email` on `POST /user`, 404 for unknown routes, 500 handler for uncaught errors
- `.env` support for `PORT` (via `dotenv`)
- Custom middleware that logs every request's method, path, and timestamp
- Static HTML page served from `/public`

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Server runs at `http://localhost:3000` by default (or whatever `PORT` you set).

## Testing

**With curl:**

```bash
curl http://localhost:3000/api

curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Kayode","email":"kayode@example.com"}'

curl http://localhost:3000/user/42

# Missing field -> 400
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Kayode"}'
```

**With Postman:** import the three routes above, set `Content-Type: application/json` on the `POST /user` request, and send a JSON body with `name` and `email`.

## Version control (Git + GitHub)

```bash
git init
git add .
git commit -m "Week 2: Express API with routes, error handling, and middleware"
git branch -M main
git remote add origin https://github.com/<your-username>/week2-node-express.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username and create the empty repo `week2-node-express` on GitHub first (or use `gh repo create`).

## Deployment

This app works as-is on **Railway** or **PythonAnywhere-equivalents for Node** (Railway is the more natural fit for Node/Express):

1. Push the repo to GitHub (see above).
2. On Railway: New Project → Deploy from GitHub repo → select this repo.
3. Set the `PORT` environment variable if Railway doesn't inject one automatically (Railway usually provides `PORT` itself — the app already reads `process.env.PORT`, so no code changes needed).
4. Deploy, then submit the live URL and/or the GitHub repo link.
