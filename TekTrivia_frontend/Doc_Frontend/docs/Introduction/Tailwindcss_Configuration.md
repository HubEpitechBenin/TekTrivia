---
id: tailwind_config
title: Tailwind CSS Configuration Guide
---

# Tailwind CSS Configuration Guide

This file provides details on how the **Tailwind CSS** configuration is structured in the project.

## Dark Mode

The project has **dark mode** enabled with the `darkMode` setting configured as `class`. This means you can use the `dark` class to apply dark theme styles. The dark mode can be toggled by adding or removing the `dark` class on the root element of the application.

```javascript
darkMode: 'class',
```

To activate dark mode, add the dark class to the root element of the document or any parent element as shown below:

```html
<html class="dark">
  <!-- Your content -->
</html>
```

## Custom Colors

The theme has been customized to include a set of brand colors using the extend feature in the tailwind.config.js. These colors are available for use in your project as utility classes.

Here are the custom colors defined in the configuration:

```javascript
colors: {
  pm: {
    blue:           '#093F68', // Main blue color
    blue300:        '#4D83AC', // Blue color with 300 opacity (second blue color)
    blue600:        '#11324A', // Dark Blue color with 600 opacity (third blue color)
    blueHover:      '#1d6397', // Blue Hover color for buttons
    r10:            '#1A1F26',
    r12:            '#0D1117',
    rBorder:        '#3D444D',
    rBlack:         '#010409',
    light:          '#e0e5ec', // Light color for backgrounds
  },
},
```

### How to use custom colors

You can now use these custom colors as Tailwind CSS utility classes in your HTML and JSX files. For example:

```html
<div class="bg-pm-blue text-white">
  This div has a blue background and white text.
</div>

<button class="hover:bg-pm-blueHover">
  Hover over me to see the hover effect.
</button>
```

### Font Family

The default font family for the application has been customized to use Inter for the body text.

```javascript
fontFamily: {
  body: ['Inter', 'sans-serif'],
},
```
To apply this font, the default body text will automatically use the Inter font family.

#### Extend Font Family

To extend or customize the fontFamily, you can add your fonts to the extend object inside the theme section of tailwind.config.js.

Exemple:

```javascript
export default {
  theme: {
    extend: {
      fontFamily: {
        // Adding a custom font to the project
        body: ['Inter', 'sans-serif'],
        heading: ['Roboto', 'sans-serif'],
      },
    },
  },
}
```

- Here, body and heading are custom keys added to the fontFamily configuration. The "Inter" font is used as the body font, and "Roboto" is used for headings.
  
To use this in your HTML/JSX:

```html
<p class="font-body">This text uses the Inter font.</p>
<h1 class="font-heading">This text uses the Roboto font.</h1>
```





