FROM node:14

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]