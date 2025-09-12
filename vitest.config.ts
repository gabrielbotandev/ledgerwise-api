import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: './db/test.db',
      PORT: '8000',
    },
  },
})
