import { defineConfig } from 'cypress'
import * as db from './cypress/support/db/helpers'
import * as users from './cypress/support/db/users'
import * as articles from './cypress/support/db/articles'
import * as xlsx from './cypress/support/xlsx'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, _config) {
      on('task', {
        'db:reset': db.reset,
        'db:users:bulk-insert': users.bulkInsert,
        'db:articles:bulk-insert': articles.bulkInsert,
        'xlsx-to-json': xlsx.toJson,
      })
    },
  },
})
