# Fastify API - Financial Transactions Service

A lightweight financial transactions API built with Fastify, TypeScript, and SQLite using Knex.js for database management.

## 📋 Project Overview

This is a Node.js API service designed to handle financial transactions with session-based user identification. The application follows functional requirements for transaction management and implements proper data isolation between users.

### Functional Requirements

- [ ] Users can create new transactions
- [ ] Users can get account summary
- [ ] Users can list all their transactions
- [ ] Users can view individual transactions
- [ ] Session-based user identification
- [ ] Users can only view transactions they created

### Non-Functional Requirements

- [ ] Transaction types: credit (adds to total) or debit (subtracts from total)
- [ ] User identification between requests via sessions
- [ ] Data isolation - users only see their own transactions

## 🏗️ Architecture & Tech Stack

### Core Technologies

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify 5.6.0
- **Database**: SQLite with better-sqlite3
- **Query Builder**: Knex.js 3.1.0
- **Validation**: Zod 4.1.5
- **Environment**: dotenv for configuration
- **Code Quality**: ESLint with Rocketseat config

### Development Tools

- **TypeScript Compiler**: 5.9.2
- **Runtime**: tsx for development with watch mode
- **Linting**: ESLint with automatic fixing

## 📁 Project Structure

```
fastify-api/
├── src/
│   ├── server.ts          # Main server setup and routes
│   ├── database.ts        # Database configuration and connection
│   └── env/
│       └── index.ts       # Environment variables validation
├── db/
│   └── migrations/
│       ├── 20250909183636_create-transactions.ts
│       └── 20250909191347_add-session-id-to-transactions.ts
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── knexfile.ts           # Knex database configuration
├── eslint.config.mjs     # ESLint configuration
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # Project requirements
```

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18+)
- npm or yarn

### Installation

1. **Clone and install dependencies**

```bash
npm install
```

2. **Environment Setup**

```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your configuration
# NODE_ENV=development
# DATABASE_URL="./database.db"
# PORT=8000
```

3. **Database Setup**

```bash
# Run database migrations
npm run knex migrate:latest
```

4. **Start Development Server**

```bash
npm run dev
```

The server will start on `http://localhost:8000` (or your configured PORT).

## 🗄️ Database Schema

### Transactions Table

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    session_id UUID (indexed),
    title TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

**Fields:**

- `id`: Unique transaction identifier
- `session_id`: User session identifier for data isolation
- `title`: Transaction description
- `amount`: Transaction amount (positive for credit, negative for debit)
- `created_at`: Timestamp of transaction creation

## 📡 API Endpoints

### Current Endpoints

#### `GET /`

**Test endpoint that creates a sample transaction**

**Response:**

```json
[
  {
    "id": "uuid-string",
    "title": "Test Transaction",
    "amount": 1000,
    "created_at": "2025-01-01T12:00:00.000Z"
  }
]
```

#### `GET /get-transactions`

**Retrieve all transactions**

**Response:**

```json
[
  {
    "id": "uuid-string",
    "session_id": "uuid-string",
    "title": "Transaction Title",
    "amount": 1000,
    "created_at": "2025-01-01T12:00:00.000Z"
  }
]
```

### Planned Endpoints (To Be Implemented)

#### `POST /transactions`

Create a new transaction

```json
{
  "title": "Grocery Shopping",
  "amount": -150.0,
  "type": "debit"
}
```

#### `GET /transactions/:id`

Get a specific transaction by ID

#### `GET /summary`

Get account summary with total balance

## 🛠️ Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Database migrations
npm run knex migrate:latest
npm run knex migrate:rollback

# Code linting and formatting
npm run lint

# Custom knex commands
npm run knex -- [knex-command]
```

### Environment Variables

| Variable       | Description               | Default       | Required |
| -------------- | ------------------------- | ------------- | -------- |
| `NODE_ENV`     | Environment mode          | `development` | No       |
| `DATABASE_URL` | SQLite database file path | -             | Yes      |
| `PORT`         | Server port               | `8000`        | No       |

### Database Migrations

**Create new migration:**

```bash
npm run knex migrate:make migration_name
```

**Run migrations:**

```bash
npm run knex migrate:latest
```

**Rollback last migration:**

```bash
npm run knex migrate:rollback
```

## 🔧 Configuration

### TypeScript Config

- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Source maps generated
- Declaration files generated

### ESLint Config

- Rocketseat Node.js configuration
- Automatic code fixing enabled

### Database Config

- Client: better-sqlite3
- Null as default for optional fields
- Migrations directory: `./db/migrations`
- TypeScript migration files supported

## 🏃‍♂️ Next Steps

### Immediate Priorities

1. **Implement session management**
   - Add session creation endpoint
   - Implement session-based transaction filtering

2. **Complete CRUD operations**
   - `POST /transactions` - Create transaction
   - `GET /transactions/:id` - Get single transaction
   - `GET /summary` - Account summary

3. **Add transaction types**
   - Implement credit/debit logic
   - Validate transaction amounts

4. **Error handling**
   - Add proper HTTP status codes
   - Implement validation error responses
   - Add database error handling

### Future Enhancements

- Input validation with Zod schemas
- Authentication & authorization
- Transaction categories
- Pagination for transaction lists
- Transaction search and filtering
- API documentation (OpenAPI/Swagger)
- Unit and integration tests
- Docker containerization

## 🤝 Contributing

1. Follow the existing code style (ESLint configuration)
2. Write TypeScript with strict typing
3. Add database migrations for schema changes
4. Test endpoints manually until test suite is implemented

## 📝 Notes

- Currently uses SQLite for simplicity in development
- Session management is partially implemented (database schema ready)
- Transaction amount handling needs implementation for credit/debit types
- No authentication implemented yet - sessions are the planned approach
