<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# API de Recherche d'Adresses et de Risques - Test Technique

API NestJS permettant de rechercher des adresses et d'obtenir les risques associés.

## Description

Cette API permet de :
- Rechercher des adresses à partir d'une chaîne de caractères
- Obtenir les risques naturels et technologiques associés à une adresse

## Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- SQLite3 (si vous n'utilisez pas Docker)
- Docker et Docker Compose (optionnel, pour le développement en conteneur)

## Installation

```bash
# Installation des dépendances
$ npm install
```

## Variables d'environnement

Le projet utilise un fichier `.env` pour la configuration. Un fichier `.env.example` est fourni comme modèle.

### Configuration du fichier .env

1. Copiez le fichier `.env.example` en `.env` :
```bash
cp .env.example .env
```

2. Modifiez les variables selon vos besoins :
```env
# Configuration du port de l'API
API_PORT=8000

# Configuration des URLs des APIs externes
GEORISQUES_API_URL=https://georisques.gouv.fr/api/v1/resultats_rapport_risque?latlon=
ADDRESSES_API_URL=https://api-adresse.data.gouv.fr/search/?q=

# Configuration de la base de données SQLite
TYPEORM_CONNECTION=sqlite
TYPEORM_DATABASE=/data/db.sqlite
```

### Explications des variables

- `API_PORT` : Port sur lequel l'API sera exposée (8000 par défaut)
- `GEORISQUES_API_URL` : URL de l'API Géorisques pour récupérer les risques
- `ADDRESSES_API_URL` : URL de l'API Adresse pour rechercher les adresses
- `TYPEORM_CONNECTION` : Type de connexion à la base de données (sqlite)
- `TYPEORM_DATABASE` : Chemin vers le fichier de la base de données SQLite

## Lancement du projet

### Développement local (sans Docker)

```bash
# Mode développement
$ npm run start:dev
```

### Production

```bash
# Compilation
$ npm run build

# Lancement
$ npm run start:prod
```

### Avec Docker

```bash
# Construction et lancement des conteneurs
$ docker-compose up -d
```

## Configuration des ports

### Modification des ports dans Docker

Pour modifier les ports exposés par l'application, vous pouvez :

1. Modifier le fichier `docker-compose.yml` :
```yaml
services:
  app:
    ports:
      - "VOTRE_PORT:8000"  # Changez VOTRE_PORT par le port souhaité
```

2. Modifier le fichier `Dockerfile` si nécessaire :
```dockerfile
EXPOSE VOTRE_PORT  # Changez VOTRE_PORT par le port souhaité
```

3. Redémarrer les conteneurs :
```bash
docker-compose down
docker-compose up -d
```

Note : Assurez-vous que le port configuré dans le fichier `.env` (`API_PORT`) correspond au port exposé dans Docker.

## Tests

```bash
# Tests unitaires
$ npm run test

# Tests unitaires avec couverture
$ npm run test:cov

# Tests e2e
$ npm run test:e2e
```

## Documentation API

### Accès à Swagger UI

L'API est documentée avec Swagger UI. Pour y accéder :

1. Lancez l'application en mode développement ou production
2. Ouvrez votre navigateur et accédez à l'une des URLs suivantes :
   - `http://localhost:3000/api` (développement local)
   - `http://localhost:3000/api-json` (documentation au format JSON)
   - `http://localhost:3000/api-yaml` (documentation au format YAML)

Dans Swagger UI, vous pouvez :
- Visualiser tous les endpoints disponibles
- Voir les détails des requêtes et réponses
- Tester directement les endpoints
- Télécharger la documentation au format OpenAPI

### Endpoints

#### POST /addresses
Recherche d'adresses à partir d'une chaîne de caractères.

**Request Body:**
```json
{
  "q": "35+rue+de+koestlach&limit=1"
}
```

**Réponse 200:**
```json
{
  "label": "35 Rue de Koestlach 68480 Vieux-Ferrette",
  "housenumber": "35",
  "street": "Rue de Koestlach",
  "postcode": 68480,
  "citycode": 68347,
  "latitude": "47.503982",
  "longitude": "7.295802",
  "id": 5
}
```

**Codes de réponse:**
- 200: Adresse trouvée
- 400: Requête invalide
- 404: Adresse non trouvée
- 500: Erreur serveur

#### GET /addresses/:id/risks
Récupération des risques pour une adresse.

**Réponse 200:**
```json
{
  "adresse": {
    "libelle": "35 Rue de Koestlach 68480 Vieux-Ferrette",
    "longitude": 7.295802,
    "latitude": 47.503983
  },
  "commune": {
    "libelle": "Vieux-Ferrette",
    "codePostal": "68480",
    "codeInsee": "68347"
  },
  "url": "https://georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport2?typeForm=adresse&city=Vieux-Ferrette&codeInsee=68347&lon=7.295802&lat=47.503982&adresse=35+Rue+de+Koestlach+68480+Vieux-Ferrette",
  "risquesNaturels": {
    "inondation": {
      "present": true,
      "libelle": "Inondation"
    },
    "risqueCotier": {
      "present": false,
      "libelle": "Risques côtiers (submersion marine, tsunami)"
    },
    "seisme": {
      "present": true,
      "libelle": "Séisme"
    },
    "mouvementTerrain": {
      "present": true,
      "libelle": "Mouvements de terrain"
    },
    "reculTraitCote": {
      "present": false,
      "libelle": "Recul du trait de côte"
    },
    "retraitGonflementArgile": {
      "present": true,
      "libelle": "Retrait gonflement des argiles"
    },
    "avalanche": {
      "present": false,
      "libelle": "Avalanche"
    },
    "feuForet": {
      "present": false,
      "libelle": "Feu de forêt"
    },
    "eruptionVolcanique": {
      "present": false,
      "libelle": "Volcan"
    },
    "cyclone": {
      "present": false,
      "libelle": "Vent violent"
    },
    "radon": {
      "present": true,
      "libelle": "Radon"
    }
  },
  "risquesTechnologiques": {
    "icpe": {
      "present": false,
      "libelle": "Installations industrielles classées (ICPE)"
    },
    "nucleaire": {
      "present": false,
      "libelle": "Nucléaire"
    },
    "canalisationsMatieresDangereuses": {
      "present": true,
      "libelle": "Canalisations de transport de matières dangereuses"
    },
    "pollutionSols": {
      "present": false,
      "libelle": "Pollution des sols"
    },
    "ruptureBarrage": {
      "present": false,
      "libelle": "Rupture de barrage"
    },
    "risqueMinier": {
      "present": false,
      "libelle": "Risques miniers"
    }
  }
}
```

**Codes de réponse:**
- 200: Risques trouvés
- 404: Adresse non trouvée
- 500: Erreur serveur

