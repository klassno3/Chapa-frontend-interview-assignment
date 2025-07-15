# Chapa-frontend-interview-assignment

##  Role-Based Dashboard Application

👤 **Built by:** Betelhem Kirub

## 🔗 Live Demo
👉 [View Live Demo] (https://chapa-frontend-interview-assignment-nine.vercel.app/).


<img width="1506" height="927" alt="image" src="https://github.com/user-attachments/assets/fbd6550c-8d5c-4d99-bfff-ab0fbf06486f" />
<img width="1522" height="933" alt="image" src="https://github.com/user-attachments/assets/9466f577-4ffb-4bf6-8208-3d735aa0b40f" />



## 👥 Test Users (For Evaluation)

| Role          | Email               | Password    |
|---------------|---------------------|-------------|
| User          | `user@gmail.com`    | `user1234`  |
| Admin         | `admin@gmail.com`   | `admin1234` |
| Super Admin   | `super@gmail.com`   | `super1234` |

 These users are hardcoded and can be used to test login, redirection, and access restrictions.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Forms:** React Hook Form
- **Validation:** Zod
- **Charts:** Chart.js
- **Icons:** React Icons

## 🧰 Tools & Libraries Used

- ✅ **Next.js App Router** – for file-based routing and layouts
- ✅ **Server Actions** – for handling login and secure cookie logic
- ✅ **Middleware** – for access control based on user role
- ✅ **Context API + localStorage** – for client-side role management
- ✅ **Custom Error Pages** – for 403 (unauthorized) and 404 (not found)
- ✅ **Zod + React Hook Form** – for typed, validated form handling
- ✅ **Chart.js** – for simple admin/super-admin dashboard visuals


## ✨ Features

- 🔐 **Mock Authentication**
  - Uses a fake user list with 3 role types
  - Validates credentials server-side
  - Stores role in an `HttpOnly` cookie

- 🔁 **Role-Based Redirection**
  - After login, users go to their role-specific route: `/user`, `/admin`, or `/super`
  - Already-logged-in users who go to `/login` are redirected

- 🚦 **Route Protection via Middleware**
  - Checks the `role` cookie on all protected routes
  - Redirects unauthenticated users to `/login`
  - Redirects users trying to access another role’s route to `/403`

- ✅ **Logout**
  - Removes role from both localStorage and cookies
  - Redirects safely to `/login`

- 📊 **Per-Role Dashboards**
  - `/user`: add and view transaction and view wallet summary
  - `/admin`: view & manage users
  - `/super`: manage admins and summary

## 🛠️ How to Run

```bash
npm install
npm run dev
````

Then open: [http://localhost:3000](http://localhost:3000)
