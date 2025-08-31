FROM node:20-alpine

WORKDIR /app

# Copy root-level files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy monorepo packages
COPY packages ./packages

# Copy apps (api, web, etc.)
COPY apps ./apps

# Install dependencies for API
RUN corepack enable && pnpm -C apps/api install --frozen-lockfile

# Build API
RUN pnpm -C apps/api build

# Environment + port
ENV PORT=10000
EXPOSE 10000

# Start API
CMD ["pnpm", "-C", "apps/api", "start"]
