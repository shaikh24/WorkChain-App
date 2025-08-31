FROM node:20-alpine
WORKDIR /app
COPY package.json package.json
RUN npm i -g pnpm && pnpm install --prod=false
COPY index.html index.html
COPY tsconfig.json tsconfig.json
COPY vite.config.ts vite.config.ts
COPY tailwind.config.js tailwind.config.js
COPY postcss.config.js postcss.config.js
COPY src src
EXPOSE 5173
CMD ["pnpm","dev","--host","0.0.0.0"]
