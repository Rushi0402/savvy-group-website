# Savvy Group Website

Next.js website and Express API for Savvy Group. The project includes the
public marketing website, contact/newsletter flows, and a protected admin
panel at `/admin`.

## Getting Started

Install and run the frontend:

```bash
npm install
npm run dev
```

In another terminal, install and run the API:

```bash
cd backend
npm install
npx prisma migrate deploy
npx prisma generate
npm run dev
```

Copy `backend/.env.example` to `backend/.env` and configure the database,
email account, frontend URL, and admin credentials. The
`ADMIN_SESSION_SECRET` must be at least 32 random characters.

Configure the frontend API address in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Open:

- Website: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`

## Admin features

- Signed HTTP-only admin sessions
- Dashboard metrics and recent enquiries
- Search and status management for enquiries
- Newsletter subscriber management
- Login attempt throttling
