# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Use Node.js version 21 based on Alpine Linux (lightweight, secure).
FROM node:21-alpine as base

# Install OpenSSH, Bash, and packages for node-pty.
RUN apk add --update --no-cache openssh bash make python3 g++ openssl

# Set working directory.
WORKDIR /usr/src/app


########################################
# DEVELOPMENT BUILD
FROM base as dev

# Use development node environment.
ENV NODE_ENV development

# Expose the default inspection port for nodemon.
EXPOSE 9229

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
COPY package*.json .
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy src files to container.
COPY src src

# Run the application as a non-root user.
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
USER node

# Run the application.
CMD npm run dev


########################################
# PRODUCTION BUILD
FROM base as prod
ENV NODE_ENV production

# Can omit dev deps for prod
COPY package*.json .
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY src src

USER node
CMD node src/index.js


########################################
# TEST BUILD
FROM base as test
ENV NODE_ENV test

COPY package*.json .
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY src src
COPY spec spec

USER node
RUN npm run test