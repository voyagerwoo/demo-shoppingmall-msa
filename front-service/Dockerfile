FROM node:lts-alpine
RUN apk --no-cache add curl
RUN adduser -D -s /bin/sh app
USER app

WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .

ENV PROFILE=SWARM

EXPOSE 8080
ENTRYPOINT [ "node", "index.js" ]