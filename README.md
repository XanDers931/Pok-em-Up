# Pok'em Up : Le Shoot'em Up inspiré d'une certaines license Japonaise.

<img src="./client/public/images/presentation/menu.PNG">

## Informations

### Participants
- Romain Degez
- Alexandre Martel
- Axel Saint-maxin

### [Le Sujet](./Sujet.md)

### Sommaire

[TOC]

## Diagrammes de séquence

## Difficulté techniques

### Serveur

L'installation du serveur a pris beaucoup de temps.\
Comprendre comment fonctionnent les transferts de données,\
car c'est le serveur qui stocke et envoient les données aux différentes vues.\
De ce fait, nous avons perdu du temps à passer ce que l'on avait programmé côté client vers le côté serveur.

### Les hit box et collisions

- Comment se faire rencontrer objets avec des collisions
Si ces dernières sont parfaitement ajustées à l'image renvoyée, cela peut mettre à mal nos performances, cependant si elles sont simplistes, on risque de passer au travers des ennemis/bonus, ou que ces derniers ne prennent pas les dégâts normalement reçus.
- Connaître quels éléments sont entrés en collision pour les supprimer efficacement.

### Gestion des joueurs

Chaque joueur doit posséder son identifiant, la manipulation de celui-ci doit se faire sans altérer les autres.
La connexion et déconnexion ne doivent pas avoir d'incident direct sur la partie
(Par exemple : la connexion d'une personne au site ne doit pas relancer la partie).

### Redémarrage et Arrêt de partie

Comment arrêter et relancer une partie ?\
Il faut le prendre en compte dès le début, surtout si on abuse des setInterval\
Le redémarrage en particulier est difficile, car on ne peut pas juste faire :
```js
new GameView()
```

### La résolution des bugs

Certaines erreurs sont difficiles à retrouvées car ces dernières ne sont pas affichées si elle ne provoque pas d'erreur explicite pour le débogueur, ou lors de la compilation du code,\
par exemple les différents "undefined" où "NotANumber" nous ont particulièrement posé problème.

## Points d'amélioration et d'achèvement du projet

Avec plus de temps, et d'organisation, beaucoup de choses auraient pu être ajoutées :

- Plusieurs parties jouables simultanément
- Ajout d'une capacité de déplacement (esquive)
- Évolution du personnage et de ses capacités
- Plusieurs niveaux (boss, changement d'arrière-plan, musique, évolution du personnage)
- Une transition pour changer l'orientation du jeu d'horizontale à vertical
- Plus de bonus
- Des ennemies qui tirent, bougent différemment
- Une orientation de tir à la souris
- Des effets visuels et sonores (effet de vent, bruitage des ennemies touché, dégâts reçus par le joueur...)

## Ce dont vous êtes le plus fier/fière

|     Nom          |    Fierté                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------|
| Saint-maxin Axel | L'inertie (faite très vite et certains groupes sont venue me voir pour demander conseil) |
| Degez Romain     | Les Routes et le serveur qui fonctionne bien                                                                |
| Martel Alexandre | Les collisions                                                                                              |