# Root Dockerfile for Render
FROM node:20-alpine

WORKDIR /app

# Copy workspace configs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy required folders
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies only for api
RUN corepack enable && pnpm -C apps/api install --frozen-lockfile

# Build TypeScript backend
RUN pnpm -C apps/api build

# Expose port
ENV PORT=10000
EXPOSE 10000

# Start backend
CMD ["pnpm", "-C", "apps/api", "start"]
