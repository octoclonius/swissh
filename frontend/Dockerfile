# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20

# Use Node.js version 20 based on Alpine Linux (lightweight, secure).
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/wissh-frontend
COPY package*.json .

FROM base as prod
ENV NODE_ENV production

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY index.js .

EXPOSE 8080

CMD node index.js