# apside_live

## Creation API REST en 20 minutes

### Objectifs:
* Monter une API REST
* Generer un jeu de donnees
* Exposer l'API sur le web

### Pourquoi:
* Faire un POC
* Tester une techno

### Problemes:
* La competence
* Le temps
* Le courage

### Exemple API:

[APILAND](https://faraazahmad.github.io/apiland/#/explore)

Dans le cadre d'une demo pour un client il existe [JSONPlaceholder](https://jsonplaceholder.typicode.com/) qui propose des ressources d'api.

Outils

### Outils

 [Json-server](https://github.com/typicode/json-server), vas nous servir de creer une API REST a l'aide d'un simple fichier json.

*Installer json-server*

```cmd
npm install -g json-server
```

### Realisation API

*Creation db.json*

Simple fichier json contenant un tableau de personnes.

```json
{
    "people":[
        {
            "id":0,
            "name":"Bob"
        },
        {
            "id":1,
            "name":"John"
        }
    ]
}
```

De retour dans le terminal, on execute le fichier db.json sur le json-server.

```cmd
json-server db.json

```

En allant sur l'url http://localhost:3000, nous pouvons voir que l'on viens de demarrer notre server REST avec un endpoint sur people x2.
 
 Nous pouvons interroger un people en particulier en lui mettant dans l'url l'index. http://localhost:3000/people/0 (retourne sur Bob)

 **Gestion des header**
 
