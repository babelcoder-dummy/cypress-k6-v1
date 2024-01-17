import type { User } from '@prisma/client'

Cypress.Commands.add('aliases', function (aliasNames) {
  return cy.wrap(aliasNames.map(a => this[a]))
})

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('containArticles', (articles) => {
  for (const article of articles) {
    cy.dataCy(`article-item-${article.id}`).within(() => {
      cy.dataCy('article-item-title').should('have.text', article.title)
      cy.contains(article.excerpt)
      cy.dataCy('article-item-more-details').should('contain', 'More Details')
    })
  }
})

Cypress.Commands.add('loginAs', (role) => {
  return cy.task('xlsx-to-json', 'users/all.xlsx').then((users: User[]) => {
    const user: User = Cypress._.sample(users.filter(u => u.role === role))

    cy.task('db:users:upsert', user)
    cy.visit('/auth/login')
    cy.dataCy('email').type(user.email)
    cy.dataCy('password').type(user.password)
    cy.dataCy('submit').click()
    cy.contains('You have already been logged in')
  })
})

Cypress.Commands.add('loginApiAs', (role) => {
  return cy.task('xlsx-to-json', 'users/all.xlsx').then((users: User[]) => {
    const user: User = Cypress._.sample(users.filter(u => u.role === role))

    cy.task('db:users:upsert', user)

    return cy.request<{ token: { accessToken: string } }>('POST', '/api/auth/login', {
      email: user.email,
      password: user.password,
    }).then((response) => {
      return response.body.token.accessToken
    })
  })
})

Cypress.Commands.add('logout', () => {
  cy.get('header [aria-haspopup="menu"]').click()
  cy.contains('Logout').click()
})
