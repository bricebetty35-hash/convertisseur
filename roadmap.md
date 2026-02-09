# Roadmap

## 1. Fonctionnalités métier

- Support complet multi-devises :
  - Ajout de nouvelles devises (GBP, JPY, CHF, etc.).
  - Gestion des paires de devises dynamiques (base/quote configurables).
- Ajout d’un mode "favoris" pour certaines paires de devises.
- Ajout d’un mode "conversion inverse" automatique (détection de la devise saisie).

## 2. Intégration API & persistance

- Intégrer une API de taux de change réelle (ex: exchangerate.host, Fixer, etc.) via un nouvel adaptateur ExchangeRatePort.
- Ajouter un adaptateur de persistance (localStorage, IndexedDB, ou backend REST) pour l’historique.
- Mettre en place un mécanisme de cache des taux pour limiter les appels API.

## 3. UX & visualisation

- Rendre l'application responsive (adaptée pour le mobile).
- Ajouter un graphique temps réel de l’évolution du taux (ng-zorro + chart lib).
- Ajouter un mode "comparaison" de plusieurs paires de devises sur un même écran.
- Ajouter un thème sombre et un sélecteur de thème.
- Ajouter une page d’aide expliquant les notions de taux réel, taux forcé, écart de 2 %, etc.

## 4. Qualité & industrialisation

- Couverture de tests unitaires élevée sur le domaine et les orchestrateurs.
- Mise en place de tests end-to-end (Cypress ou Playwright).
- Pipeline CI/CD (lint, tests, build, déploiement).
- Documentation d’architecture (diagrammes hexagonaux, description des ports/adaptateurs).

## 5. Extensibilité

- Ajouter un port de notification (ex: toast, email, webhook) pour certaines conditions (écart de taux, seuils).
- Préparer un module "alertes" (alerte quand un taux dépasse un certain seuil).
- Préparer une API publique (REST/GraphQL) pour exposer les conversions et l’historique.
