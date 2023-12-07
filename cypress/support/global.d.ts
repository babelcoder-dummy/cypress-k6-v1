import type { Article, User } from '@prisma/client'

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
      containArticles(value: {
        id: number
        title: string
        excerpt: string
      }[]): Chainable<void>

      task(event: 'db:reset'): Chainable<null>
      task(event: 'db:articles:bulk-insert', args: Article[]): Chainable<null>
      task(event: 'db:users:bulk-insert', args: User[]): Chainable<null>
      task<T>(event: 'xlsx-to-json', args: string): Chainable<T>
    }
  }
}

export {}
