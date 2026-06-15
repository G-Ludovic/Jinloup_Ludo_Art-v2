# 🎨 Jinloup Ludo Art — Plateforme Interactive pour Artiste Dessinateur

Bienvenue sur le dépôt de **Jinloup Ludo Art**, un projet de site web interactif dédié au dessin, avec **galerie, forum et espace membre**.
Ce projet a pour but de créer un véritable **espace communautaire et artistique**, moderne et responsive.

---

## 📑 Table des matières

- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Stack technique](#-stack-technique)
- [Architecture](#-architecture)
- [Démonstration](#-démonstration)
- [Prérequis](#-prérequis)
- [Installation et démarrage](#-installation-et-démarrage)
- [Scripts disponibles](#-scripts-disponibles)
- [Base de données](#-base-de-données)
- [Docker](#-docker)
- [Tests](#-tests)
- [Structure du projet](#-structure-du-projet)
- [Contribuer](#-contribuer)
- [Objectifs à long terme](#-objectifs-à-long-terme)
- [État du projet](#-état-du-projet)
- [Licence](#-licence)
- [Contact](#-contact)

---

## ✏️ Fonctionnalités principales

- 🖼️ **Galerie interactive**
  Publication et visualisation d'œuvres avec comments et interactions.

- 🧑‍🤝‍🧑 **Zone membre**
  Inscription, connexion sécurisée (JWT + argon2), profil utilisateur personnalisé.

- 👤 **Espace utilisateur personnalisé**
  Messagerie privée, biographie, inspirations, projets en cours et liens vers les réseaux sociaux.

- 💬 **Forum communautaire**
  Espace d'échange structuré par catégories, sujets et messages pour les artistes et passionnés de dessin.

- 📱 **Responsive Design**
  Compatible tous supports : PC et mobile.

---

## 🛠️ Stack technique

| Composant | Technologie | Détails |
|-----------|-------------|---------|
| **Frontend** | React 19 + TypeScript + Vite 6 | SPA avec React Router v7, react-toastify |
| **Backend** | Node.js + Express 4 | API REST avec TypeScript, tsx |
| **Base de données** | MySQL 8 | ORM : Knex (migrations, seeds) |
| **Authentification** | JWT + argon2 | Cookies + CORS |
| **Upload fichiers** | Multer | Images de dessins |
| **Tests** | Jest + Supertest | Tests d'intégration |
| **Linting** | Biome | Formatage et vérification de code |
| **Conteneurisation** | Docker + Docker Compose | Environnement reproductible |
| **CI / Hooks** | Commitlint + validate-branch-name | Conventions de commit et branches |
| **Langage** | TypeScript | Frontend et Backend |

---

## 🏗️ Architecture

Le projet est une **monorepo** gérée avec les **workspaces npm** :

```
jinloup-ludo-art/
├── client/          # Frontend React + TypeScript + Vite
├── server/          # Backend Express + TypeScript + Knex
├── bin/             # Scripts utilitaires
├── package.json     # Configuration root (monorepo)
├── docker-compose.yml
├── Dockerfile
└── ...
```

---

## 🎬 Démonstration

<video src="https://github.com/user-attachments/assets/e9e1b365-2b36-46aa-aad2-00c760dad499" controls width="720">
  Votre navigateur ne supporte pas la lecture vidéo.
</video>

---

## 📋 Prérequis

- **Node.js** >= 20
- **npm** >= 10
- **MySQL** >= 8.0 (ou Docker)
- (Optionnel) **Docker** et **Docker Compose**

---

## 🚀 Installation et démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/G-Ludovic/Jinloup_Ludo_Art-v2.git
cd Jinloup_Ludo_Art-v2
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier le fichier d'exemple et le renommer :

```bash
cp server/.env.sample server/.env
```

Puis éditer `server/.env` avec vos propres valeurs :

```env
APP_PORT=3310
APP_SECRET=votre_secret
DB_HOST=localhost
DB_PORT=3306
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=js_template_fullstack
CLIENT_URL=http://localhost:3000
```

### 4. Initialiser la base de données

```bash
npm run db:migrate
npm run db:seed
```

### 5. Lancer l'application en développement

```bash
npm run dev
```

Le client sera disponible sur `http://localhost:3000` et le serveur sur `http://localhost:3310`.

---

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le client et le serveur en simultané |
| `npm run dev:client` | Démarre uniquement le frontend (Vite) |
| `npm run dev:server` | Démarre uniquement le backend (tsx watch) |
| `npm run build` | Build les deux workspaces |
| `npm run start` | Démarre le serveur (avec migration) |
| `npm run test` | Lance les tests Jest |
| `npm run db:migrate` | Exécute les migrations de la base de données |
| `npm run db:seed` | Remplit la base de données avec les données initiales |
| `npm run check` | Vérifie le code (Biome + TypeScript) |
| `npm run check:fix` | Corrige automatiquement les erreurs (Biome) |
| `npm run clean` | Nettoie les fichiers temporaires |
| `npm run security:check` | Audit de sécurité npm |

---

## 🗄️ Base de données

Le projet utilise **MySQL 8** via l'ORM **Knex**. Le schéma comprend les tables suivantes :

| Table | Description |
|-------|-------------|
| `user` | Utilisateurs avec rôles (`loup alpha`, `loup gardien`, `jeune loup`) |
| `category` | Catégories du forum (Présentations, Trombinoscope, Vos créations, etc.) |
| `subject` | Sujets de discussion dans le forum |
| `message` | Messages publiés dans les sujets |
| `draw` | Dessins de la galerie |
| `comment` | Commentaires sur les dessins |
| `item` | Éléments génériques liés aux utilisateurs |

Les migrations se trouvent dans `server/database/migrations/` et les seeds dans `server/database/seeds/`.

---

## 🐳 Docker

### Développement avec Docker Compose

```bash
docker-compose up
```

Cela lance automatiquement :
- Le serveur (port `3310`)
- Le client (port `3000`)
- La base de données MySQL (port `3306`)

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Le `Dockerfile` est basé sur `node:20-alpine` pour une image optimisée en taille.

---

## 🧪 Tests

Les tests d'intégration sont écrits avec **Jest** et **Supertest** :

```bash
npm run test
```

Les tests couvrent :
- Les routes dessins (`server/tests/draw/`)
- Les routes items (`server/tests/item/`)
- Les routes messages (`server/tests/message/`)
- Les routes utilisateurs (`server/tests/user/`)
- L'installation (`server/tests/install.test.ts`)

---

## 📂 Structure du projet

```
jinloup-ludo-art/
├── client/                        # Frontend React
│   ├── public/images/             # Images statiques
│   ├── src/
│   │   ├── api.ts                 # Appels API
│   │   ├── App.tsx                # Composant racine
│   │   ├── router.tsx             # Routes
│   │   ├── main.tsx               # Point d'entrée
│   │   ├── categories/            # Pages par catégorie
│   │   ├── components/            # Composants réutilisables
│   │   ├── pages/                 # Routes (pages)
│   │   ├── data/                  # Données statiques
│   │   ├── services/              # Auth, thème
│   │   ├── types/                 # Types TypeScript
│   │   └── assets/                # Assets (dessins)
│   ├── vite.config.ts
│   └── package.json
│
├── server/                        # Backend Express
│   ├── src/
│   │   ├── app.ts                 # App Express
│   │   ├── main.ts                # Démarrage serveur
│   │   ├── router.ts              # Routes
│   │   ├── modules/               # Modules (auth, draw, user...)
│   │   ├── middleware/             # Middleware (validation)
│   │   ├── utils/                 # Utilitaires (auth, files, logger)
│   │   └── types/                 # Types TypeScript
│   ├── database/
│   │   ├── migrations/            # Migrations Knex
│   │   ├── seeds/                 # Seeds initiaux
│   │   ├── schema.sql             # Schéma complet
│   │   └── fixtures/              # Fixtures
│   ├── tests/                     # Tests Jest + Supertest
│   ├── knexfile.ts
│   └── package.json
│
├── bin/                           # Scripts utilitaires
├── .gitignore
├── .gitattributes
├── biome.json                     # Config Biome
├── commitlint.config.js           # Config Commitlint
├── jest.config.js                 # Config Jest
├── package.json                   # Monorepo root (workspaces)
├── docker-compose.yml             # Docker compose dev
├── docker-compose.prod.yml        # Docker compose prod
├── Dockerfile
└── README.md
```

---

## 🤝 Contribuer

1. Forker le dépôt
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Committer selon les conventions (`git commit -m 'feat: ma fonctionnalité'`)
4. Pousser (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

### Conventions

- **Linter** : Utiliser Biome (`npm run check` ou `npm run check:fix`)
- **Commits** : Format conventionnel via Commitlint (feat, fix, docs, etc.)
- **Branches** : Le nom de branche est validé via `validate-branch-name`

---

## 📌 Objectifs à long terme

- Créer une **communauté engagée** autour du dessin.
- Offrir une **vitrine** à l'artiste.
- Faire évoluer la plateforme vers une **collaboration entre artistes passionné(e)s** (galerie partagée, concours de dessin, etc.)
- Ajouter un système de notification et de groupe de discussion.
- Améliorer le système de rôles et permissions.

---

## 🚧 État du projet

📌 **Actuellement en développement évolutif**

Le projet est en cours de développement actif avec des améliorations régulières des fonctionnalités, de la sécurité et de l'expérience utilisateur.

---

## 📜 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

---

## 📫 Contact

Tu peux me contacter ici :
- 📧 Email : l.galicher@orange.fr
- 🐙 GitHub : [G-Ludovic](https://github.com/G-Ludovic)

---

*Merci de suivre ce projet, et bienvenue dans cette aventure artistique !* 🐺🎨