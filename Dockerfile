# Step 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root configs first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies (workspace aware)
RUN pnpm -C apps/api install--no --frozen-lockfile

# Build TypeScript
RUN pnpm -C apps/api build

# Step 2: Runtime Stage
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy only build artifacts
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json .

ENV PORT=10000
EXPOSE 10000

CMD ["node", "dist/server.js"]
