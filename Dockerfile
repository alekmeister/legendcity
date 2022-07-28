FROM node:14.19.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .