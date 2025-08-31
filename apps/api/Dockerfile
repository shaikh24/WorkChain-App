FROM node:20-alpine
WORKDIR /app
COPY package.json package.json
RUN npm i -g pnpm && pnpm install --prod=false
COPY tsconfig.json tsconfig.json
COPY src src
RUN pnpm build
EXPOSE 4000
CMD ["node","dist/server.js"]
