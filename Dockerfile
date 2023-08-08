FROM node:18-slim as base

WORKDIR /app
COPY package*.json /
EXPOSE 4000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . /app
CMD ["node", "start"]