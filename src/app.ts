import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { env } from './env'

export const app = fastify()

// Configure CORS
app.register(cors, {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)

    // In development, allow all origins
    if (env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    // In production, check against allowed origins
    const allowedOrigins = [env.FRONTEND_URL].filter(Boolean)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'), false)
  },
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
})

app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
