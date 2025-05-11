---
id: login
title: Login Page
---

# Login Page

## Fonctionality

The Login Page allows users to log into the application. It consists of two main forms:

- Sign-Up Form (SignUpForm)

- Sign-In Form (SignInForm)

These forms are rendered within a dynamic container where users can switch between them.

![SignInForm Page ScreenShoot](/img/SignInForm.png)
![SignUpForm Page ScreenShoot](/img/SignUpForm.png)

## Components Structure

The Login page is structured with several React components that work together. Below is an overview of each component and its purpose.

### 1. **Login Component**

The `Login` component is the main wrapper that sets up the layout of the page. It uses the `useState` hook to manage the `isActive` state, which controls the active form (sign-in or sign-up).

```jsx
import React, { useState } from "react";
...

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen bg-pm-blue600">
      <Container isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}

export default Login;
```

### *Key Features*

- ***State Management:*** The isActive state is used to toggle between the Sign-In and Sign-Up forms.

- ***Layout:***  The page is centered using Tailwind CSS classes (flex, justify-center, items-center).
  
### 2. **Container Component**

The Container component is responsible for rendering the entire structure of the login page. It includes the forms, toggle buttons, and transition panels. It also handles the dynamic rendering of the SignInForm and SignUpForm based on the isActive state.

```jsx
const Container = ({isActive, setIsActive}) => {
  return (
    <div className="relative w-[850px] h-[500px] bg-white rounded-[30px] overflow-hidden transition-all duration-500">
      <SignInForm isActive={isActive} />
      <SignUpForm isActive={isActive} />
      <ToggleBox isActive={isActive} />
      <TogglePanelLeft isActive={isActive} setIsActive={setIsActive} />
      <TogglePanelRight isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}
```

### *Key Features*

- ***Dynamic Forms:*** It conditionally renders the SignInForm and SignUpForm based on the isActive state.

- ***Styling:*** The bg-white and rounded corners create a sleek container for the login forms.

- ***Transition Effects:*** The transition-all and duration-500 classes enable smooth transitions when toggling forms.
  


### 3. [**SignInForm Component**](../Components/SignInForm.md)

The SignInForm component handles user authentication. It contains the necessary fields for email and password input. Upon submission, it sends an authentication request to the backend.

click on this link to see the SignInForm component [*SignInForm Component*](../Components/SignInForm.md)

### 4. [**SignUpForm Component**](../Components/SignUpForm.md)

The SignUpForm component handles user registration. It includes fields for email, username, password, and confirm password. The form sends the user data to the backend for account creation.

click on this link to see the SignInForm component [*SignUpForm Component*](../Components/SignUpForm.md)

### 5. [**ToggleBox Component**](../Components/ToggleBox.md)

The ToggleBox component is used to toggle between the Sign-In and Sign-Up forms. It listens for user interaction and adjusts the isActive state to switch the form view.

click on this link to see the ToggleBox component [*ToggleBox Component*](../Components/ToggleBox.md)

### 6. [**TogglePanelLeft and TogglePanelRight Components**](../Components/TogglePanel.md)

TogglePanelLeft and TogglePanelRight Components

These panels are responsible for handling the sliding effect when switching between the Sign-In and Sign-Up forms. They will animate based on the isActive state to provide a smooth visual transition.

click on this link to see the ToggleBox component [*TogglePanelLeft and TogglePanelRight Components*](../Components/TogglePanel.md)












