FROM node:20.13.1-alpine AS builder
SHELL ["/bin/bash", "-eo", "pipefail", "-c"]

WORKDIR /app
COPY package*.json ./
RUN npm i 
COPY . .
RUN npm run build

FROM node:20.13.1-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
HEALTHCHECK CMD curl --fail http://localhost:3000/api/health || exit 1  
EXPOSE 3000
CMD ["node", "dist/main.js"]





