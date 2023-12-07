declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
      containArticles(value: {
        id: number
        title: string
        excerpt: string
      }[]): Chainable<void>
    }
  }
}

export {}
