# Ledgerwise API - Financial Control System

A lightweight financial control API built with Fastify, TypeScript, and SQLite using Knex.js for database management.

## 📋 Project Overview

Ledgerwise is a Node.js API service designed for personal financial control and transaction management with session-based user identification. The application provides comprehensive transaction tracking, balance monitoring, and implements proper data isolation between users.

### 🏁 Project Status

✅ **All core features implemented**  
✅ **E2E tests implemented with Vitest**
📋 **Next steps**: Deployment to Render

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
- **Testing Framework**: Vitest 3.2.4 for end-to-end testing
- **HTTP Testing**: Supertest for complete API route testing
- **Linting**: ESLint with automatic fixing
- **Formatting**: Prettier for code formatting

## 📁 Project Structure

```
ledgerwise-api/
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
├── test/                     # Test files
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── knexfile.ts               # Knex database configuration
├── vitest.config.ts          # Vitest configuration
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

## 🧪 Testing

The project uses Vitest for end-to-end testing.

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (reruns tests when files change)
npm run test -- --watch

# Run tests with coverage report
npm run test -- --coverage

# Run specific test files
npm run test -- transactions

# Run tests in a specific directory
npm run test -- test/routes
```

### Test Structure

The test suite covers:

- **E2E Route Tests**: Complete API endpoint testing with real HTTP requests
- **Database Integration**: Transaction operations and data isolation testing
- **Authentication Flows**: Session-based authentication end-to-end testing
- **Full Request Lifecycle**: Testing complete request/response cycles

### Test Environment

- Tests use an in-memory SQLite database
- Automatic database setup/teardown for each test suite
- Mock sessions and isolated test data
- HTTP testing with Fastify's inject method and supertest

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
- `session_id`: User session identifier for data isolation (implemented via cookies)
- `title`: Transaction description
- `amount`: Transaction amount (positive for credit, negative for debit)
- `created_at`: Timestamp of transaction creation

## 🔒 Authentication & Security

### Session-based Authentication

- User identification via HTTP cookies (`sessionId`)
- Automatic session creation on first transaction
- Session cookies expire after 7 days
- Protected routes require valid session ID

### CORS Configuration

- **Development**: Allows all origins for easy testing
- **Production**: Configurable allowed origins via `FRONTEND_URL` environment variable
- **Credentials**: Enabled for cookie-based authentication
- **Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Headers**: Content-Type, Authorization, Cookie

### Middleware

- `checkSessionIdExists`: Validates session cookie for protected routes
- Returns 401 Unauthorized if no valid session

### Data Isolation

- All queries are filtered by user's `session_id`
- Users can only access their own transactions

## 📊 API Endpoints

### Current Endpoints

#### `POST /transactions`

**Create a new transaction**

**Request Body:**

```json
{
  "title": "Grocery Shopping",
  "amount": 150.0,
  "type": "debit"
}
```

**Response:** `201 Created`

**Features:**

- Input validation with Zod schemas
- Automatic amount conversion (debit amounts become negative)
- UUID generation for transaction IDs
- Session-based authentication via HTTP cookies
- Automatic session creation on first transaction

#### `GET /transactions`

**List all transactions for the current user**

**Response:**

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Grocery Shopping",
      "amount": -150.0,
      "session_id": "uuid",
      "created_at": "2024-09-09T18:36:36.000Z"
    }
  ]
}
```

#### `GET /transactions/:id`

**Get a specific transaction by ID**

**Response:**

```json
{
  "transaction": {
    "id": "uuid",
    "title": "Grocery Shopping",
    "amount": -150.0,
    "session_id": "uuid",
    "created_at": "2024-09-09T18:36:36.000Z"
  }
}
```

#### `GET /transactions/summary`

**Get account summary with total balance**

**Response:**

```json
{
  "summary": {
    "amount": 2500.0
  }
}
```

## 🛠️ Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Testing
npm test                    # Run all tests once
npm run test -- --watch     # Run tests in watch mode
npm run test -- --coverage  # Run tests with coverage

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
| `FRONTEND_URL` | Frontend URL for CORS     | -             | No       |

### Environment Setup Example

```bash
# Development
NODE_ENV=development
DATABASE_URL=./db/app.db
PORT=8000

# Production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
PORT=8000
FRONTEND_URL=https://your-frontend.vercel.app
```

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

## 🚀 Next Steps

### Planned Improvements

- [x] **E2E Tests**: Complete route testing with Vitest and Supertest
- [ ] **Deployment**: Production deployment on Render
- [ ] **API Documentation**: OpenAPI/Swagger documentation
- [ ] **Error Handling**: Enhanced error responses and logging
- [ ] **Performance**: API performance monitoring and optimization

## 🤝 Contributing

1. Follow the existing code style (ESLint + Prettier configuration)
2. Write TypeScript with strict typing
3. Add database migrations for schema changes
4. Add tests for new features
