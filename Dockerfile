# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20

# Use Node.js version 20 based on Alpine Linux (lightweight, secure)
FROM node:${NODE_VERSION}-alpine as base

# Install OpenSSH, Bash, and packages for node-pty
RUN apk add --update --no-cache openssh bash make python3 g++ openssl

# Generate SSL certificate
RUN openssl req -newkey rsa:4096 -noenc -keyout /etc/ssl/private/key.pem -x509 -days 365 -out /etc/ssl/certs/certificate.pem -subj "/CN=wissh" && \
    chmod 444 /etc/ssl/private/key.pem

# Expose the port that the application listens on.
EXPOSE 443

# Set working directory.
WORKDIR /usr/src/app


########################################
# DEVELOPMENT BUILD
FROM base as dev

# Expose the default inspection port for nodemon
EXPOSE 9229

# Use development node environment.
ENV NODE_ENV development

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

# Run the application as a non-root user.
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
USER node

# Copy the rest of the source files into the image.
COPY . .

# Run the application.
CMD npm run dev


########################################
# PRODUCTION BUILD
FROM base as prod

# Use production node environment.
ENV NODE_ENV production

# Copy package.json and package-lock.json to the app directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy only the modified files from your local node_modules
COPY ./node_modules ./node_modules
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY . .

# Run the application.
CMD node app.js


########################################
# TEST BUILD
FROM base as test

# Use test node environment by default.
ENV NODE_ENV test

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

USER node

COPY . .

# Test the application.
RUN npm run test