# ecommerceter


Tutorial:
-> Acceder au dossier ave le projet
cd /Applications/XAMPP/xamppfiles/htdocs/ter/bakend/app

-> Instalar:
npm install express body-parser morgan mongoose jsonwebtoken --save

sudo npm install -g nodemon

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

