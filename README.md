# Spending Tracker
A non-account system that tracks and generate data insights about your spending.

## Cloning Project:
- Clone this repository `git clone https://github.com/khianvictorycalderon/Spending-Tracker.git`

## Backend Setup:
1. `cd backend`
2. `npm install` to install dependencies.
3. `npm run dev` to test the backend.

## Frontend Setup:
1. `cd frontend`
2. `npm install` to install dependencies.
3. `npm run dev` to test the frontend.

## Previews

![Preview 1](preview1.png)

---

## Dependencies & Configuration
The following is a list of installed dependencies and configuration settings used in this project.
You don’t need to install anything manually, as all dependencies are already managed through `package.json`.
This section is provided for reference only, to give you insight into how the project was set up.

---

## Backend Dependencies
- `npm install express mongoose cors dotenv`
- `npm install --save-dev nodemon`

## Backend Configuration Dependencies
- Update `package.json`:
  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  ```

---

## Frontend Dependencies
- `npm install tailwindcss @tailwindcss/vite`

## Frontend Configuration Dependencies
- Update `vite.config.ts`:
  ```ts
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      tailwindcss(),
    ],
  })
  ```