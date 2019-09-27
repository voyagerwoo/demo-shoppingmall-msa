FROM node:lts-alpine
RUN apk --no-cache add curl
RUN adduser -D -s /bin/sh app
USER app

WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3002
ENTRYPOINT [ "node", "index.js" ]