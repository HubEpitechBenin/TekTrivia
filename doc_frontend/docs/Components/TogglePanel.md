---
id: Togglepanel
title: TogglePanel.jsx
sidebar_position: 6
---

# TogglePanelLeft & TogglePanelRight Components

The `TogglePanelLeft` and `TogglePanelRight` components are part of the **Login Page UI transition system**.  
They serve as **interactive overlay panels** that guide the user between the **Sign-In** and **Sign-Up** forms with animations and call-to-action buttons.

---

## Props

| Prop         | Type     | Description                                                                 |
|--------------|----------|-----------------------------------------------------------------------------|
| `isActive`   | Boolean  | Controls the state of the form displayed. Determines which panel is active. |
| `setIsActive`| Function | Function to toggle the active form view (Sign-In ⇄ Sign-Up).                |

---

## Usage Example

```jsx
<TogglePanelLeft isActive={isActive} setIsActive={setIsActive} />
<TogglePanelRight isActive={isActive} setIsActive={setIsActive} />
```

## TogglePanelLeft Component

This panel is shown when the Sign-In form is active and encourages the user to create an account.

```jsx
const TogglePanelLeft = ({isActive, setIsActive}) => {
  return (
    <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-10 transition-all duration-900 ease-in-out ${isActive ? 'left-[-250%]': 'right-0 '}`}>
      <h1 className="text-3xl font-semibold mb-2">Hello, Welcome!</h1>
      <p className="mb-4">Don't have an account?</p>
      <button onClick={() => setIsActive(true)} className="w-40 h-11 border-2 border-white text-white rounded-lg cursor-pointer ">Register</button>
    </div>
  )
}
```

---

## TogglePanelRight Component

This panel is shown when the Sign-Up form is active and invites the user to log into their existing account.

```jsx
const TogglePanelRight = ({isActive, setIsActive}) => {
  return (
    <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-10 transition-all duration-900 ease-in-out ${isActive ? 'left-0 delay-150': '-left-1/2'}`}>
      <h1 className="text-3xl font-semibold mb-2">Welcome Back!</h1>
      <p className="mb-4">Already have an account?</p>
      <button onClick={() => setIsActive(false)} className="w-40 h-11 border-2 border-white text-white rounded-lg cursor-pointer">Login</button>
    </div>
  )
}
```

## UI & Animation Details

| Tailwind CSS Class                       | Description                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| `absolute`                     | Positions the panels absolutely within the container                        |
| `w-1/2`                         | Panel takes up half the width of the container                             |
| `h-full`                        | Panel has full height                                                       |
| `flex`                          | Enables Flexbox layout                                                      |
| `justify-center`               | Horizontally centers content                                                |
| `items-center`                 | Vertically centers content                                                  |
| `text-white`                   | Sets text color to white                                                    |
| `z-10`                          | Gives a high stacking priority (z-index)                                   |
| `transition-all`               | Animates all applicable CSS properties                                     |
| `duration-900`                 | Sets the animation duration to 900ms                                        |
| `ease-in-out`                  | Applies smooth animation with acceleration and deceleration                 |
| `left-[-250%]` / `right-0`     | Positions the panel left or right depending on `isActive` state            |
| `-left-1/2`                    | Shifts the panel 50% to the left                                            |
| `delay-150`                    | Adds a 150ms delay to the animation                                         |
| `w-40` / `h-11`                | Width and height of the buttons                                             |
| `border-2 border-white`       | Adds a white border with 2px thickness                                      |
| `rounded-lg`                   | Applies large rounded corners to the buttons                                |
| `cursor-pointer`               | Shows a pointer cursor when hovering over buttons                           |
