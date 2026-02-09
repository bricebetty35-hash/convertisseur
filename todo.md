# TODO

## Architecture & Domaine
- Ajouter des tests unitaires sur le domaine (ConversionDomainService, règles de désactivation du taux forcé).
- Extraire les constantes métier (seuil 2 %, nombre d’éléments d’historique) dans une configuration dédiée.
- Introduire un type plus riche pour les paires de devises (ex: CurrencyPair) pour éviter les erreurs de combinaison.

## Ports & Adaptateurs
- Ajouter un adaptateur HTTP réel pour les taux de change (API externe) en implémentant ExchangeRatePort.
- Ajouter un adaptateur de persistance (localStorage ou IndexedDB) pour l’historique en plus de l’in-memory.
- Gérer les erreurs réseau et les stratégies de fallback (repli sur dernier taux connu).

## Orchestrateur
- Ajouter des tests unitaires sur ConverterOrchestrator (switch, continuité des valeurs, forcedRate).
- Introduire un système de logging (port + adaptateur) pour tracer les conversions.
- Ajouter un mécanisme de throttling/debounce sur les changements de montant.

## UI / UX
- Ajouter des validations visuelles sur les champs (montant négatif, taux forcé invalide).
- Ajouter des feedbacks visuels lors de la désactivation automatique du taux forcé (message, highlight).
- Améliorer la responsivité (mobile-first) et la lisibilité (espacements, typographie).
- Ajouter un indicateur visuel de variation du taux (flèche verte/rouge, animation légère).

## Technique
- Documenter les ports et adaptateurs (README technique ou docs/architecture.md).
