FROM node:18-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node
CMD [ "node", "createRandomTodo.js" ]