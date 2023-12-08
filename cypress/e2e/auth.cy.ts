import type { User } from '@prisma/client'

const { _ } = Cypress

describe('Auth', () => {
  beforeEach(() => {
    cy.task('db:reset')
  })

  it('handles auth flow correctly', () => {
    cy.task('xlsx-to-json', 'users/all.xlsx').then((users: User[]) => {
      for (const user of users) {
        cy.visit('/auth/register')

        cy.dataCy('title').should('have.text', 'Register')
        cy.wait(500)
        cy.dataCy('name').type(user.name)
        cy.dataCy('email').type(user.email)
        cy.dataCy('password').type(user.password)
        cy.dataCy('submit').click()

        cy.dataCy('title').should('have.text', 'Login')
        cy.location('pathname').should('eq', '/auth/login')
        cy.dataCy('email').type(user.email)
        cy.dataCy('password').type(user.password)
        cy.dataCy('submit').click()

        cy.contains('You have already been logged in')
        cy.location('pathname').should('eq', '/articles')
        cy.get('header [aria-haspopup="menu"]').click()
        cy.contains('Logout').click()
      }

      cy.task('db:users:all').then((dbUsers: User[]) => {
        expect(
          dbUsers.map(u => _.pick(u, ['name', 'email'])),
        ).to.deep.eq(
          users.map(u => _.pick(u, ['name', 'email'])),
        )

        for (const user of dbUsers)
          expect(user.role).to.eq('MEMBER')
      })
    })
  })
})
