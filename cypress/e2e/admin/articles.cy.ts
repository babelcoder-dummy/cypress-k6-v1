import type { Article } from '@prisma/client'

describe('Admin Articles', () => {
  beforeEach(() => {
    cy.task('db:reset')
  })

  it('handles permissions correctly', () => {
    cy.loginAs('ADMIN')
    cy.visit('/admin/articles')
    cy.contains('You are not allowed to access this page').should('not.exist')
    cy.logout()

    cy.loginAs('MANAGER')
    cy.visit('/admin/articles')
    cy.contains('You are not allowed to access this page').should('not.exist')
    cy.logout()

    cy.loginAs('MEMBER')
    cy.visit('/admin/articles')
    cy.contains('You are not allowed to access this page')
    cy.location('pathname').should('eq', '/articles')
    cy.logout()
  })

  it('allows to create new article', () => {
    cy.loginAs('ADMIN')
    cy.visit('/admin/articles')

    cy.fixture('articles/create.json').then((articles: Pick<Article, 'title' | 'slug' | 'excerpt' | 'content' | 'image'>[]) => {
      for (const article of articles) {
        cy.dataCy('create-button').click()
        cy.dataCy('upload-input').selectFile(article.image, { force: true })
        cy.dataCy('title').type(article.title)
        cy.dataCy('excerpt').type(article.excerpt)
        cy.dataCy('content').type(article.content)
        cy.dataCy('submit-button').click()
        cy.contains(article.title)
      }
    })
  })
})
