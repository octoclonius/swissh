# syntax=docker/dockerfile:1

ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/frontend

FROM base as dev
ENV NODE_ENV development
COPY package*.json .
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY public public
COPY src src
#USER node
CMD npm run start

FROM base as prod
ENV NODE_ENV production
COPY package*.json .
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY public public
COPY src src
RUN npm run build
RUN npm install -g serve
USER node
CMD serve -s build --ssl-cert "/etc/ssl/certs/certificate.pem" --ssl-key "/etc/ssl/private/key.pem"

FROM base as test
ENV NODE_ENV test
COPY package*.json .
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY public public
COPY src src
USER node
RUN npm run test