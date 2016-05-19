# ecommerceter

https://github.com/jimmymunoz/ecommerceter
--------------------------------------------------------
Application de démonstration
--------------------------------------------------------

---------------
Sujet
---------------
Notre TER porte sur la comparaison de différents Frameworks JavaScript (Angular 1.0 + React, Backbone, Ember) selon divers critères au travers d’une application de e-commerce .


---------------
Finalité
---------------
Développer deux applications fonctionnelles e-commerce avec chacun des frameworks (Angular 1 + React, Ember, Backbone). 

Comparaison intra-groupe (ente Angular 1.0 + React , Ember, Backbone) et inter-groupe (nos frameworks et ceux étudiés par le groupe “JS_Fighters_Team_RLC : G1POMPIDOR”). 


---------------
Fonctionnalités
---------------
Rôle Client
Gerer son profil:
Dans cette partie, le client pourra:

  - Créer un compte.
  - Se connecter.
  - Modifier les informations le concernant.
  - Changer de mot de passe.
  - Se déconnecter.


Consulter le  catalogue des produits:
Le catalogue des produits sera disponible aux clients. Ils pourront:

  - Chercher les produits par mot clé.
  - Lister les produits qui sont triés par catégorie. 
  - Sélectionner le produit pour voir une fiche détaillée du produit.
    
Gerer son panier:
La Gestion du panier est utilisé pour créer une nouvelle Commande avec les produits choisis.

  - Ajouter des produits au panier.
  - Consulter la liste des produits ajoutés avec leur quantité. 
  - Retirer des produits du panier.
  - Créer une nouvelle Commande.
  
Gerer ses commandes:
Dans l'application le client pourra:

  - Passer une commande.
  - Effectuer le paiement. 
  - Suivre sa commande.
  - Consulter la liste de ses commandes.

Gerer ses commentaires:
Dans cette section il est question de la gestion des commentaires faites par les utilisateurs sur les produits vendus. Le client a la possibilité de:

  - Écrire un commentaire.
  - Modifier son commentaire. 
  - Supprimer son commentaire.
 

Evaluer les produits :
Le client a la possibilité d' ajouter une evaluation à un ou plusieurs produits.


Rôle Administrator
Gerer profils:
Section destinée à la gestion des profils differents des utilisateurs, un administrateur pourra donc:
 
  - Se connecter.
  - Consulter la liste des clients.
  - Ajouter d’autres administrateurs.
  - Supprimer un administrateur.

Gerer le catalogue des produits:
Cette gestion de catalogue des produits qui comprend:
 
  - Création de produits.
  - Modification de produits.
  - Suppression de produits.
  - lister les produits.
  - Création de catégories.
  - Modification de catégories.
  - Suppression de catégories.
  - Lister les catégories.

Gerer les commandes:
L'adiministrateur pourra gerer les commandes des clients en fonction des demandes de ces derniers. Il peut donc:

  - Modifier une commande.
  - Annuler une commande. 
  - Consulter la liste des commandes.
  - préparer la livraison d’une commande si elle est validée.
 

Gerer ses commentaires:
Ici on va aborder la gestion de commentaires des clients par l’administrateur. L’administrateur pourra uniquement:

  - Supprimer le commentaire d’un utilisateur.
--------------------------------------------------------
--------------------------------------------------------
  


--------------------------------------------------------
Liens et commandes pour l'execution:
--------------------------------------------------------

Tutoriel:
--------------------------------------------------------
-> Acceder au dossier du projet
cd /Applications/XAMPP/xamppfiles/htdocs/ecommerceter/backend

--------------------------------------------------------
-> Plugins Server:
//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
npm install express body-parser morgan mongoose jsonwebtoken --save
npm install finalhandler serve-static	
npm install --save mongoose-auto-increment
npm install cors
npm install mongoose-file
npm install mongoose-paginate
npm install express-redirect
npm install validator

sudo npm install -g nodemon
sudo npm install -g n

export NODE_PATH=/Applications/XAMPP/xamppfiles/htdocs/ecommerceter/backend/node_modules
export PATH=$PATH:/usr/local/bin/mongodb/bin/ 
export NODE_PATH=/usr/local/lib/node_modules

--------------------------------------------------------
Errors Instalation Windows:
	Windows kerberos:
	https://github.com/Automattic/mongoose/issues/3860

	rm -rf ./node_modules/mongoose/node_modules/mogodb
	npm install --prefix ./node_modules/mongoose/ mongodb@2.1.6 --save

--------------------------------------------------------
Liens Server

https://www.npmjs.com/package/express-redirect
https://www.npmjs.com/package/mongoose-paginate

--------------------------------------------------------
--> NodeJs:

Terminal 1
	node server webserver.js
Terminal 2
	node server server.js
Terminal 3
	mongod 
Terminal 4 (Seulement Developpement React)
	cd /Applications/XAMPP/xamppfiles/htdocs/ecommerceter/frontend/angular-react
	babel --presets react react-src/ --watch --out-dir react-build/

--------------------------------------------------------
--> Mongo:

MongoD
	/usr/local/bin/mongodb/bin/mongod
Mongo
	/usr/local/bin/mongodb/bin/mongo
Mongo Import
	/usr/local/bin/mongodb/bin/mongoimport

--------------------------------------------------------
--> Authentication:


Example chemins:
POST http://localhost:8080/user/setup

POST http://localhost:8080/user/authenticate

x-www-form-urlencoded
name: 'myappeu', 
password: 'password',


http://localhost:8080/user/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NDY1MDViMDFmYTAzYmUwMTUxMDYwOWIiLCJuYW1lIjoiTmljayBDZXJtaW5hcmEiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiYWRtaW4iOnRydWUsIl9fdiI6MH0.ah-NFQ1967WVeN6lYNAahT7hZtshG6kw6AW3ncuJOYw

--------------------------------------------------------
FRONT-END:

http://bower.io/

sudo npm install -g bower

$ bower install

$ bower install jquery
$ bower install ember
$ bower install backbone

https://github.com/ngReact/ngReact

bower install --save ngReact
bower install --save react
bower install --save angular
bower install --save ember
bower install --save backbone
bower install --save angular-utils-pagination

--------------------------------------------------------
REACT:

npm install --save react react-dom babel-preset-react
npm install babel-preset-es2015 

cd /Applications/XAMPP/xamppfiles/htdocs/ecommerceter/frontend/angular-react
babel --presets react react-src/ --watch --out-dir react-build/


