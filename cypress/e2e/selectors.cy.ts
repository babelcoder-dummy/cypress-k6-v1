describe('Selectors', () => {
  beforeEach(() => {
    cy.visit('/cy/selectors')
  })

  it('selects elements correctly', () => {
    cy.contains('All Articles')
    cy.get('#title').should('have.text', ' Lorem Ipsum is simply dummy text of the printing ')
    cy.get('#title')
      .parent()
      .parent()
      .find('img')
      .should('have.attr', 'src', '/_ipx/_/cy/01.jpg')
    cy.get('#title')
      .parent()
      .parent()
      .find('button')
      .should('contain', 'Explore')
  })

  it('selects elements with data-cy correctly', () => {
    cy.get('[data-cy="article-item-title"]').should('contain', 'Contrary to popular belief, Lorem Ipsum is not simply random text')
    cy.get('[data-cy="article-item-image"]').should('have.attr', 'src', '/_ipx/_/cy/02.jpg')
    cy.get('[data-cy="article-item-explore"]').should('contain', 'Explore')
  })

  it('selects elements by using data correctly', () => {
    cy.dataCy('article-item-title').should('contain', 'Contrary to popular belief, Lorem Ipsum is not simply random text')
    cy.dataCy('article-item-image').should('have.attr', 'src', '/_ipx/_/cy/02.jpg')
    cy.dataCy('article-item-explore').should('contain', 'Explore')
  })

  it('verifies data in table correctly', () => {
    const people = [
      {
        id: 1,
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member',
      },
      {
        id: 2,
        name: 'Courtney Henry',
        title: 'Designer',
        email: 'courtney.henry@example.com',
        role: 'Admin',
      },
      {
        id: 3,
        name: 'Tom Cook',
        title: 'Director of Product',
        email: 'tom.cook@example.com',
        role: 'Member',
      },
      {
        id: 4,
        name: 'Whitney Francis',
        title: 'Copywriter',
        email: 'whitney.francis@example.com',
        role: 'Admin',
      },
      {
        id: 5,
        name: 'Leonard Krasner',
        title: 'Senior Designer',
        email: 'leonard.krasner@example.com',
        role: 'Owner',
      },
      {
        id: 6,
        name: 'Floyd Miles',
        title: 'Principal Designer',
        email: 'floyd.miles@example.com',
        role: 'Member',
      },
    ]

    cy.get('tbody > tr').each(($element, index) => {
      const person = people[index]

      cy.wrap($element).within(() => {
        cy.get('td:nth-child(1)').should('have.text', person.id)
        cy.get('td:nth-child(2)').should('have.text', person.name)
        cy.get('td:nth-child(3)').should('have.text', person.title)
        cy.get('td:nth-child(4)').should('have.text', person.email)
        cy.get('td:nth-child(5)').should('have.text', person.role)
      })
    })
  })
})
