FROM node:18-slim AS build_stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM build_stage AS serve_stage

COPY --chown=node:node . .

RUN npm install -g serve

USER node

ENV PORT=3001

CMD ["sh", "-c", "serve -s dist -p $PORT"]