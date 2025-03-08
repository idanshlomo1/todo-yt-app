# Task Manager App

A full-stack task management application built with Next.js, Prisma, and NextAuth.

## Features

- User authentication (sign up, login, logout)
- Task management (create, read, update, delete)
- Protected routes with middleware
- Responsive design with Shadcn UI

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Install required packages for authentication:

```bash
npm install bcrypt @auth/prisma-adapter
```

4. Set up your environment variables in `.env`:

```
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components
- `/prisma` - Prisma schema and migrations
- `/actions` - Server actions for data operations
- `/lib` - Utility functions and shared code
- `middleware.ts` - Route protection and authentication checks

## Authentication Flow

The application uses NextAuth.js for authentication with the following features:

- Credential-based authentication (email/password)
- Protected routes with middleware
- JWT-based sessions
- Server-side session validation

The middleware (`middleware.ts`) ensures that:
- Unauthenticated users cannot access `/app` routes
- Authenticated users are redirected to the app when trying to access auth pages
- API routes remain accessible for both authenticated and unauthenticated users

## Technologies Used

- Next.js 14
- React 18
- Prisma ORM
- NextAuth.js
- Tailwind CSS
- Shadcn UI
- TypeScript

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
