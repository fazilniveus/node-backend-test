FROM node:14-alpine

RUN mkdir -p /app
RUN mkdir -p /node-backend-common

COPY /node-backend-common /node-backend-common

WORKDIR /node-backend-common

RUN npm install

COPY /node-backend-admin /app

WORKDIR /app

RUN npm install

EXPOSE 5001

CMD ["node", "index.js"]