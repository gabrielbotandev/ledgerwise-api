# FinFlow API - Financial Transactions Service

A lightweight financial transactions API built with Fastify, TypeScript, and SQLite using Knex.js for database management.

## 📋 Project Overview

This is a Node.js API service designed to handle financial transactions with session-based user identification. The application follows functional requirements for transaction management and implements proper data isolation between users.

### Functional Requirements
- [x] Users can create new transactions with credit/debit types
- [x] Users can get account summary  
- [x] Users can list all their transactions
- [x] Users can view individual transactions
- [x] Session-based user identification
- [x] Users can only view transactions they created

### Non-Functional Requirements
- [x] Transaction types: credit (adds to total) or debit (subtracts from total)
- [x] User identification between requests via sessions
- [x] Data isolation - users only see their own transactions

## 🏗️ Architecture & Tech Stack

### Core Technologies
- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify 5.6.0
- **Database**: SQLite with better-sqlite3
- **Query Builder**: Knex.js 3.1.0
- **Validation**: Zod 4.1.5
- **Environment**: dotenv for configuration
- **Code Quality**: ESLint + Prettier

### Development Tools
- **TypeScript Compiler**: 5.9.2
- **Runtime**: tsx for development with watch mode
- **Linting**: ESLint with automatic fixing
- **Formatting**: Prettier for code formatting

## 📁 Project Structure

```
finflow-api/
├── src/
│   ├── server.ts              # Main server setup
│   ├── database.ts            # Database configuration and connection
│   ├── routes/
│   │   └── transactions.ts    # Transaction routes and handlers
│   └── env/
│       └── index.ts           # Environment variables validation
├── db/
│   └── migrations/
│       ├── 20250909183636_create-transactions.ts
│       └── 20250909191347_add-session-id-to-transactions.ts
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── knexfile.ts               # Knex database configuration
├── eslint.config.mjs         # ESLint configuration
├── .prettierrc               # Prettier configuration
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
└── README.md                # This file
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
- `session_id`: User session identifier for data isolation (not yet implemented)
- `title`: Transaction description
- `amount`: Transaction amount (positive for credit, negative for debit)
- `created_at`: Timestamp of transaction creation

## 📡 API Endpoints

### Current Endpoints

#### `POST /transactions`
**Create a new transaction**

**Request Body:**
```json
{
    "title": "Grocery Shopping",
    "amount": 150.00,
    "type": "debit"
}
```

**Response:** `201 Created`

**Features:**
- Input validation with Zod schemas
- Automatic amount conversion (debit amounts become negative)
- UUID generation for transaction IDs

### Planned Endpoints (To Be Implemented)

#### `GET /transactions`
List all transactions

#### `GET /transactions/:id`
Get a specific transaction by ID

#### `GET /summary`
Get account summary with total balance

#### `POST /sessions`
Create user session for transaction isolation

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

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `DATABASE_URL` | SQLite database file path | - | Yes |
| `PORT` | Server port | `8000` | No |

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

### ESLint + Prettier Config
- Rocketseat Node.js configuration
- Prettier integration for consistent formatting
- Automatic code fixing enabled

### Database Config  
- Client: better-sqlite3
- Null as default for optional fields
- Migrations directory: `./db/migrations`
- TypeScript migration files supported

## 🤝 Contributing

1. Follow the existing code style (ESLint + Prettier configuration)
2. Write TypeScript with strict typing
3. Add database migrations for schema changes
4. Test endpoints manually until test suite is implemented
