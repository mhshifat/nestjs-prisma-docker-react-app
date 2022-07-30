## Installing / Getting started

A quick introduction of the minimal setup needs to get the application up &
running.

###### Project depends on
- Docker
- NodeJS
- NPM

Follow these simple steps to have the project running on your machine. Please note the project depends on nodejs and docker to be installed in the system.

```shell
git clone https://github.com/mhshifat/nestjs-prisma-docker-react-app.git
cd nestjs-prisma-docker-react-app
docker-compose up --build
```

open up a new terminal and type

```shell
cd nestjs-prisma-docker-react-app
npm run migrate
npm run start:dev
```

open up a new terminal and type

```shell
cd nestjs-prisma-docker-react-app/client
npm start
```

Now you are ready to visit this application by going on
- Frontend: http://localhost:3000
- Backend: http://localhost:5000