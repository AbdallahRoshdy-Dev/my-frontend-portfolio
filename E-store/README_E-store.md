# E-Store – React E-Commerce Project

This project is part of my Frontend Development journey, focused on building a real-world e-commerce application using **React** and modern frontend tooling.

---

## 📌 Project Goal

Move beyond static HTML/CSS layouts into a full **React-based application** with routing, authentication, protected routes, lazy loading, and global state management — practicing the architecture patterns used in production-level frontend apps.

---

## 🧱 Key Features

- ✅ **Authentication system** — Login & Register pages with a global Auth Context
- ✅ **Form Validation** — built with **React Hook Form** + **Zod** for schema-based validation on Login/Register
- ✅ **Protected Routes** — restricts access to pages like Home & Products until the user is authenticated
- ✅ **Lazy Loading** — the Products page is code-split using `React.lazy` + `Suspense` with a custom Loader
- ✅ **Client-side Routing** — handled with `react-router-dom` (`createBrowserRouter`)
- ✅ **Toast Notifications** — using `react-hot-toast` for user feedback
- ✅ **Data Fetching & Caching** — powered by `@tanstack/react-query`
- ✅ **Image Carousel** — integrated with `slick-carousel`

---

## 🛠️ Technologies Used

- React (Vite)
- React Router DOM
- Tailwind CSS
- React Hook Form
- Zod (schema validation)
- React Query (`@tanstack/react-query`)
- React Hot Toast
- Slick Carousel
- Context API (Authentication)

---

## 📚 What I Practiced

Through this project, I practiced:

- Structuring a scalable React application (components, context, routing)
- Implementing protected/private routes based on auth state
- Building forms with **React Hook Form** and validating them with **Zod** schemas
- Code-splitting with `React.lazy` and `Suspense` for performance
- Managing global authentication state with Context API
- Styling with Tailwind CSS instead of plain CSS
- Handling async data with React Query
- Adding user feedback with toast notifications
- Working with custom fonts and a clean component-based folder structure

---

## 🚀 Live Preview

🔗 [Live Demo](#) *(update with your actual link)*

---

## 📁 Project Structure

```
E-store
│
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Products/
│   │   ├── ProtectedRoute/
│   │   └── Loader/
│   ├── context/
│   │   └── AuthContextProvider.jsx
│   ├── assets/
│   │   └── fonts/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
└── README.md
```

---

## 👨‍💻 Author

**Abdallah Roshdy**
Frontend Developer | React.js | Aspiring Web Developer

---

⭐ *This project represents a major step up in my journey — moving from static HTML/CSS pages into building real React applications with authentication, routing, and state management.*
