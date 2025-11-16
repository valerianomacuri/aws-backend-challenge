# 🚀 AWS Backend Challenge

Backend moderno desarrollado en **TypeScript** que simula servicios AWS localmente para desarrollo rápido y eficiente. Combina servicios SQL y NoSQL con autenticación completa y almacenamiento de archivos.

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Características Principales

- 🔐 **Autenticación JWT** con AWS Cognito simulado
- 💾 **Dual Database**: PostgreSQL (relacional) + DynamoDB (NoSQL)
- 📦 **Almacenamiento S3** para gestión de archivos
- 🐳 **Desarrollo Local Completo** con LocalStack
- 🔄 **Hot Reload** para desarrollo ágil
- 📝 **Logging Avanzado** con Winston
- 🛡️ **Type Safety** con TypeScript
- ✅ **Code Quality** con ESLint + Prettier

---

## 🛠 Stack Tecnológico

### **Core Backend**
| Tecnología      | Propósito                     | Versión |
| --------------- | ----------------------------- | ------- |
| **Node.js**     | Runtime JavaScript/TypeScript | Latest  |
| **TypeScript**  | Tipado estático               | ^5.x    |
| **Express**     | Framework web RESTful         | ^4.x    |
| **ts-node-dev** | Hot reload durante desarrollo | ^2.x    |

### **Bases de Datos**
| Servicio       | Tipo            | ORM/ODM   |
| -------------- | --------------- | --------- |
| **PostgreSQL** | SQL Relacional  | TypeORM   |
| **DynamoDB**   | NoSQL Key-Value | Dynamoose |

### **Servicios AWS (Simulados)**
| Servicio     | Propósito                  | Herramienta Local |
| ------------ | -------------------------- | ----------------- |
| **Cognito**  | Autenticación/Autorización | Cognito Local     |
| **DynamoDB** | Base de datos NoSQL        | LocalStack        |
| **S3**       | Almacenamiento de archivos | LocalStack        |
| **RDS**      | Base de datos relacional   | LocalStack        |

### **Seguridad & Autenticación**
- `bcryptjs` → Encriptación de contraseñas
- `jsonwebtoken` → Manejo de JWT
- `jwks-rsa` → Validación de tokens
- `@aws-sdk/client-cognito-identity-provider` → Cliente Cognito

### **Utilidades**
- `winston` → Sistema de logging robusto
- `multer` → Upload de archivos multipart
- `axios` → Cliente HTTP
- `uuid` → Generación de IDs únicos
- `dotenv` → Variables de entorno

### **Desarrollo**
- `ESLint` + `Prettier` → Linting y formateo
- `typescript-eslint` → Reglas ESLint para TS
- `cross-env` → Variables de entorno cross-platform

---

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x o **yarn** ≥ 1.22
- **Docker** ≥ 20.x
- **Docker Compose** ≥ 2.x

---

## 🔧 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone <repository-url>
cd aws-backend-challenge
```

### 2️⃣ Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3️⃣ Levantar servicios Docker

```bash
docker-compose up -d
```

Esto iniciará:
- ✅ PostgreSQL en puerto `5432`
- ✅ Cognito Local en puerto `9229`
- ✅ LocalStack en puerto `4566`

### 4️⃣ Crear un User Pool y Client App

```bash
npm run cognito:init
```

Todos los servicios deben estar en estado `Up`.

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Server
NODE_ENV=development
PORT=3000

# AWS Local
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
LOCALSTACK_ENDPOINT=http://localhost:4566
COGNITO_ENDPOINT=http://localhost:9229

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ordersdb

# DynamoDB
DYNAMODB_ENDPOINT=http://localhost:4566
DYNAMODB_TABLE_PRODUCTS=Products

# S3
S3_BUCKET_NAME=my-app-bucket
S3_ENDPOINT=http://localhost:4566

# Cognito
COGNITO_USER_POOL_ID=us-east-1_xxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxx
```

---

## 🚀 Uso

### Scripts Disponibles

| Comando              | Descripción                     |
| -------------------- | ------------------------------- |
| `npm run build`      | Compila TypeScript → JavaScript |
| `npm start`          | Ejecuta servidor TypeScript     |
| `npm run start:dev`  | Desarrollo con hot reload ⚡     |
| `npm run start:prod` | Producción (código compilado)   |
| `npm run lint`       | Analiza código con ESLint       |
| `npm run lint:fix`   | Auto-corrige issues de ESLint   |

