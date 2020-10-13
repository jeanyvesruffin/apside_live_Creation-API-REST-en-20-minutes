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

 [Json-server](https://github.com/typicode/json-server), vas nous servir pour creer une API REST a l'aide d'un simple fichier json.

*Installer json-server*

```cmd
npm install -g json-server
```
 [Faker.js](https://github.com/marak/Faker.js/), vas nous permettre de generer des donnees consistantes a notre API.

*Installer Faker.js*

```cmd
// Dans le repertoire ou se trouve le fichier db.json initialiser un projet node pour avoir une gestion de dependance de nos librairies.
npm init

// Installation des deux dependances necessaire a faker.js
npm install faker lodash

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

 **Gestion des header et methode GET, POST, PUT, DELETE**

La gestion est faite par json-server, sur linux au prealable apt install httpie.

*Exemple GET*

```cmd
http: GET localhost:3000/people

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 83
Content-Type: application/json; charset=utf-8
Date: Fri, 09 Oct 2020 12:51:14 GMT
ETag: W/"53-GeOSAa47+AHNkV8UyD3vdhVvRhE"
Expires: -1
Pragma: no-cache
Vary: Origin, Accept-Encoding
X-Content-Type-Options: nosniff
X-Powered-By: Express

[
    {
        "id": 0,
        "name": "Bob"
    },
    {
        "id": 1,
        "name": "John"
    }
]
```

*Exemple POST*

```cmd
http POST localhost:3000/people name="John"

HTTP/1.1 201 Created
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: Location
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 31
Content-Type: application/json; charset=utf-8
Date: Fri, 09 Oct 2020 12:53:41 GMT
ETag: W/"1f-A593xeI3WGK800I3cLQJBqqQ3kI"
Expires: -1
Location: http://localhost:3000/people/2
Pragma: no-cache
Vary: Origin, X-HTTP-Method-Override, Accept-Encoding
X-Content-Type-Options: nosniff
X-Powered-By: Express

{
    "id": 2,
    "name": "John"
}
```

*Exemple PUT*

```cmd
http PUT localhost:3000/people/2 name="Christophe"

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 37
Content-Type: application/json; charset=utf-8
Date: Fri, 09 Oct 2020 12:56:59 GMT
ETag: W/"25-zeJTOk2Ppldu4kEVKZ98gKS3O5I"
Expires: -1
Pragma: no-cache
Vary: Origin, Accept-Encoding
X-Content-Type-Options: nosniff
X-Powered-By: Express

{
    "id": 2,
    "name": "Christophe"
}
```

*Exemple DELETE*

```cmd
http DELETE localhost:3000/people/2

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 2
Content-Type: application/json; charset=utf-8
Date: Fri, 09 Oct 2020 12:58:41 GMT
ETag: W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Expires: -1
Pragma: no-cache
Vary: Origin, Accept-Encoding
X-Content-Type-Options: nosniff
X-Powered-By: Express

{}
```

**Important**
Nous pouvons constater que le fichier db.json se modifie en consequence.

### Generation de donnees consistant

Utilisation de faker.

Creer un module (au sens node) generator qui exporte une seul fonction. Puis utiliser lodash qui permettra d'executer la fonction plusieurs fois pour peupler nos donnees.

Permet de generer 1000 personnes dans 100 entreprise

```js
module.exports = function () {
    let faker = require("faker");
    let _ = require("lodash");
    return {
        people: _.times(1000, (n) => {
            return {
                id: n,
                name: faker.name.findName(),
                job: faker.name.jobTitle(),
                mail: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                avatar: faker.internet.avatar(),
                companyId: faker.random.number(99)
            }
        }),
        companies: _.times(100, (n) => {
            return {
                id: n,
                name: faker.company.companyName(),
                catchPhrase: faker.company.catchPhrase(),
            }
        })
    }
}
```

Pour generer enfin le server REST nous tappons la commande suivante:


```cmd
json-server generator.js
```

Nous pouvons changer la langue des donnees en ajoutant
```js
let faker = require("faker/locale/fr");
```

### Mettre en relation nos peoples et entreprises

Pour une liaison one to many (peupler les entreprises de peoples)

Tapper dans l'url http://localhost:3000/companies/?_embed=people

Pour une liaison many to one (rattacher un people à une entreprise)

http://localhost:3000/peoples/?_expand=company 

### Travaillons avec les urls

* Ajout de parametres pour prendre le json de l'id 20 a 29 

url : http://localhost:3000/peoples/?_expand=company&_start=20&_end=30

* Faire une recherche sur des valeurs numeriques (ex company Id > 50)

url : http://localhost:3000/peoples/?companyId_lte=50

* Faire une recherche sur des valeurs numeriques (ex company Id < 50)

url : http://localhost:3000/peoples/?companyId_lte=50

* Recherche exact (ex name: Philibert Dubois)

url : http://localhost:3000/peoples/?name=Philibert%20Dubois

* Travail avec un like (ex name= commencant par Pa)

http://localhost:3000/peoples/?name_like=Pa

* Recherche full text sur tous les attributs (ex con pour rechercherr les consultants)

http://localhost:3000/peoples/?q=con

### Customiser les url routage

Creer un fichier route.js

```json
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

Demarrer JSON Server avec `--routes` option.

```cmd
json-server db.json --routes routes.json
```

Vous pouvez desormais acceder aux ressources en utilisant des routes supplémentaires.

```cmd
/api/posts # → /posts
/api/posts/1  # → /posts/1
/posts/1/show # → /posts/1
/posts/javascript # → /posts?category=javascript
/articles?id=1 # → /posts/1
```

### Sauvegarder des données

```cmd
ctrl + s
```


### Quitter json-server

```cmd
Ctrl + C
```



