describe('Should and Expect Exam', () => {
  it('converts expect to should assertions correctly', () => {
    expect('hello').to.be.a('string')
    cy.wrap('hello').should('be.a', 'string')

    expect([1, 2]).to.be.an('array')
    cy.wrap([1, 2]).should('be.an', 'array')

    expect('hello').to.include('hell')
    cy.wrap('hello').should('include', 'hell')

    expect({ name: 'Somchai' }).to.have.property('name')
    cy.wrap({ name: 'Somchai' }).should('have.property', 'name')

    expect({ age: 24 }).to.deep.eq({ age: 24 })
    cy.wrap({ age: 24 }).should('deep.eq', { age: 24 })

    expect([]).to.be.empty
    cy.wrap([]).should('be.empty')

    expect([1, 2, 3]).to.have.lengthOf(3)
    cy.wrap([1, 2, 3]).should('have.lengthOf', 3)
  })
})
