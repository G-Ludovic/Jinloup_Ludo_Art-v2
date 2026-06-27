# 🎨 Jinloup Ludo Art

Jinloup Ludo Art est une application web fullstack dédiée à un artiste dessinateur. Elle propose une vitrine artistique, une galerie de dessins, un forum communautaire, un espace membre et des interfaces d’administration/modération.

Le projet est organisé en monorepo npm avec deux workspaces principaux :

- `client` : application React + Vite affichée dans le navigateur ;
- `server` : API REST Express + TypeScript connectée à une base MySQL.

---

## Sommaire

- [Fonctionnalités](#fonctionnalites)
- [Stack technique](#stack-technique)
- [Architecture du dépôt](#architecture-du-depot)
- [Fonctionnement global](#fonctionnement-global)
- [Installation locale](#installation-locale)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts npm](#scripts-npm)
- [Frontend](#frontend)
- [Backend API](#backend-api)
- [Authentification et rôles](#authentification-et-roles)
- [Uploads de fichiers](#uploads-de-fichiers)
- [Base de données](#base-de-donnees)
- [Tests et qualité](#tests-et-qualite)
- [Docker](#docker)
- [Déploiement](#deploiement)

---

## Fonctionnalités

- 🏠 Page d’accueil présentant l’univers du site.
- 🖼️ Galerie de dessins avec consultation, création, édition et suppression via l’API.
- 💬 Forum structuré en catégories, sujets et messages.
- 👤 Inscription, connexion, déconnexion et profil utilisateur.
- 🧑‍🤝‍🧑 Page membres et statistiques de présence par rôle.
- 🛡️ Gestion de rôles : `loup alpha`, `loup gardien`, `jeune loup`.
- 🛠️ Pages d’administration et de modération côté frontend.
- 📧 Formulaire de contact avec validation serveur et envoi via SendGrid.
- 📤 Upload d’images pour les dessins, messages et avatars utilisateur.
- 📱 Interface responsive pensée pour desktop et mobile.
- 🌙 Composant de thème côté client.

---

## Stack technique

| Couche | Technologies |
|---|---|
| Monorepo | npm workspaces |
| Frontend | React 19, TypeScript, Vite 6 |
| Routing frontend | React Router 7 (`createBrowserRouter`) |
| UI | CSS par composants, React Icons, React Toastify |
| Backend | Node.js 20, Express 4, TypeScript, tsx |
| API | REST JSON + multipart/form-data pour les uploads |
| Base de données | MySQL 8, mysql2, Knex 3 |
| Authentification | JWT, argon2, `Authorization: Bearer <token>` |
| Uploads | Multer, stockage disque dans `server/uploads` |
| Emails | SendGrid (`@sendgrid/mail`) ; variables SMTP conservées dans l’exemple |
| Tests | Jest, ts-jest, Supertest |
| Qualité | Biome, TypeScript |
| Conteneurisation | Docker, Docker Compose |

---

## Architecture du dépôt

```text
Jinloup_Ludo_Art-v2/
├── bin/
│   └── clean.js                     # Script utilitaire de nettoyage
├── client/
│   ├── index.html
│   ├── package.json                 # Workspace frontend
│   ├── vite.config.ts
│   ├── vercel.json                  # Configuration déploiement Vercel
│   └── src/
│       ├── App.tsx                  # Layout global avec Header/Footer/Outlet
│       ├── main.tsx                 # Entrée React
│       ├── router.tsx               # Définition des routes frontend
│       ├── api.ts                   # Helpers fetch centralisés
│       ├── config.ts                # Configuration API_URL
│       ├── endpoints.ts             # Endpoints API utilisés côté client
│       ├── assets/                  # Images et ressources statiques
│       ├── categories/              # Pages des catégories du forum
│       ├── components/              # Composants réutilisables
│       ├── pages/                   # Pages principales
│       ├── services/                # Contextes/services React, dont AuthContext
│       └── types/                   # Types TypeScript côté client
├── server/
│   ├── package.json                 # Workspace backend
│   ├── knexfile.ts                  # Configuration Knex/MySQL
│   ├── bin/                         # Scripts migrations/seeds
│   ├── database/
│   │   ├── client.ts                # Client Knex partagé
│   │   ├── checkConnection.ts       # Vérification DB au démarrage
│   │   ├── migrations/              # Évolution du schéma
│   │   ├── seeds/                   # Données initiales
│   │   ├── fixtures/                # Données de seed/test
│   │   └── schema.sql               # Schéma SQL de référence
│   ├── src/
│   │   ├── main.ts                  # Démarrage HTTP
│   │   ├── app.ts                   # Configuration Express globale
│   │   ├── router.ts                # Routes REST principales
│   │   ├── modules/                 # Modules métier par ressource
│   │   ├── utils/                   # Auth, uploads, rôles, validation
│   │   ├── middleware/
│   │   └── types/
│   ├── tests/                       # Tests Jest/Supertest
│   └── uploads/                     # Images uploadées, créé automatiquement
├── docker-compose.yml               # Environnement Docker local
├── docker-compose.prod.yml          # Déploiement Docker + Traefik
├── Dockerfile                       # Image Node 20 Alpine
├── jest.config.js                   # Configuration des tests backend
├── biome.json                       # Lint/format
├── package.json                     # Scripts racine et workspaces
└── README.md
```

---

## Fonctionnement global

```text
Navigateur
   │
   │  React/Vite sur http://localhost:3000
   ▼
Client React
   │
   │  fetch(`${VITE_API_URL}/api/...`)
   │  JSON ou multipart/form-data
   ▼
API Express sur http://localhost:3310
   │
   ├── Middlewares : CORS, JSON, cookies, JWT, Multer
   ├── Modules métier : user, draw, category, subject, message, contact, item
   ├── Stockage fichiers : server/uploads servi via /uploads
   └── Knex/mysql2
       ▼
Base MySQL 8
```

### Cycle typique d’une requête

1. Le frontend lit l’URL de l’API dans `VITE_API_URL` via `client/src/config.ts`.
2. Les appels publics utilisent `fetchAPI` dans `client/src/api.ts`.
3. Les appels protégés utilisent `fetchAuth`, qui ajoute automatiquement le header `Authorization: Bearer <token>`.
4. Express reçoit la requête dans `server/src/app.ts`, applique les middlewares globaux, puis délègue à `server/src/router.ts`.
5. La route appelle une action métier située dans `server/src/modules/<module>/<module>Actions.ts`.
6. L’action utilise un repository pour lire/écrire en base via Knex.
7. La réponse revient au client en JSON, sauf pour les fichiers qui sont servis statiquement via `/uploads/...`.

---

## Installation locale

### Prérequis

- Node.js 20+
- npm 10+
- MySQL 8+ ou Docker Compose
- Git

### 1. Cloner le projet

```bash
git clone https://github.com/G-Ludovic/Jinloup_Ludo_Art-v2.git
cd Jinloup_Ludo_Art-v2
```

### 2. Installer les dépendances

```bash
npm install
```

La racine installe les dépendances des workspaces `client` et `server` grâce à npm workspaces.

### 3. Créer les fichiers d’environnement

```bash
cp server/.env.sample server/.env
cp client/.env.sample client/.env
```

Adaptez ensuite les valeurs à votre environnement local.

### 4. Préparer la base de données

En développement, vous pouvez utiliser une base MySQL locale ou le service MySQL Docker fourni par `docker-compose.yml`.

En production, le projet est prévu pour utiliser une base MySQL hébergée sur le cloud gratuit d’Aiven. Ce choix permet de déployer l’API sur Render tout en évitant de payer une base de données managée chez Render.

Avec une base MySQL locale, Docker ou Aiven, renseignez les variables `DB_*` dans `server/.env`, puis lancez :

```bash
npm run db:migrate
npm run db:seed
```

Avec Docker, la base est lancée par `docker compose up` et configurée via `database-setup.sh`.

Avec Aiven, utilisez les informations de connexion fournies dans la console Aiven : host, port, user, password, database et activez généralement `DB_SSL=true`.

### 5. Démarrer le projet en développement

```bash
npm run dev
```

URLs par défaut :

- Frontend : http://localhost:3000
- API : http://localhost:3310
- MySQL : localhost:3306

---

## Variables d’environnement

### Client : `client/.env`

| Variable | Exemple | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3310` | URL publique du serveur Express utilisée par le client Vite. |

Toutes les variables exposées au frontend doivent commencer par `VITE_`.

### Serveur : `server/.env`

| Variable | Exemple | Description |
|---|---|---|
| `APP_PORT` | `3310` | Port d’écoute de l’API si `PORT` n’est pas défini. |
| `PORT` | `3310` | Port prioritaire, utile pour certains hébergeurs. |
| `APP_SECRET` | `une-cle-secrete-longue` | Secret utilisé pour signer les JWT. Obligatoire pour l’auth. |
| `DB_HOST` | `localhost` | Hôte MySQL. En Docker local : `database`. En production : host MySQL fourni par Aiven. |
| `DB_PORT` | `3306` | Port MySQL. |
| `DB_USER` | `user` | Utilisateur MySQL. |
| `DB_PASSWORD` | `password` | Mot de passe MySQL. |
| `DB_NAME` | `js_template_fullstack` | Nom de la base de données. |
| `DB_SSL` | `true` ou vide | Active SSL Knex avec `rejectUnauthorized: false`. Recommandé/nécessaire avec Aiven selon la configuration du service. |
| `CLIENT_URL` | `http://localhost:3000` | Origine autorisée par CORS. |
| `SENDGRID_API_KEY` | `SG...` | Clé API SendGrid pour le formulaire de contact. |
| `CONTACT_EMAIL` | `contact@example.com` | Destinataire des messages du formulaire de contact. |
| `FROM_EMAIL` | `noreply@example.com` | Expéditeur SendGrid. Fallback sur `SMTP_USER`. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | voir `.env.sample` | Variables SMTP présentes dans l’exemple, mais le code de contact actuel utilise SendGrid. |

---

## Scripts npm

### Scripts racine

| Script | Description |
|---|---|
| `npm run dev` | Lance le client et le serveur en parallèle avec `concurrently`. |
| `npm run dev:client` | Lance uniquement Vite dans le workspace `client`. |
| `npm run dev:server` | Lance uniquement Express avec `tsx watch`. |
| `npm run build` | Lance les builds disponibles dans tous les workspaces. |
| `npm run start` | Lance le serveur via le workspace `server`. |
| `npm run db:migrate` | Exécute les migrations Knex du serveur. |
| `npm run db:seed` | Exécute les seeds Knex du serveur. |
| `npm run test` | Lance les tests configurés dans les workspaces. |
| `npm run check` | Exécute Biome sur les fichiers stagés puis le typage TypeScript des workspaces. |
| `npm run check:fix` | Applique les corrections Biome automatiques sur les fichiers stagés. |
| `npm run clean` | Lance le script utilitaire `bin/clean`. |
| `npm run security:check` | Lance un audit npm et vérifie certaines dépendances sensibles. |

### Scripts client

| Script | Description |
|---|---|
| `npm run dev --workspace=client` | Démarre Vite. |
| `npm run build --workspace=client` | Type-check puis build Vite. |
| `npm run preview --workspace=client` | Prévisualise le build Vite. |
| `npm run check-types --workspace=client` | Vérifie les types TypeScript. |

### Scripts serveur

| Script | Description |
|---|---|
| `npm run dev --workspace=server` | Démarre l’API en watch avec `tsx`. |
| `npm run start --workspace=server` | Lance les migrations puis démarre l’API. |
| `npm run db:migrate --workspace=server` | Lance `server/bin/migrate`. |
| `npm run db:seed --workspace=server` | Lance `server/bin/seed`. |
| `npm run test --workspace=server` | Lance Jest en mode verbose. |
| `npm run check-types --workspace=server` | Vérifie les types TypeScript. |

---

## Frontend

### Entrée et layout

- `client/src/main.tsx` monte l’application React.
- `client/src/App.tsx` définit le layout global avec `Header`, `Footer`, `Outlet` et `ToastContainer`.
- `client/src/router.tsx` déclare toutes les routes via `createBrowserRouter`.

### Routes principales

| Route | Page |
|---|---|
| `/` | Accueil |
| `/gallery` | Galerie |
| `/contact` | Contact |
| `/author` | Page auteur |
| `/forum` | Accueil forum |
| `/forum/category/1` à `/forum/category/8` | Catégories du forum |
| `/login` | Connexion |
| `/registration` | Inscription |
| `/profile` | Profil utilisateur |
| `/members` | Membres |
| `/admin` | Administration |
| `/moderation` | Modération |
| `/privacy-policy` | Politique de confidentialité |
| `/terms-of-use` | Conditions d’utilisation |
| `/etiquette` | Règles de bonne conduite |
| `/developers` | Page développeurs |
| `/help-center` | Centre d’aide |
| `/copyright` | Copyright |
| `*` | Page 404 |

### Appels API côté client

Les endpoints sont centralisés dans `client/src/endpoints.ts` :

```ts
export const ENDPOINTS = {
  subjects: "/api/subject",
  messages: "/api/message",
  categories: "/api/categories",
  draws: "/api/draws",
  onlineStats: "/api/online-stats",
  contact: "/api/contact",
};
```

`client/src/api.ts` fournit :

- `fetchAPI<T>()` pour les requêtes publiques ;
- `fetchAuth<T>()` pour les requêtes protégées avec JWT ;
- des helpers comme `loadSubjects`, `loadMessages`, `loadCategories`, `loadDraws`, `loadOnlineStats`.

### Authentification côté client

`client/src/services/AuthContext.tsx` gère :

- l’état `isLogged` ;
- l’utilisateur courant ;
- `login(email, password)` ;
- `logout()` ;
- le refresh au chargement de l’application via `/api/refresh` ;
- le stockage du JWT dans `localStorage` sous la clé `token`.

---

## Backend API

### Entrée serveur

- `server/src/main.ts` charge les variables d’environnement, vérifie la connexion DB et démarre Express.
- `server/src/app.ts` configure `cookie-parser`, `express.json()`, CORS, les routes `/api` et `/api/auth`, les fichiers statiques `/uploads` et le middleware d’erreur global.
- `server/src/router.ts` déclare les routes REST principales.

### CORS

Les origines autorisées sont :

- `CLIENT_URL` ou `http://localhost:3000` par défaut ;
- `https://jinloup-ludo-art-v2-client.vercel.app`.

Les credentials sont activés et les méthodes autorisées sont `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`.

### Modules backend

Chaque module suit globalement cette séparation :

```text
server/src/modules/<module>/
├── <module>Actions.ts      # Handlers Express : req/res/next
└── <module>Repository.ts   # Accès DB via Knex
```

Modules présents : `item`, `user`, `draw`, `category`, `subject`, `message`, `contact`, `auth`.

### Routes API principales

Toutes les routes ci-dessous sont préfixées par `/api`.

#### Items

| Méthode | Route | Protection | Description |
|---|---|---|---|
| `GET` | `/items` | Public | Liste les items. |
| `GET` | `/items/:id` | Public | Lit un item. |
| `POST` | `/items` | Public actuellement | Crée un item. |
| `PUT` | `/items/:id` | Public actuellement | Modifie un item. |
| `DELETE` | `/items/:id` | Public actuellement | Supprime un item. |

#### Utilisateurs et auth

| Méthode | Route | Protection | Description |
|---|---|---|---|
| `POST` | `/user` | Public + validation | Inscription. |
| `POST` | `/login` | Public | Connexion, renvoie un JWT. |
| `POST` | `/logout` | Public | Déconnexion, suppression cookie si présent. |
| `GET` | `/users` | JWT | Liste les utilisateurs sans mot de passe. |
| `GET` | `/users/:id` | JWT | Lit un utilisateur sans mot de passe. |
| `PUT` | `/users/:id` | JWT + upload avatar | Modifie un profil. Autorisé pour soi-même ou `loup alpha`. |
| `DELETE` | `/users/:id` | JWT + rôles `loup alpha` ou `loup gardien` | Supprime un utilisateur. |
| `GET` | `/refresh` | JWT | Renouvelle le token et renvoie l’utilisateur courant. |
| `GET` | `/online-stats` | Public | Renvoie des statistiques par rôle. |

#### Dessins

| Méthode | Route | Protection | Description |
|---|---|---|---|
| `GET` | `/draws` | Public | Liste les dessins. |
| `GET` | `/draws/:id` | Public | Lit un dessin. |
| `POST` | `/draws` | JWT + upload image | Crée un dessin. |
| `PUT` | `/draws/:id` | JWT + upload image | Modifie un dessin. |
| `DELETE` | `/draws/:id` | JWT | Supprime un dessin. |

#### Forum

| Méthode | Route | Protection | Description |
|---|---|---|---|
| `GET` | `/categories` | Public | Liste les catégories. |
| `GET` | `/categories/:id` | Public | Lit une catégorie. |
| `GET` | `/subject` | Public | Liste les sujets. |
| `GET` | `/subject/:id` | Public | Lit un sujet. |
| `GET` | `/message` | Public | Liste les messages. |
| `GET` | `/message/:id` | Public | Lit un message. |
| `POST` | `/message` | JWT + upload image optionnel | Crée un message. |
| `PUT` | `/message/:id` | JWT + upload image optionnel | Modifie un message. |
| `DELETE` | `/message/:id` | JWT | Supprime un message. |

#### Contact

| Méthode | Route | Protection | Description |
|---|---|---|---|
| `POST` | `/contact` | Public | Valide le formulaire et envoie un email via SendGrid. |

> `server/src/app.ts` monte aussi `authRoutes` sur `/api/auth`. Les routes principales utilisées par le client sont cependant celles listées dans `server/src/router.ts`, notamment `/api/login`, `/api/logout` et `/api/refresh`.

---

## Authentification et rôles

1. L’utilisateur envoie son email et son mot de passe à `POST /api/login`.
2. Le serveur récupère l’utilisateur par email.
3. Le mot de passe est vérifié avec `argon2.verify`.
4. Le serveur signe un JWT avec `APP_SECRET` contenant `id`, `email` et `role`.
5. Le client stocke le JWT dans `localStorage`.
6. Les requêtes protégées ajoutent `Authorization: Bearer <token>`.
7. Les middlewares `verifyToken` décodent le token et ajoutent l’utilisateur à `req.user`.

Rôles applicatifs :

- `loup alpha` : rôle administrateur ;
- `loup gardien` : rôle modérateur ;
- `jeune loup` : rôle membre standard.

Sécurité actuelle :

- mots de passe hashés avec argon2 ;
- mots de passe retirés des réponses utilisateur ;
- JWT expirant au bout d’un jour ;
- routes sensibles protégées par middleware JWT ;
- contrôle de rôle sur certaines opérations ;
- filtrage MIME des images uploadées.

---

## Uploads de fichiers

Les uploads sont gérés dans `server/src/utils/files.ts` avec Multer.

- Dossier de stockage : `server/uploads`.
- Création automatique du dossier s’il n’existe pas.
- Taille maximale : 10 Mo.
- Types acceptés : `image/jpeg`, `image/png`, `image/webp`, `image/gif`.
- Nommage : nom original normalisé + UUID + extension.
- Accès public : `/uploads/<nom-du-fichier>`.

| Usage | Middleware | Champ formulaire | Champ écrit dans `req.body` |
|---|---|---|---|
| Dessin | `imageUpload` + `drawImage` | `image` | `image` |
| Message forum | `imageUpload` + `presentationImage` | `image` | `file` |
| Avatar utilisateur | `anyUpload` + `avatarImage` | `avatar` | `avatar` |

---

## Base de données

### Configuration Knex

La configuration est dans `server/knexfile.ts` :

- client : `mysql2` ;
- migrations : `server/database/migrations` ;
- seeds : `server/database/seeds` ;
- pool : min `2`, max `10` ;
- SSL activable avec `DB_SSL=true`.

### Tables principales

La migration principale `server/database/migrations/20250101_create_tables.ts` crée :

| Table | Rôle |
|---|---|
| `user` | Membres : pseudo, avatar, bio, email, mot de passe hashé, rôle, dates. |
| `item` | Ressource exemple/historique du template, liée à `user`. |
| `category` | Catégories du forum. |
| `subject` | Sujets du forum, liés à un utilisateur et à une catégorie. |
| `message` | Messages du forum, liés à un sujet et à un utilisateur. |
| `draw` | Dessins de la galerie, éventuellement liés à un utilisateur. |
| `comment` | Commentaires liés aux dessins et utilisateurs. |

Relations principales :

```text
user 1───n item
user 1───n subject
category 1───n subject
user 1───n message
subject 1───n message
user 1───n draw
draw 1───n comment
user 1───n comment
```

Migrations et seeds :

```bash
npm run db:migrate
npm run db:seed
```

---

## Tests et qualité

### Tests

Les tests backend sont configurés avec Jest, ts-jest et Supertest.

- Configuration : `jest.config.js`
- Racine des tests : `server`
- Pattern : `**/tests/**/*.spec.ts`
- Environnement : `node`

Tests présents :

```text
server/tests/draw/routes.spec.ts
server/tests/install.test.ts
server/tests/item/routes.spec.ts
server/tests/message/routes.spec.ts
server/tests/user/routes.spec.ts
```

Lancement :

```bash
npm run test
```

### Type-check

```bash
npm run check-types --workspace=client
npm run check-types --workspace=server
```

### Lint et format

Le projet utilise Biome (`biome.json`) avec formatage, organisation des imports et règles recommandées.

```bash
npm run check
npm run check:fix
```

> Note : les scripts racine Biome sont configurés avec `--staged`, donc ils ciblent principalement les fichiers indexés/stagés par Git.

---

## Docker

### Développement local

`docker-compose.yml` lance deux services :

- `web` : application Node qui exécute `npm run dev` ;
- `database` : MySQL 8.

Cette base Docker sert surtout au développement local. En production, la base MySQL n’est pas hébergée dans ce compose : elle est externalisée sur Aiven via son offre cloud gratuite.

```bash
docker compose up --build
```

Ports exposés :

- `3000` : client Vite ;
- `3310` : API Express ;
- `3306` : MySQL.

Variables Docker locales importantes :

```text
APP_PORT=3310
APP_SECRET=123456789
DB_HOST=database
DB_PORT=3306
DB_USER=user
DB_PASSWORD=password
DB_NAME=js_template_fullstack
VITE_API_URL=http://localhost:3310
```

### Production Docker + Traefik

`docker-compose.prod.yml` décrit un service `web` connecté à un réseau externe `proxy` et exposé via Traefik.

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Le fichier attend notamment `PROJECT_NAME`, `GITHUB_REPOSITORY_NAME`, `APP_SECRET`, `DATABASE_SUBDOMAIN_NAME`, `USER_NAME`, `USER_PASSWORD`, `DB_NAME` et `HOST`.

---

## Déploiement

Le projet est prévu pour un déploiement séparé :

- frontend sur Vercel ;
- backend sur Render ;
- base MySQL sur Aiven, via un serveur cloud gratuit ;
- ou backend conteneurisé derrière Traefik avec `docker-compose.prod.yml`.

### Choix Aiven pour MySQL

La base de données MySQL de production passe par Aiven plutôt que par Render. L’objectif est de profiter d’un serveur cloud gratuit Aiven pour la partie base de données et d’éviter les coûts d’une base managée payante sur Render.

Render est donc utilisé pour héberger l’API Node/Express, tandis qu’Aiven fournit l’instance MySQL distante. Le serveur Express se connecte à Aiven grâce aux variables `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` et, si nécessaire, `DB_SSL=true`.

Points à vérifier en production :

- définir `VITE_API_URL` côté client avec l’URL publique de l’API ;
- définir `CLIENT_URL` côté serveur avec l’URL publique du frontend ;
- utiliser un `APP_SECRET` long, unique et non versionné ;
- configurer sur Render les variables MySQL fournies par Aiven ;
- configurer `SENDGRID_API_KEY`, `CONTACT_EMAIL` et `FROM_EMAIL` ;
- activer `DB_SSL=true` pour la connexion MySQL Aiven si le service l’exige ;
- prévoir une stratégie persistante pour `server/uploads` si les uploads doivent être conservés.

---

## Conventions de développement

- TypeScript est utilisé côté client et côté serveur.
- Les composants React sont rangés par dossier dans `client/src/components` ou `client/src/pages`.
- Les appels API réutilisables doivent être centralisés dans `client/src/api.ts` ou proches du composant si très spécifiques.
- Les nouvelles routes API doivent être ajoutées dans `server/src/router.ts`.
- La logique métier serveur doit rester dans les `Actions`, l’accès aux données dans les `Repository`.
- Les mots de passe ne doivent jamais être renvoyés par l’API.
- Les routes modifiant des données sensibles doivent être protégées par JWT et, si nécessaire, par rôle.
- Les fichiers `.env` réels ne doivent pas être commités.

---

## Dépannage rapide

### Le frontend ne contacte pas l’API

- Vérifier `client/.env` : `VITE_API_URL=http://localhost:3310`.
- Redémarrer Vite après modification d’un `.env`.
- Vérifier que le serveur écoute bien sur le port `3310`.

### Erreur CORS

- Vérifier `CLIENT_URL` dans `server/.env`.
- Vérifier que l’URL du frontend correspond exactement à l’origine navigateur.

### Erreur JWT ou accès refusé

- Vérifier que `APP_SECRET` est défini côté serveur.
- Se reconnecter pour obtenir un nouveau token.
- Vérifier que le header `Authorization: Bearer <token>` est bien envoyé.

### Les images uploadées ne s’affichent pas

- Vérifier que le fichier existe dans `server/uploads`.
- Vérifier que l’URL commence par `/uploads/...`.
- Vérifier que l’API sert bien le dossier `/uploads`.

### La base ne se connecte pas

- Vérifier `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- En Docker, `DB_HOST` doit être `database` depuis le service `web`.
- En local sans Docker, `DB_HOST` est généralement `localhost`.
- En production Render + Aiven, `DB_HOST` doit être l’host fourni par Aiven, pas `localhost`.
- Si Aiven refuse la connexion, vérifier `DB_SSL=true`, les identifiants Aiven et les règles d’accès réseau du service.

---

## Licence

Ce projet est sous licence MIT. Voir [LICENSE.md](LICENSE.md) pour plus de détails.

---

## Contact

- Email : l.galicher@orange.fr
- GitHub : https://github.com/G-Ludovic
