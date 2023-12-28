FROM node:alpine as base

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR dist

COPY package*.json ./

RUN npm install --only=production

CMD ["node", "./main.js"]
