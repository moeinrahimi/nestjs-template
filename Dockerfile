FROM node:20.13.1-alpine AS builder
#SHELL ["/bin/bash", "-eo", "pipefail", "-c"]

WORKDIR /app
COPY package*.json ./
RUN npm i 
COPY . .
RUN npm run db:generate
RUN npm run build

FROM node:20.13.1-alpine AS production
ARG NODE_ENV
ARG PORT
ENV TZ=Asia/Tehran
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

HEALTHCHECK CMD curl --fail http://localhost:${PORT}/api/health || exit 1  
EXPOSE ${PORT}
CMD ["node", "dist/main.js"]
