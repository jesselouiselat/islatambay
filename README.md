# Islatambay Freediving

This is a Freediving Resort Website that has hero, amenities, and packages section. It also has an integrated AI chatbot and an admin dashboard for the site's contents.

## Live app

[Islatambay Freediving](https://islatambay.vercel.app/)

## Table of Contents

- [Islatambay Freediving](#islatambay-freediving)
  - [Live app](#live-app)
  - [Table of Contents](#table-of-contents)
    - [Screenshots](#screenshots)
    - [Tech Stack](#tech-stack)
    - [Features](#features)
    - [Folder Structure](#folder-structure)
  - [](#)
    - [How to Run Locally](#how-to-run-locally)
    - [Authentication \& Admin](#authentication--admin)
    - [AI Chatbot Integration](#ai-chatbot-integration)
    - [Deployment Details](#deployment-details)
    - [About the Developer](#about-the-developer)
    - [License](#license)

---

### Screenshots

![Hero](./screenshots/screenshot%201.PNG)
![Ammenities](./screenshots/screenshot%202.PNG)
![About](./screenshots/screenshot%203.PNG)
![Chatbot](./screenshots/screenshot%204.PNG)
![Sign in](./screenshots/screenshot%205.PNG)
![AI Prompts](./screenshots/screenshot%206.PNG)
![Admin List](./screenshots/screenshot%207.PNG)

---

### Tech Stack

- Frontend
  - React
  - Vite
  - Bootsrap
- Backend
  - Node.js
  - Express.js
  - PostgresSQL (via Supabase)
  - Multer + Cloudinary
  - Google OAuth (Passport.js)
- Auth and Security
  - Passport (Local & Google)
  - bcrypt
  - express-session
- Dev Tools and Hosting
  - Vercel (Hosting)
  - Render (Backend)
  - Supabase (DB)
  - Cloudinary (Images)
  - Uptime Robot
- AI Integration
  - Google Gemini (Gen AI Flash 2.5)

---

### Features

- Each section includes an admin-only upload form for managing content.
  - Hero Section - shows clips and pictures of dives
  - Amenities Section - shows the resort's facilities
  - Packages Section - shows the freediving packages they offer.
- AI Chatbot - answers user's queries
- Admin Dashboard - the page where an admin can add AI prompts, promote, and remove admins.
- Includes an embedded TikTok feed for social proof and engagement.
- Contact section has icons of the resort's social media.

---

### Folder Structure

## <!-- dont make this just put all the components inside the components folder -->

### How to Run Locally

1. Clone the repo

```bash
git clone https://github.com/jesselouiselat/islatambay.git
```

2. Go into the folder

```bash
cd islatambay
```

3. Install the dependencies

```bash
npm install
```

4. Add values to the env variables

5. Go to the backend folder

```bash
cd backend_islatambay
```

6. Run the backend

```bash
npm start
```

7. Go to the frontend folder

```bash
cd frontend_islatambay
```

8. Run the frontend

```bash
npm run dev
```

---

### Authentication & Admin

- It uses Google's OAuth 2.0
- The admin dashboard is accessible via the login page (hidden from public navigation).

```bash
https://islatambay.vercel.app/login
```

---

### AI Chatbot Integration

- It uses Gemini's free 2.5 flash.
- The data from the database serves as the prompts.
- Prompts can also be added in the admin dashboard.

---

### Deployment Details

It uses free hosting, cloud storage, database, and monitoring service.

- Render - for backend
- Vercel - for frontend
- Cloudinary - for image storage
- Supabase - for database
- UptimeRobot - to keep the free Render awake.

---

---

### About the Developer

Hi! I'm Jesse Louise Lat — a self-taught full-stack web developer with a degree in Electronics Engineering. I built this project to practice full-stack development from frontend (React) to backend (Express + Supabase) while solving a real need for a freediving resort.

[GitHub](https://github.com/jesselouiselat) • [Email](mailto:your@email.com)

### License

This project is open-sourced under the [MIT License](./LICENSE).
