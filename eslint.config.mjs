import config from '@rocketseat/eslint-config/node.mjs'
import prettierConfig from 'eslint-config-prettier'

export default [
  ...config,
  prettierConfig,
  {
    plugins: {
      prettier: (await import('eslint-plugin-prettier')).default,
    },
    rules: {
      'prettier/prettier': 'error',
      '@stylistic/semi': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/linebreak-style': 'unix',
    },
  },
]
