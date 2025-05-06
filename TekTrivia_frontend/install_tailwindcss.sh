#!/bin/bash

echo "🚀 Début de l'installation de Tailwind CSS..."

# 1. Initialiser le projet si package.json n'existe pas
if [ ! -f "package.json" ]; then
  echo "📦 Initialisation de npm..."
  npm init -y
fi

# 2. Supprimer les caches pour être sûr
echo "🧹 Nettoyage des fichiers..."
rm -rf node_modules package-lock.json
npm cache clean --force

# 3. Installer Tailwind CSS et ses dépendances
echo "📥 Installation de Tailwind CSS, PostCSS et Autoprefixer..."
npm install tailwindcss @tailwindcss/vite

echo "🎉 Installation réussie !"
