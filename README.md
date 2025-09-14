# Next-Events

This repository contains the code for Next-Events, a web application to list events.

It's a part of the _Beginning Next.js Development_ book

## Project Coding Journey

Here’s a summary of the coding journey for the `next-events` project:

### Project Timeline & Milestones

1. **Initialization (Feb 2, 2024)**
   - Project initialized with basic setup.

2. **Early UI & Routing (Feb 2–5, 2024)**
   - Added DaisyUI for styling.
   - Implemented routing and navigation.
   - Differentiated server and client components.

3. **Server Actions & User Features (Feb 6–7, 2024)**
   - Introduced server actions.
   - Built user sign-up process.

4. **Authentication (Feb 8–12, 2024)**
   - Integrated NextAuth for authentication.
   - Added authentication flows and user profile update section.

5. **Image Uploads (Feb 13, 2024)**
   - Integrated Uploadthing for image uploads.

6. **Event Management (Feb 13–16, 2024)**
   - Created, updated, deleted, and displayed events.
   - Added event search functionality.

7. **Final Touches (Feb 16, 2024)**
   - Added metadata and fixed build errors.

### Coding Journey Summary

- The project progressed in clear chapters, each focusing on a specific feature or improvement.
- Started with foundational setup, UI, and navigation.
- Gradually added user management, authentication, and profile features.
- Enhanced with image uploads and robust event CRUD operations.
- Finalized with search, metadata, and build fixes.

This commit history reflects a structured, chapter-based learning or development approach, likely following a tutorial or course, with each step building on the previous one.

## Getting Started

First, run `npm install` to install the dependencies:

```sh
npm install
```

This application uses MongoDB, so please create a `.env` file in the project root folder and add your MongoDB connection string to it.

You can copy and rename the `.env.sample` file added in this project.

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
