FROM node:20-alpine
WORKDIR /app
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/api ./apps/api
RUN corepack enable && pnpm -C apps/api install --frozen-lockfile || true
RUN pnpm -C apps/api build
ENV PORT=4000
EXPOSE 4000
CMD ["pnpm","-C","apps/api","start"]
