---
id: SignUpForm
title: SignUpForm.jsx
---

# SignUpForm Component

The SignUpForm component manages user registration. It provides input fields to create a new user account and communicates with the backend to store the new user credentials.

---

## Purpose

This component enables users to:

- Enter details to create a new account (e.g., `name`, `email`, `password`).
- Submit this data to the backend.
- Get redirected or shown a success message upon successful registration.
- Receive and display validation errors if registration fails.

---

## Props

| Prop     | Type    | Description                                  |
|----------|---------|----------------------------------------------|
| isActive | boolean | Determines the position/visibility of the form container |

---

## State Variables

```jsx
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
```

### State Management

The component uses the following local states:

- `email`: stores the user's email
- `password`: stores the user's password
- `confirmPassword`: stores the confirmation of the user's password to ensure both match
- `error`: holds error messages received from the backend in case of validation or submission failures

---

## Backend Integration

### Fonction d’envoi (`onSubmit`)

This is how the form works:

```jsx
const onSubmit = (e) => {
  e.preventDefault();
  const data = {
    email,
    password,
    confirmPassword
  };
  // Send to API
};
```
The handleSubmit function is responsible for handling the backend request, error handling, and redirection.

---

## UI Elements

The form contains:

- Sign Up title

- A Microsoft logo

- Fields for email, password, and confirm password

- A submit button

- A privacy policy or terms of service agreement checkbox or link

## Styling

Tailwind CSS is used for styling with:

- Smooth transitions

- Rounded layout

- Color palette aligned with the application's theme

## File Location 🗂️ `src/pages/Login/components/` folder

```
src/pages/Login/components/SignUpForm.jsx
```

