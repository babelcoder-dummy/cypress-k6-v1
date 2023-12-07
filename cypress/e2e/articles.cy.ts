import type { Article, User } from '@prisma/client'

describe('Articles', () => {
  let articles: Article[]

  beforeEach(() => {
    cy.task('db:reset')

    cy.fixture<User[]>('users/all.json')
    cy.fixture<User[]>('users/all.json').then((users) => {
      cy.task('db:users:bulk-insert', users)

      cy.fixture<Article[]>('articles/all.json').then((loadedArticles) => {
        cy.task('db:articles:bulk-insert', loadedArticles)

        articles = loadedArticles
      })
    })

    cy.visit('/articles')
  })

  it('renders article list page correctly', () => {
    for (const article of articles) {
      const card = cy.dataCy(`article-item-${article.id}`)

      card.within(() => {
        cy.dataCy('page-title').should('have.text', article.title)
        cy.dataCy('image').should('have.attr', 'src', article.image)
        cy.dataCy('excerpt').should('have.text', article.excerpt)
      })

      card.click()
      cy.location('pathname').should('eq', `/articles/${article.slug}`)
      cy.dataCy('article-image').should('have.attr', 'src', article.image)
      cy.dataCy('article-title').should('have.have', article.title)
      cy.dataCy('article-content').should('have.have', article.content)
      cy.go('back')
    }
  })
})
