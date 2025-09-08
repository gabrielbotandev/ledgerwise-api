import { knex as knexSetup } from 'knex'

export const knex = knexSetup({
  client: 'better-sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
})
