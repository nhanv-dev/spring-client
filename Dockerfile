FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -f

COPY . .

CMD ["npm", "start"]

