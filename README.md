# 🎯 TekTrivia: Learn Through Play

> _What if learning became as easy as playing?_

TekTrivia is a dynamic quiz platform that promotes **active learning through competitive quizzing**, grounded in the **KYT-CAT** methodology. With powerful AI integration, it allows users to quickly generate quizzes based on text, URLs, or documents — transforming passive content into interactive challenges.

---

## 📌 Table of Contents

- [🔍 Project Description](#-project-description)
- [🛠️ Technologies Used](#️-technologies-used)
- [📡 API Documentation](#-api-documentation)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [👤 Project Owners & Roles](#-project-owners--roles)
- [🎬 Demo](#-demo)
- [📃 License](#-license)

---

## 🔍 Project Description

TekTrivia is designed to make **learning more engaging, faster, and personalized**. By leveraging **OpenAI's GPT models**, the platform creates quizzes on-the-fly from:

- Free-form text inputs
- Web URLs
- Uploaded documents (PDF, DOCX, etc.)

This is ideal for students, teachers, trainers, and anyone seeking **AI-powered knowledge checks**.

---

## 🛠️ Technologies Used

### 🎨 Frontend
- **React.js** — Declarative UI framework
- **Tailwind CSS** — Utility-first CSS framework

### ⚙️ Backend
- **Django (REST Framework)** — Robust API backend
- **drf-spectacular** — OpenAPI 3 documentation

### 🤖 AI Integration
- **OpenAI / ChatGPT APIs** — Used for dynamic quiz generation

---

## 📡 API Documentation

Explore the available endpoints via the live Swagger UI:

👉 [API Docs](http://57.129.78.229:8080/api/schema/swagger-ui/)

---

## 📁 Project Structure

TekTrivia/
├── doc_backend/
├── doc_frontend/
├── env/
├── LICENSE
├── README.md
├── TekTrivia_backend/ # Django backend project
│ ├── Achievements/
│ ├── Blog/
│ ├── core/
│ ├── doc/
│ ├── Leaderboards/
│ ├── Notifications/
│ ├── Quizzes/
│ ├── SimpleQuiz/
│ ├── TekTrivia/
│ ├── Users/
│ ├── manage.py
│ ├── requirements.txt
│ ├── schema.yml
│ └── urls.py
├── TekTrivia_frontend/ # React frontend project
│ ├── eslint.config.js
│ ├── Images/
│ ├── index.html
│ ├── logos/
│ ├── package.json
│ ├── postcss.config.js
│ ├── public/
│ ├── progress_patriko.md
│ ├── src/
│ ├── tailwind.config.js
│ ├── vite.config.js
│ └── README.md


---

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.9+
- Node.js 18+
- pip / venv
- PostgreSQL (optional)

---

### 🧪 Backend Setup

```bash
cd TekTrivia_backend

# Create and activate virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver 0.0.0.0:8080
```

### 💻 Frontend Setup

```bash
cd TekTrivia_frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev

Frontend will be available at: http://localhost:5173
```

## 👤 Project Owners & Roles

| Name                     | Role                         |
|--------------------------|------------------------------|
| **Ronnel DASSI**         | Project Lead, Backend Dev    |
| **Aïmane ALASSANE**      | Backend Dev                  |
| **Patriko DAGBE**        | Frontend Dev, UX             |
| **Jean Baptiste VIOSSI** | Frontend Dev, UX             |

*Feel free to fork or contribute!*

## 🎬 Demo

Live demo screenshots will help users visualize the product.

### 🔹 AI Quiz from URL
![AI Quiz from URL](public/screenshots/quiz-from-url.png)

### 🔹 Text-based Quiz Generator
![Text-based Quiz Generator](public/screenshots/quiz-from-text.png)

### 🔹 Leaderboards
![Leaderboards](public/screenshots/leaderboard.png)

> 📝 *Replace the image paths with actual screenshots or hosted image URLs.*

## 📃 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for the full text.

> 🔥 **TekTrivia reimagines learning. One question at a time.**
