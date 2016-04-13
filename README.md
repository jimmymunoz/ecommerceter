# ecommerceter
https://github.com/jimmymunoz/ecommerceter

Tutorial:
-> Acceder au dossier du projet
cd /Applications/XAMPP/xamppfiles/htdocs/ecommerceter/backend

-> Instalar:
//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
npm install express body-parser morgan mongoose jsonwebtoken --save
npm install finalhandler serve-static	
npm install --save mongoose-auto-increment
npm install cors
npm install mongoose-file
npm install mongoose-paginate
npm install express-redirect
npm install validator
npm uninstall express-redirect

https://www.npmjs.com/package/express-redirect
https://www.npmjs.com/package/mongoose-paginate


sudo npm install -g nodemon
sudo npm install -g n

export NODE_PATH=/Applications/XAMPP/xamppfiles/htdocs/ecommerceter/backend/node_modules

Terminal 1
node server webserver.js
Terminal 2
node server server.js
Terminal 3
mongod

Server
/usr/local/bin/mongodb/bin/mongod
Terminal
/usr/local/bin/mongodb/bin/mongo

/usr/local/bin/mongodb/bin/mongoimport

Authentication:


POST http://localhost:8080/user/setup

POST http://localhost:8080/user/authenticate

x-www-form-urlencoded
name: 'Nick Cerminara', 
password: 'password',


http://localhost:8080/user/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NDY1MDViMDFmYTAzYmUwMTUxMDYwOWIiLCJuYW1lIjoiTmljayBDZXJtaW5hcmEiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiYWRtaW4iOnRydWUsIl9fdiI6MH0.ah-NFQ1967WVeN6lYNAahT7hZtshG6kw6AW3ncuJOYw

export PATH=$PATH:/usr/local/bin/mongodb/bin/ 
export NODE_PATH=/usr/local/lib/node_modules


Errors:
Windows kerberos:
https://github.com/Automattic/mongoose/issues/3860

rm -rf ./node_modules/mongoose/node_modules/mogodb
npm install --prefix ./node_modules/mongoose/ mongodb@2.1.6 --save


-------
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

--------
REACT:

npm install --save react react-dom babel-preset-react
npm install babel-preset-es2015 

cd /Applications/XAMPP/xamppfiles/htdocs/ecommerceter/frontend/angular-react
babel --presets react react-src/ --watch --out-dir react-build/


