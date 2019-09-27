FROM node:lts-alpine
RUN apk --no-cache add curl

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
ENTRYPOINT [ "node", "index.js" ]