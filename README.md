There are two applications -

Server built on Nest.js

- launch with command "docker-compose up"
- Environment on docker with docker-compose.
  Server itself on :8080 port
  Mongodb on default port :27017
- Swagger documentation on /api/docs
- Bootstrap service that fulfills the DB if it is empty (for testing purposes)

Client built on clean node.js

- Launch with command "yarn dev"
- Based on embedded package readline
- Client implements clean architecture approach
