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
})
