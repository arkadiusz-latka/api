FROM node:14

WORKDIR /

COPY package.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

ENV NODE_ENV production

CMD ["node", "server.js"]