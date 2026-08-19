# FYPMS — Final Year Project Management System

Web app for coordinating undergraduate final year projects. Coordinators manage students, supervisors, allocations, deadlines, and an archive of past projects. Students submit titles, proposals, and chapters; supervisors review and approve work and chat with their supervisees.

Live demo: [https://fypms-project.vercel.app/](https://fypms-project.vercel.app/)

## What it does

Three roles share one app with different dashboards:

| Role | Responsibilities |
| --- | --- |
| **Coordinator** | Register students and supervisors (including CSV bulk upload), allocate students to supervisors, set deadlines, maintain the past-projects archive |
| **Supervisor** | Review project titles and chapters, leave comments, approve submissions, message assigned students |
| **Student** | Propose a title (with document upload), upload chapters, track deadlines, browse past projects, message their supervisor |

Core data (users, projects, allocations, deadlines, past projects) lives in **MongoDB** via Prisma. File uploads (proposals and chapters) go to **EdgeStore**. Real-time student–supervisor chat uses **Convex**. Sign-in is **NextAuth** credentials (matric or staff ID plus password).

New student and supervisor accounts are created with a hashed password of the user’s **last name in lowercase**. Login ID is the matric number (students) or staff ID (supervisors).

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Prisma + MongoDB
- NextAuth.js (credentials)
- EdgeStore (file uploads)
- Convex (chat)

## Prerequisites

- Node.js 18 or later
- npm
- A [MongoDB](https://www.mongodb.com/) database (Atlas or local)
- An [EdgeStore](https://edgestore.dev/) account
- A [Convex](https://www.convex.dev/) account (free tier is enough)

## Setup

1. Clone the repo and enter this app directory:

```bash
git clone <repo-url>
cd fypms
```

2. Install dependencies (this also runs `prisma generate`):

```bash
npm install
```

3. Create a `.env` file in this directory (same folder as `package.json`). Copy the keys below and fill in real values.

4. Push the Prisma schema to MongoDB:

```bash
npx prisma db push
```

5. Create a coordinator in MongoDB (there is no UI for this). Insert a `User` document with `role: "COORDINATOR"`, a unique `name` (login ID), and `passwordHashed` from bcrypt (10 rounds). Example using Node:

```bash
node -e "require('bcryptjs').hash('your-password', 10).then(console.log)"
```

Then insert a document similar to:

```json
{
  "name": "coordinator1",
  "passwordHashed": "<bcrypt hash from above>",
  "firstName": "Project",
  "lastName": "Coordinator",
  "role": "COORDINATOR"
}
```

6. Start Convex (writes `NEXT_PUBLIC_CONVEX_URL` / `CONVEX_DEPLOYMENT` into `.env.local` on first run):

```bash
npx convex dev
```

Leave this running. In a second terminal, start the Next.js app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with the coordinator ID and password.

## Environment variables

Put these in `.env` (or `.env.local`). Never commit this file.

```env
# MongoDB connection string used by Prisma
# Atlas example: mongodb+srv://USER:PASSWORD@cluster.mongodb.net/fypms?retryWrites=true&w=majority
DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/fypms?retryWrites=true&w=majority"

# NextAuth (required in production; generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="replace-with-a-long-random-string"
NEXTAUTH_URL="http://localhost:3000"

# EdgeStore — from https://edgestore.dev/ dashboard
EDGE_STORE_ACCESS_KEY="your-edgestore-access-key"
EDGE_STORE_SECRET_KEY="your-edgestore-secret-key"

# Convex — usually filled in by `npx convex dev`
# Deployment name, e.g. enigmatic-capybara-123
CONVEX_DEPLOYMENT="your-convex-deployment-name"
# Cloud URL shown in the Convex dashboard, e.g. https://xxxxx.convex.cloud
NEXT_PUBLIC_CONVEX_URL="https://your-deployment.convex.cloud"
```

| Variable | Used for |
| --- | --- |
| `DATABASE_URL` | Prisma → MongoDB |
| `NEXTAUTH_SECRET` | Signing auth cookies/JWTs |
| `NEXTAUTH_URL` | Canonical app URL for NextAuth |
| `EDGE_STORE_ACCESS_KEY` / `EDGE_STORE_SECRET_KEY` | Proposal and chapter uploads |
| `CONVEX_DEPLOYMENT` | Convex CLI / backend |
| `NEXT_PUBLIC_CONVEX_URL` | Browser client for chat |

## Scripts

```bash
npm run dev      # Next.js development server
npm run build    # Production build
npm start        # Serve the production build
npm run lint     # ESLint
npx convex dev   # Convex functions + generated client (needed for chat)
npx prisma studio
```

## Production

Set the same environment variables on the host. Point `NEXTAUTH_URL` at the public origin (for example `https://your-domain.com`). Deploy Convex with `npx convex deploy` and use the production `NEXT_PUBLIC_CONVEX_URL`.

## Future improvements

Ideas that would make the system more complete for a department-wide rollout:

**Accounts and access**
- Coordinator signup (or invite) in the UI, instead of inserting a MongoDB document by hand
- Students and supervisors can change their password; optional email reset instead of the default last-name password
- Extra roles such as head of department or external examiner, with read-only or viva-only views
- Session timeout and optional two-factor authentication for staff

**Workflow**
- Coordinator (second) approval of titles — the data model already has `approvedByCoordinator`
- Structured chapter feedback (not only a tick to approve) and a revision history per upload
- Marks, rubrics, and a final grade sheet exportable to CSV or PDF
- Student–supervisor preference lists and conflict-of-interest checks during allocation, instead of CGPA shuffle alone
- Deadline reminders by email or in-app notification when a date is approaching or overdue
- Downloadable CSV templates for students, supervisors, and past projects

**Communication and archive**
- File attachments and read receipts in chat
- Coordinator broadcast messages (for example “chapter 1 is due Friday”)
- Richer past-project records: abstract text, keywords, department, and a public browse page for current students
- Automatic add-to-archive when the abstract is approved (partially started; make it reliable and editable)

**Operations**
- Activity log (who approved, deleted, or reallocated what)
- Department or session (academic year) scoping so old cohorts stay archived
- Fill out the empty Settings page (session year, default chapter list, logo)
- Automated tests and a seed script for demo users

## More docs

- [User manual](docs/user-manual.md)
- [Installation notes](docs/INSTALLATION.md) (some older notes still mention PostgreSQL; this app uses **MongoDB**)
