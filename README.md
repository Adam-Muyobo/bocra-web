# BOCRA Web Portal

BOCRA Web Portal is a Next.js frontend for a digital regulatory services platform for the Botswana Communications Regulatory Authority. It includes a public-facing website, a self-service citizen/operator portal, and an admin workspace for BOCRA teams.

## What the project includes

- Public pages for BOCRA information, news, and tenders
- User portal flows for licensing, spectrum, domains, QoS, complaints, tenders, and documents
- Admin views for license review, tender management, complaint triage, and user management
- Shared UI built with Tailwind CSS, Radix UI, shadcn-style primitives, Framer Motion, and React Query

## Frontend stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 3
- Radix UI and custom UI primitives in `src/components/ui`
- Framer Motion for animation
- Vitest and Playwright for testing scaffolding

## Project structure

```text
app/                     Next.js routes and layouts
src/components/          Shared layouts, navigation, chat, and UI components
src/views/               Existing page-level React views reused by the app router
src/assets/              Local images
src/lib/                 Utilities and router compatibility helpers
src/index.css            Global styles and design tokens
```

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start the Next.js dev server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks
- `npm run test` - run Vitest tests
- `npm run test:watch` - run Vitest in watch mode

## Backend architecture

This repository is the frontend application only.

The planned backend will be a separate Spring Boot service backed by MySQL and enhanced with Spring AI. A practical production architecture for this project would include:

- Spring Boot REST APIs for authentication, licensing, complaints, tenders, domains, spectrum, and document services
- Spring Security for authentication, authorization, and role-based access to portal and admin features
- MySQL for transactional data such as users, applications, complaints, tenders, and audit history
- Spring AI for the BOCRA AI assistant, retrieval-backed guidance, multilingual support, and workflow assistance
- File/document storage for attachments, templates, and public downloads
- API integration between this Next.js frontend and the Spring Boot backend via `NEXT_PUBLIC_API_BASE_URL`

## Current status

The frontend is a high-fidelity prototype with mocked data and UI-driven flows. Authentication, persistence, external integrations, and the Spring Boot API are not implemented in this repo yet.
