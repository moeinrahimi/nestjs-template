# withdrawal-service

Nestjs + fastify + postgre
Node: 20.13.1 LTS
Orm: prisma
Naming convention: camelCase
start

# development

npm i
create .env from .env.example and edit if needed
docker compose up postgres
docker compose up rabbitmq
npm run db:push
npm run start:dev
