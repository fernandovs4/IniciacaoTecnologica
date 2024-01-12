# Use an official Node.js runtime as a base image
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos da aplicação para o diretório de trabalho
COPY . .


# Expõe a porta 3000 (a porta padrão para aplicativos React)
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "start"]
