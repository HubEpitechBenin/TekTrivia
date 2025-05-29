---
id: Togglebox
title: ToggleBox.jsx
sidebar_position: 5
---

# ToggleBox Component

The `ToggleBox` component is a **pure visual transition element** used in the login page to enhance the switching effect between **Sign-In** and **Sign-Up** forms. It acts as a **moving circular background element** that animates based on the `isActive` state.

---

## Props

| Prop      | Type    | Description                                                  |
|-----------|---------|--------------------------------------------------------------|
| `isActive` | Boolean | Determines whether the Sign-Up form is active (`true`) or Sign-In (`false`). Controls the animation direction. |

---

## Usage Example

```jsx
import ToggleBox from './ToggleBox';

<ToggleBox isActive={isActive} />
```

## Logic & Animation

The visual effect is achieved using Tailwind CSS classes with conditional logic on isActive. It makes a large rounded panel slide from right to left or vice versa depending on the active form.

```jsx
const ToggleBox = ({isActive}) => {
  return (
    <div className="absolute w-full h-full">
      <div className={`absolute w-[300%] right-[-250%] h-full bg-pm-blue rounded-[150px] z-0 transition-all duration-700 ease-in-out ${isActive ? 'right-[50%]' : ''}`}></div>
    </div>
  )
}
```

## Key Visual Mechanics

- `w-[300%] right-[-250%]` creates a large circular panel initially off-screen.
- When `isActive` is `true`, `right-[50%]` shifts the panel to the center.
- `transition-all duration-700 ease-in-out` makes the movement smooth and visually appealing.
- `bg-pm-blue` defines the background color for the animation.

## Style Breakdown (Tailwind)

| Class      | Purpose                                |
|-----------|-----------------------------------------|
| `absolute` | Positions element relative to parent   |
|`w-[300%] / right-[-250%]`| Large off-screen panel setup |
| `rounded-[150px]` | Fully rounded panel (circle/oval) |
| `transition-all duration-700 ease-in-out` | Smooth animation |
| `z-0` | Ensures it's behind interactive elements |

---

Built ✨ by @PatriceDAGBE.