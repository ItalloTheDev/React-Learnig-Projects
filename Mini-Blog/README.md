# Mini Blog 📝

This is a simple and functional blog project built with **React**, created as part of my learning journey. It includes essential features such as post creation, dynamic routing, and search functionality — all styled with CSS modules.

## 🚀 Features

- 🧠 React Hooks (useState, useEffect, useContext, etc.)
- 🔗 React Router for navigation and dynamic routes
- 🔐 Firebase for authentication and data storage
- 💾 Create, read, and delete posts
- 🔍 Search posts by title
- 👨‍👩‍👧‍👦 User authentication (signup/login)
- 🎨 Scoped styles using CSS Modules

## 📷 Preview

![Mini Blog Preview](https://user-images.githubusercontent.com/your-screenshot-url.png)

## 🛠️ Technologies

- React
- React Router
- Firebase (Authentication + Firestore)
- CSS Modules

## 📁 Project Structure

Mini-Blog/
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # App pages (Home, Dashboard, etc.)
│ ├── context/ # Auth context
│ ├── firebase/ # Firebase config
│ ├── styles/ # CSS Modules
│ ├── App.js
│ └── main.jsx
└── README.md

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/ItalloTheDev/React-Learning-Projects.git
   cd React-Learning-Projects/Mini-Blog

   ```

2. **Install dependencies**
   npm install

3. **Configure Firebase**

- Go to Firebase Console
- Create a new project
- Enable Email/Password authentication
- Create a Firestore database
- Replace the Firebase configuration in src/firebase/config.js with your project credentials

4. **Run the project**
   npm run dev

Made with 💙 by @ItalloTheDev
