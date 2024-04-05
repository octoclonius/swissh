# syntax=docker/dockerfile:1

FROM node:21-alpine as base

RUN apk add --update --no-cache openssh bash make python3 g++ openssl
WORKDIR /usr/src/app
COPY package*.json .

FROM base as dev
ENV NODE_ENV development
EXPOSE 9229
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY src src
USER node
CMD npm run dev

FROM base as prod
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY src src
USER node
CMD node src/index.js

FROM base as test
ENV NODE_ENV test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY src src
COPY spec spec
USER node
RUN npm run test