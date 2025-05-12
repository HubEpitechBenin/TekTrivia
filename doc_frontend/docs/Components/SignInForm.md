---
id: SignInForm
title: SignInForm.jsx
---

# SignInForm Component

The `SignInForm` component is a React component responsible for handling user sign-in in the application.

It renders a login form and communicates with the backend API to authenticate users.

```jsx
const SignInForm = ({isActive}) => {
  return (*
    <div className={`absolute ${isActive ? '-left-1/2' : 'left-0'} w-1/2 h-full flex flex-col items-center justify-center text-gray-800 px-10 z-10 transition-all duration-700 ease-in-out`}>
      <!-- Sign-in form fields here -->
    </div>
  )
}
```

---

## Features

- **Email & Password Inputs:** Inputs are handled using React `useState`.
- **Icons:** Includes email and password icons via Boxicons.
- **Form Submission:** Submits the form with user credentials to a backend endpoint.
- **Error Handling:** Displays any authentication errors.
- **Redirection:** Navigates to the dashboard on successful login.

---

## Props

| Prop     | Type    | Description                                  |
|----------|---------|----------------------------------------------|
| isActive | boolean | Determines the position/visibility of the form container |

---

## State Variables

```js
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
```

### State Management

The component uses the following local states:

- `email`: stores the user's email
- `password`: stores the user's password
- `error`: stores error message from backend response

---

## Backend Integration

### Fonction d’envoi (`onSubmit`)

This is how the form works:

```js
const onSubmit = (e) => {
  e.preventDefault();

  const data = {
    email: email,
    password: password,
  };

  handleSubmit("http://localhost:8000/login/", data, setError, (res) => {
    if (res.error) {
      setError(res.error);
    } else {
      navigate("/dashboard");
    }
  });
};
```
This function prevents the default form behavior, builds the payload, and calls the handleSubmit utility to authenticate the user.

---

## UI Elements

The form contains:

- A "Sign In" title

- A Microsoft logo

- An email input field with an icon

- A password input field with an icon

- A "Forgot your password?" link

- A "SIGN IN" button

- A privacy policy notice

## Styling

Tailwind CSS is used for styling with:

- Smooth transitions

- Rounded corners

- Custom theme colors like bg-pm-blue

## File Location 🗂️ `src/pages/Login/components/` folder

```
src/pages/Login/components/SignInForm.jsx
```

