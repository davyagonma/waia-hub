# waia-hub

Plateforme de démonstration pour présenter et évaluer des projets IA de l'Afrique de l'OUest. Le dépôt contient un backend Node/Express (API REST + MongoDB) et un frontend Next.js (React) pour l'interface utilisateur.

## Structure du dépôt

- `backend/` — API Node.js + Express
  - `controllers/` — logique métier pour auth, projets, tags, admin
  - `models/` — schémas Mongoose (`User`, `Project`, `Review`, `Tag`)
  - `routes/` — routes montées dans `server.js`
  - `server.js` — point d'entrée du serveur
- `frontend/` — application Next.js/React
  - `src/` — pages et composants React
  - `src/lib/api.ts` — configuration axios (utilise `NEXT_PUBLIC_API_URL`)

## Stack technique

- Backend : Node.js, Express, Mongoose (MongoDB), JWT pour l'authentification
- Frontend : Next.js, React, axios
- Outils : dotenv, cors, bcryptjs, joi

## Prérequis

- Node.js (16+ recommandé)
- npm ou yarn
- Une instance MongoDB (locale ou service cloud)

## Configuration

Créer un fichier `.env` dans `backend/` avec au moins les variables suivantes :

```
MONGO_URI=<votre_mongodb_uri>
PORT=5000            # optionnel, défaut 5000
JWT_SECRET=<une_phrase_secrète_pour_jwt>
```

Côté frontend (optionnel) vous pouvez définir l'URL de l'API :

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

(si non défini, le frontend utilise `http://localhost:5000/api` par défaut)

## Installation & lancement

1. Backend

```bash
cd backend
npm install
# développement (redémarrage automatique avec node --watch)
npm run dev
# production
npm start
```

2. Frontend

```bash
cd frontend
npm install
# développement
npm run dev
# build pour production
npm run build
# lancer la version buildée
npm run start
```

Lancer backend et frontend dans deux terminaux séparés. Par défaut le backend écoute sur `http://localhost:5000` et le frontend sur `http://localhost:3000`.

## API (aperçu rapide)

Les principales routes sont montées sous `/api` :

- `POST /api/auth/register` — créer un utilisateur
- `POST /api/auth/login` — connexion (renvoie un token JWT)
- `GET /api/auth/me` — récupérer l'utilisateur courant (privé)
- `GET/POST/PUT/DELETE /api/projects` — gestion des projets
- `GET /api/tags` — récupérer les tags
- `* /api/admin` — routes d'administration (si disponibles)

Consultez `backend/routes/` et `backend/controllers/` pour les détails d'implémentation.

## Développement & bonnes pratiques

- Le frontend stocke le token JWT dans le `localStorage` et l'ajoute automatiquement aux requêtes via `src/lib/api.ts`.
- Protégez bien `JWT_SECRET` et votre URI MongoDB (ne pas committer `.env` dans le dépôt).

## Tests

Aucun test automatisé n'est fourni actuellement. Vous pouvez ajouter des tests unitaires (Jest, Supertest pour l'API) comme amélioration future.

## Contribution

Contributions bienvenues : ouvrez une issue pour discuter d'une fonctionnalité, puis un pull request PR pour proposer la modification.

## License


