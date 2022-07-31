FROM node:14.17

WORKDIR /backend

COPY package*.json ./

RUN npm cache --force clean && npm install --force node-sass
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start:dev" ]
