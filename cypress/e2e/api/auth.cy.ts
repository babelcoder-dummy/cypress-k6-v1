import type { User } from '@prisma/client'

const { _ } = Cypress

describe('Auth API', () => {
  beforeEach(() => {
    cy.task('db:reset')
  })

  it('allows to register new user', () => {
    cy.task('xlsx-to-json', 'users/all.xlsx').then((users: User[]) => {
      for (const user of users) {
        cy.request<User>('POST', '/api/auth/register', {
          name: user.name,
          email: user.email,
          password: user.password,
        }).then((response) => {
          expect(response.status).to.eq(201)
          expect(
            _.pick(response.body, ['name', 'email']),
          ).to.deep.eq(
            _.pick(user, ['name', 'email']),
          )
          expect(response.body.role).to.eq('MEMBER')
        })
      }
    })
  })
})
