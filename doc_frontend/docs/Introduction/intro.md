---
id: intro
title: Get Started
sidebar_position: 1
---

# Get Started

Welcome to the documentation of the **TekTrivia - Frontend Interface**.  
This frontend project has been developed using **React** and **Tailwind CSS**. It serves as the user interface for a technology quiz application, allowing users to sign up, log in, and participate in tech-related quizzes and activities.

---

## Objectives

The main goal of **TekTrivia** is to:

- Provide a smooth and responsive interface for accessing the app’s features (authentication, navigation, quizzes, etc.)
- Manage user-backend connections clearly and efficiently via secure HTTP requests.
- Provide a solid foundation for developing additional interactive features (quizzes, scoring, leaderboards…).

---

## Tech Stack

The TekTrivia frontend uses:

- **React**: for efficient component management.
- **Tailwind CSS**: for quick and responsive styling.
- **React Router**: for internal page routing.
- **Fetch API**: to send HTTP requests to the backend (login, register, etc.).

---

## 🗂️ `src` Folder Structure

```plaintext
src/
├── pages/
│   ├── login/              # Login/Signup page
|   |   └── components/     # components only used by Login/Signup page
│   ├── home/               # User homepage after login
|   |   └── components/     # components only used by home page       
│   └── ranking/            # User leaderboard
|       └── comonents/      # components only used by ranking page
├── components/             # Shared components (logo, loader, button...)
├── assets/                 # Images and icons
├── utils/                  # Utility functions (e.g., handleSubmit.js)
├── App.jsx                 # Route configuration
└── main.jsx                # App entry point
```

To get started with the frontend, follow the [Installation guide](./installation).