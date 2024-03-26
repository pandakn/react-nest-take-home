FROM node:18-alpine as build

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

