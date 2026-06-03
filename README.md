# 🚀 AWS Backend

Modern backend built with **TypeScript** that simulates AWS services locally for fast, efficient development. It combines SQL and NoSQL services with full authentication, file storage, and image processing via Lambda.

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Docker Services](#-docker-services)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Key Features

- 🔐 **JWT Authentication** with AWS Cognito (Cognito Local)
- 💾 **Dual Database**: PostgreSQL (relational) + DynamoDB (NoSQL)
- 📦 **S3 Storage** for product images
- 🖼️ **Image Processing** with AWS Lambda (thumbnail generation)
- 🐳 **Full Local Development** with LocalStack
- 🔄 **Hot Reload** for agile development
- 📝 **Logging** with Winston
- 🛡️ **Type Safety** with TypeScript
- ✅ **Code Quality** with ESLint + Prettier

---

## 🛠 Tech Stack

### **Core Backend**
| Technology      | Purpose                       | Version |
| --------------- | ----------------------------- | ------- |
| **Node.js**     | JavaScript/TypeScript runtime | ≥ 18.x  |
| **TypeScript**  | Static typing                 | ^5.x    |
| **Express**     | RESTful web framework         | ^5.x    |
| **ts-node-dev** | Hot reload during development | ^2.x    |

### **Databases**
| Service        | Type            | ORM/ODM   |
| -------------- | --------------- | --------- |
| **PostgreSQL** | Relational SQL  | TypeORM   |
| **DynamoDB**   | NoSQL Key-Value | Dynamoose |

### **AWS Services (Simulated)**
| Service      | Purpose                    | Local Tool    |
| ------------ | -------------------------- | ------------- |
| **Cognito**  | Authentication/Authorization | Cognito Local |
| **DynamoDB** | NoSQL database             | LocalStack    |
| **S3**       | File storage               | LocalStack    |
| **Lambda**   | Image resizing             | LocalStack    |

### **Security & Authentication**
- `jsonwebtoken` → JWT handling
- `jwks-rsa` / `jwk-to-pem` → Cognito token validation
- `bcryptjs` → Password encryption
- `@aws-sdk/client-cognito-identity-provider` → Cognito client

### **Utilities**
- `winston` → Logging system
- `multer` → Multipart file uploads
- `sharp` → Image processing
- `axios` → HTTP client
- `uuid` → Unique ID generation
- `env-var` + `dotenv` → Typed environment variables

### **Development**
- `ESLint` + `Prettier` → Linting and formatting
- `typescript-eslint` → ESLint rules for TS
- `cross-env` → Cross-platform environment variables

---

## 📦 Prerequisites

Make sure you have installed:

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Docker** ≥ 20.x
- **Docker Compose** ≥ 2.x

---

## 🔧 Installation

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd aws-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start Docker services

```bash
docker-compose up -d
```

This will start:
- ✅ PostgreSQL on port `5432`
- ✅ Cognito Local on port `9229`
- ✅ LocalStack on port `4566` (DynamoDB, S3, Lambda)

### 4️⃣ Create the Cognito User Pool and Client App

```bash
npm run cognito:init
```

This script creates a User Pool, an App Client, and a test user
(`test@example.com` / `Test1234`). Copy the `Pool ID` and `Client ID`
shown in the console into your `.env` file.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root (you can start from `.env.example`):

```env
# Application
NODE_ENV=development
PORT=4000

# AWS Global
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test

# Cognito
COGNITO_USER_POOL_ID=local_xxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxx
COGNITO_ENDPOINT=http://localhost:9229

# DynamoDB
DYNAMODB_ENDPOINT=http://localhost:4566
DYNAMODB_TABLE_NAME=orders

# S3
S3_ENDPOINT=http://localhost:4566
S3_BUCKET_NAME=my-products-bucket

# Lambda
LAMBDA_ENDPOINT=http://localhost:4566

# PostgreSQL
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/ordersdb
```

---

## 🚀 Usage

### Available Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run build`        | Compiles TypeScript → JavaScript   |
| `npm start`            | Runs the server with ts-node       |
| `npm run start:dev`    | Development with hot reload ⚡       |
| `npm run start:prod`   | Production (compiled code)         |
| `npm run cognito:init` | Initializes the Cognito User Pool  |
| `npm run lint`         | Analyzes code with ESLint          |
| `npm run lint:fix`     | Auto-fixes ESLint issues           |

### Local Development

```bash
npm run start:dev
```

The server will be available at `http://localhost:4000` (per `PORT`).

### Production

```bash
npm run build
npm run start:prod
```

---

## 📁 Project Structure

```
aws-backend/
├── src/
│   ├── config/
│   │   └── envs.ts              # Typed environment variables
│   ├── shared/
│   │   └── auth.middleware.ts   # JWT authentication middleware
│   ├── users/                   # Users / Cognito module
│   │   ├── auth.service.ts
│   │   ├── cognito.client.ts
│   │   ├── user.controller.ts
│   │   ├── user.entity.ts
│   │   └── user.routes.ts
│   ├── products/                # Products module (DynamoDB + S3)
│   │   ├── dynamoose.ts
│   │   ├── product.model.ts
│   │   ├── product.repository.ts
│   │   ├── product.service.ts
│   │   ├── product.controller.ts
│   │   ├── product.routes.ts
│   │   └── s3.client.ts
│   ├── orders/                  # Orders module (PostgreSQL)
│   │   ├── datasource.ts
│   │   ├── order.entity.ts
│   │   ├── order.service.ts
│   │   ├── order.controller.ts
│   │   └── order.routes.ts
│   ├── lambda/
│   │   └── lambda.client.ts     # Lambda client for image resizing
│   └── index.ts                 # Entry point
├── cognito-init.js              # Cognito initialization script
├── docker-compose.yml           # Docker services
├── .env.example                 # Environment variables template
├── package.json
└── tsconfig.json
```

---

## 🔌 API Endpoints

### Authentication (`/auth`)

```http
POST   /auth/register    # Register a user in Cognito
POST   /auth/login       # Log in (returns tokens)
GET    /auth/profile     # Authenticated user's profile 🔒
```

### Products (`/products`)

```http
GET    /products         # List products (DynamoDB)
GET    /products/:id     # Get product by ID
POST   /products/upload  # Upload image to S3 + thumbnail via Lambda 🔒
POST   /products         # Create product 🔒
```

### Orders (`/orders`)

```http
POST   /orders           # Create order (PostgreSQL)
GET    /orders/:id       # Get order by ID
```

> 🔒 = Requires a valid JWT token in the `Authorization: Bearer <token>` header.

---

## 🐳 Docker Services

### Docker Compose Configuration

```yaml
services:
  cognito-local:
    image: jagregory/cognito-local
    ports: ["9229:9229"]

  localstack:
    image: localstack/localstack:3
    ports: ["4566:4566", "4510-4559:4510-4559"]
    environment:
      SERVICES: dynamodb,s3,lambda

  postgres:
    image: postgres:15
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: ordersdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

### Useful Commands

```bash
# View logs
docker-compose logs -f [service]

# Restart a service
docker-compose restart [service]

# Stop all
docker-compose down

# Clean volumes
docker-compose down -v
```

---

## 🐛 Troubleshooting

### Issue: Port in use

```bash
# Windows
netstat -ano | findstr :4000

# Mac/Linux
lsof -ti:4000 | xargs kill -9
```

### Issue: Docker won't start

```bash
docker-compose down
docker-compose up -d --force-recreate
```

### Issue: PostgreSQL connection error

- Verify the container is running: `docker ps`
- Check the `POSTGRES_URL` variable in `.env`
- Restart the service: `docker-compose restart postgres`

### Issue: LocalStack not responding

```bash
# Check status
curl http://localhost:4566/_localstack/health

# View logs
docker-compose logs localstack
```

---

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [LocalStack Docs](https://docs.localstack.cloud/)
- [TypeORM Documentation](https://typeorm.io/)
- [Dynamoose Guide](https://dynamoosejs.com/)

---

## 📄 License

This project is licensed under the ISC license.
