## Dépendences

`pnpm install`

## Génération du swagger

`pnpm generate`

## Compilation TypeScript

`pnpm build`

## Lancement dev

Permet d'être lancé sans compilation et de relancer dynamiquement l'application à chaque update
`pnpm dev`

## Architecture

- Config : Contient l'initialisation de la connexion à la base de données
- Controllers : Contient les classes contenant la gestion des routes de l'API
- DTO : Contient les interfaces de communication de l'API
- Model: Contient les entités représentant les différentes tables SQL
- Routes : Fichier généré par tsoa pour la déclaration des routes
- Services : Contient le code métier
- app.ts : Fichier principal de l'application
- game.sqlite : Fichier de base de données
- package.json : Contient les dépendances nécessaires pour l'application
- tsconfig.json : Configuration de la compilation typescript
- tsoa.json: Configuration de la génération du Swagger

## Exercice

1) Identifier et corriger l'erreur de la route POST consoles
2) Renvoyer une erreur personnalisée avec un code 404 si la console n'est pas trouvée lors des routes PATCH et GET/{id}
3) 
    1) Développer la route GET /games/{id}
    2) Développer la route POST /games : **/!\ La console du jeu ne sera pas créée dans cette route. Il faut que la console existe déjà.**
    3) Développer la route PATCH /games/{id}
4) 
    1) Développer le modèle Review
    2) Développer le DTO Review
    3) Développer la route GET /reviews
    4) Développer la route GET /reviews/{id}
    5) Développer la route POST /reviews : **/!\ Le jeu de la review ne sera pas créé dans cette route. Il faut que le jeu existe déjà.**
    6) Développer la route PATCH /reviews/{id}
5) 
    1) Mettre à jour la route DELETE /consoles/{id} afin d'empêcher la suppression si une review d'un de ses jeux existe
    2) Développer la route DELETE /games/{id} en empêchant la suppression du jeu si une review existe
    3) Développer la route DELETE /reviews/{id}
6) Renvoyer la liste des jeux de la consoles sur la route GET /consoles/{id}/games
7) Renvoyer la liste des reviews du jeu sur la route GET /games/{id}/reviews

## Exercice bonus

8) Gérer des DTO différents pour l'entrée et la sortie en ajoutant des mapper permettant de passer d'un Model à un DTO et vice-versa