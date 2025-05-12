---
id: intro
title: Commencer
sidebar_position: 1
---

# Commencer

Bienvenue dans la documentation de l’**interface frontend de TekTrivia**.  
Ce projet frontend a été développé en utilisant **React** et **Tailwind CSS**. Il sert d’interface utilisateur pour une application de quiz technologique, permettant aux utilisateurs de s'inscrire, se connecter, et participer à des quiz et activités liés à la technologie.

---

## Objectifs

L'objectif principal de **TekTrivia** est de :

- Offrir une interface fluide et réactive pour accéder aux fonctionnalités de l'application (authentification, navigation, quiz, etc.)
- Gérer les connexions avec le backend de manière claire et efficace via des requêtes HTTP sécurisées.
- Fournir une base solide pour développer d'autres fonctionnalités interactives (quiz, scores, classements…).

---

## Pile technologique

Le frontend de TekTrivia utilise :

- **React** : pour une gestion efficace des composants.
- **Tailwind CSS** : pour un style rapide et réactif.
- **React Router** : pour la navigation interne entre les pages.
- **Fetch API** : pour envoyer des requêtes HTTP vers le backend (connexion, inscription, etc.).

---

## 🗂️ Structure du dossier `src`

```plaintext
src/
├── pages/
│   ├── login/              # Page de connexion/inscription
│   │   └── components/     # Composants uniquement utilisés par la page login/signup
│   ├── home/               # Page d'accueil utilisateur après connexion
│   │   └── components/     # Composants uniquement utilisés par la page d'accueil       
│   └── ranking/            # Classement des utilisateurs
│       └── components/     # Composants uniquement utilisés par la page de classement
├── components/             # Composants partagés (logo, chargeur, bouton…)
├── assets/                 # Images et icônes
├── utils/                  # Fonctions utilitaires (ex : handleSubmit.js)
├── App.jsx                 # Configuration des routes
└── main.jsx                # Point d’entrée de l'application
```

```md
Pour commencer avec le frontend, suivez le [guide d'installation](./installation).