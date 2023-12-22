FROM node:18-alpine
WORKDIR /projeto-iniciacao/
COPY public/ /projeto-iniciacao/public
COPY src/ /projeto-iniciacao/src
COPY package.json /projeto-iniciacao/
RUN npm install
CMD ["npm", "start"]