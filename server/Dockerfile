FROM node:18-alpine As build

WORKDIR /usr/src/app/api

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
