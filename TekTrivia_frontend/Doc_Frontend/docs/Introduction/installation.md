---
id: installation
title: Installation
sidebar_position: 2
---

# Installation Guide – TekTrivia Frontend

This guide will help you set up the **TekTrivia** frontend locally. The project uses **React**, **Tailwind CSS**, and **Vite** as its build tool.

---

## Prerequisites

Ensure that you have the following tools installed on your machine:

- **Node.js** (v20.17.0 or later):[https://nodejs.org](https://nodejs.org)
- **npm** (10.8.2 or later)
- A code editor like **VS Code**

---

## Installation Steps

Follow the steps below to get TekTrivia frontend up and running.

1. Clone the repository to your local machine:
    ```bash
    git clone git@github.com:HubEpitechBenin/TekTrivia.git
    cd TekTrivia/TekTrivia_frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

Now, you can open the app at `http://localhost:5173`.


## Install Dependencies

```bash
The Frontend uses the following main dependencies:

├── react@19.1.0
├── react-dom@19.1.0
├── react-router-dom@7.5.3
├── tailwindcss@3.4.17
├── vite@6.3.5
├── autoprefixer@10.4.21
├── postcss@8.5.3

# Dev & tooling
├── @vitejs/plugin-react@4.4.1
├── @eslint/js@9.26.0
├── eslint@9.26.0
├── eslint-plugin-react-hooks@5.2.0
├── eslint-plugin-react-refresh@0.4.20
├── @types/react@19.1.3
├── @types/react-dom@19.1.3
├── react-icons@5.5.0
├── globals@16.0.0
```

You can view this list in the requirements.txt file located in the project root:

```bash
cat requirements.txt
```

## Tailwind CSS Configuration

Tailwind CSS is already configured in the project. Below are the key configuration files:

- **tailwind.config.js**: This is where the core configuration for Tailwind can be customized (e.g., colors, spacing, fonts).
- **postcss.config.js**: This file sets up PostCSS with Tailwind as a plugin for processing CSS.
- **index.css**: The global stylesheet where Tailwind's base styles, components, and utilities are included using `@tailwind` directives.

If you need to customize or extend Tailwind's styles, you can modify the configuration in the `tailwind.config.js` file.

For detailed instructions on how to customize Tailwind CSS for this project, refer to the [Tailwind CSS Configuration Guide](./Tailwindcss_Configuration.md).
