# syntax=docker/dockerfile:1

FROM node:21-alpine as base

WORKDIR /usr/src/app
COPY package*.json .
COPY public public

FROM base as dev
ENV NODE_ENV development
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
RUN mkdir '/usr/src/app/node_modules/.cache' && \
    chmod -R 777 node_modules/.cache
COPY src src
USER node
CMD npm run docker-start

FROM base as prod
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY src src
RUN npm run docker-build
RUN npm install -g serve
USER node
CMD serve -s build --ssl-cert "/usr/src/ssl/certs/certificate.pem" --ssl-key "/usr/src/ssl/private/key.pem"

FROM base as test
ENV NODE_ENV test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY src src
USER node
RUN npm run docker-test