FROM node:20-alpine
WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy workspace configs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy folders
COPY ./apps ./apps
COPY ./packages ./packages

# Go inside API app
WORKDIR /app/apps/api

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build API
RUN pnpm run build

# Expose and run
ENV PORT=4000
EXPOSE 4000
CMD ["pnpm", "start"]
