import fastify from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  const transaction = await knex('transactions').insert({
    id: randomUUID(),
    title: 'Test Transaction',
    amount: 1000,
    created_at: new Date(),
  }).returning('*')

  return transaction
})

app.get('/get-transactions', async () => {
  const transactions = await knex('transactions').select('*')
  return transactions
})

app.listen({ port: 8000 }, () => {
  console.log('Server is running on port 8000')
})
