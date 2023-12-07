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