### Desarrollo Local

```bash
# Iniciar en modo desarrollo
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

### Producción

```bash
# Compilar
npm run build

# Ejecutar
npm run start:prod
```

---

## 📁 Estructura del Proyecto

```
aws-backend-challenge/
├── src/
│   ├── config/              # Configuraciones (DB, AWS, etc.)
│   ├── middlewares/         # Middlewares Express
│   ├── modules/
│   │   ├── products/        # Módulo de productos
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── routes/
│   │   └── orders/          # Módulo de órdenes
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── entities/    # Entidades TypeORM
│   │       └── routes/
│   ├── utils/               # Utilidades y helpers
│   ├── types/               # Tipos TypeScript
│   └── index.ts             # Punto de entrada
├── cognito-init/            # Scripts inicialización Cognito
├── dist/                    # Código compilado (generado)
├── docker-compose.yml       # Servicios Docker
├── .env                     # Variables de entorno
├── .env.example             # Template de variables
├── package.json
├── tsconfig.json            # Config TypeScript
├── .eslintrc.js            # Config ESLint
└── .prettierrc             # Config Prettier
```

---

## 🔌 API Endpoints

### Autenticación

```http
POST   /api/auth/register    # Registrar usuario
POST   /api/auth/login       # Iniciar sesión
POST   /api/auth/refresh     # Refrescar token
```

### Productos (DynamoDB)

```http
GET    /api/products         # Listar productos
GET    /api/products/:id     # Obtener producto
POST   /api/products         # Crear producto
PUT    /api/products/:id     # Actualizar producto
DELETE /api/products/:id     # Eliminar producto
```

### Órdenes (PostgreSQL)

```http
GET    /api/orders           # Listar órdenes
GET    /api/orders/:id       # Obtener orden
POST   /api/orders           # Crear orden
PUT    /api/orders/:id       # Actualizar orden
DELETE /api/orders/:id       # Eliminar orden
```

### Archivos (S3)

```http
POST   /api/files/upload     # Subir archivo
GET    /api/files/:key       # Descargar archivo
DELETE /api/files/:key       # Eliminar archivo
```

---

## 🐳 Servicios Docker

### Configuración Docker Compose

```yaml
services:
  # Cognito Local - Autenticación
  cognito-local:
    image: jagregory/cognito-local
    ports: ["9229:9229"]
    environment:
      AWS_REGION: us-east-1
    volumes:
      - ./cognito-init:/docker-entrypoint-init.d

  # LocalStack - Servicios AWS
  localstack:
    image: localstack/localstack:3
    ports: ["4566:4566"]
    environment:
      SERVICES: dynamodb,s3,rds
      DEBUG: 1

  # PostgreSQL - Base de datos
  postgres:
    image: postgres:15
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: ordersdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

### Comandos Útiles

```bash
# Ver logs
docker-compose logs -f [servicio]

# Reiniciar servicio
docker-compose restart [servicio]

# Detener todos
docker-compose down

# Limpiar volúmenes
docker-compose down -v
```

---

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén configurados)
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

---

## 🐛 Troubleshooting

### Problema: Puerto en uso

```bash
# Encuentra el proceso usando el puerto
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

### Problema: Docker no inicia

```bash
# Reiniciar Docker
docker-compose down
docker-compose up -d --force-recreate
```

### Problema: Error de conexión a PostgreSQL

- Verifica que el contenedor esté corriendo: `docker ps`
- Revisa las credenciales en `.env`
- Intenta reconectar: `docker-compose restart postgres`

### Problema: LocalStack no responde

```bash
# Verificar estado
curl http://localhost:4566/_localstack/health

# Ver logs
docker-compose logs localstack
```

---

## 📚 Recursos Adicionales

- [Documentación TypeScript](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [LocalStack Docs](https://docs.localstack.cloud/)
- [TypeORM Documentation](https://typeorm.io/)
- [Dynamoose Guide](https://dynamoosejs.com/)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

**¡Hecho con ❤️ y TypeScript!**
