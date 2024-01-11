FROM node:current-alpine as build
WORKDIR /projeto-iniciacao/
COPY public/ /projeto-iniciacao/public
COPY src/ /projeto-iniciacao/src
COPY package.json /projeto-iniciacao/
RUN npm install
RUN npm run build

EXPOSE 80