# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app/backend/services

# Copy package files
COPY ./backend/services/package.json ./backend/services/yarn.lock ./

# Install dependencies without --frozen-lockfile
RUN yarn install

# Copy the rest of the application files
COPY ./backend/services .

# Set environment variable
ENV NODE_ENV=production

# Install NestJS CLI temporarily, build the project, and then remove the CLI
RUN yarn add @nestjs/cli@9.0.0 --dev \
    && yarn run build \
    && yarn remove @nestjs/cli \
    && yarn cache clean --force

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
