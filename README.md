# nestjs-template

This template provides a starting point for building services using NestJS, Fastify, and PostgreSQL. It incorporates Prisma ORM for database interactions and enforces specific naming conventions and best practices to ensure consistency across projects.

## Stack

- **Framework**: NestJS + Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Node.js**: 20.13.1 LTS

## Conventions

- **Naming Convention**: camelCase for files,variables and PascalCase for class names
- **Module Convention**: naming module directory must be singular
- **Types over Interfaces**: Prefer using Types wherever possible. Use Interfaces only when necessary liken when using 
- **Husky is Enabled**: before commits add to git husky runs linter and prettifier to make sure all standards are achieved
generics.
- **File Naming**: File names should be descriptive of their content. For example:
  - `user.type.ts`: Contains types related to the user.

## Requirements for Each Module

- **Swagger Annotations**: Each module must include Swagger annotations for API documentation.
- **Unit Tests**: Each module must have its own unit tests to ensure functionality and reliability.

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the provided `.env.example` and edit it if needed:

   ```bash
   cp .env.example .env
   ```

3. Start the required services using Docker:

   ```bash
   docker compose up postgres
   docker compose up rabbitmq
   docker compose up push
   ```

4. Run the development server:
   ```bash
   npm run start:dev
   ```

## Examples

### Creating a User Module

1. **Define User Types and DTOs**: Create a folder named `user` with subfolders for `types` and `dto`. Define the types and DTOs in these folders.

   ```typescript
   // user/types/user.type.ts
   export type User = {
     id: string;
     name: string;
     email: string;
     password: string;
   };
   ```

   ```typescript
   // user/dto/create-user.dto.ts
   import { IsString, IsEmail, Length } from 'class-validator';
   export class CreateUserDto {
     @IsString()
     @Length(3, 255)
     name: string;

     @IsEmail()
     email: string;

     @IsString()
     @Length(6, 255)
     password: string;
   }
   ```

2. **Create User Service**: Implement the service logic in `user.service.ts`.

   ```typescript
   // user/user.service.ts
   import { Injectable } from '@nestjs/common';
   import { PrismaService } from '../prisma/prisma.service';
   import { CreateUserDto } from './dto/create-user.dto';
   import { User } from './types/user.type';

   @Injectable()
   export class UserService {
     constructor(private readonly prisma: PrismaService) {}

     async createUser(data: CreateUserDto): Promise<User> {
       return this.prisma.user.create({ data });
     }

     async getUserById(id: string): Promise<User> {
       return this.prisma.user.findUnique({ where: { id } });
     }

     async getAllUsers(): Promise<User[]> {
       return this.prisma.user.findMany();
     }
   }
   ```

3. **Implement User Controller**: Create the controller in `user.controller.ts` and add Swagger annotations.

   ```typescript
   // user/user.controller.ts
   import { Controller, Get, Post, Body, Param } from '@nestjs/common';
   import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
   import { UserService } from './user.service';
   import { CreateUserDto } from './dto/create-user.dto';
   import { User } from './types/user.type';

   @ApiTags('users')
   @Controller('users')
   export class UserController {
     constructor(private readonly userService: UserService) {}

     @Post()
     @ApiOperation({ summary: 'Create a new user' })
     @ApiResponse({ status: 201, description: 'User created successfully' })
     async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
       return this.userService.createUser(createUserDto);
     }

     @Get(':id')
     @ApiOperation({ summary: 'Get user by ID' })
     @ApiResponse({ status: 200, description: 'User retrieved successfully' })
     async getUserById(@Param('id') id: string): Promise<User> {
       return this.userService.getUserById(id);
     }

     @Get()
     @ApiOperation({ summary: 'Get all users' })
     @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
     async getAllUsers(): Promise<User[]> {
       return this.userService.getAllUsers();
     }
   }
   ```

4. **Unit Tests**: Write unit tests for the user module in `user.service.spec.ts`.

   ```typescript
   // user/user.service.spec.ts
   import { Test, TestingModule } from '@nestjs/testing';
   import { UserService } from './user.service';
   import { PrismaService } from '../prisma/prisma.service';

   describe('UserService', () => {
     let service: UserService;
     let prismaService: PrismaService;

     beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
         providers: [UserService, PrismaService],
       }).compile();

       service = module.get<UserService>(UserService);
       prismaService = module.get<PrismaService>(PrismaService);
     });

     it('should be defined', () => {
       expect(service).toBeDefined();
     });

     // Add more tests for different service methods
   });
   ```
