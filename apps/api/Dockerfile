# Step 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only backend files
COPY apps/api ./apps/api
WORKDIR /app/apps/api

# Install dependencies (dev bhi for build)
RUN pnpm install

# Build TypeScript
RUN pnpm run build

# Step 2: Runtime Stage
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy built files and required metadata
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json .

# Expose port (Render expects 10000 default)
ENV PORT=10000
EXPOSE 10000

# Start server
CMD ["node", "dist/server.js"]
