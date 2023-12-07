/* eslint-disable no-console */
describe('Hooks', () => {
  before(() => {
    console.log('Before All')
  })

  beforeEach(() => {
    console.log('Before Each')
  })

  afterEach(() => {
    console.log('After Each')
  })

  after(() => {
    console.log('After All')
  })

  it('calculates 1 + 1 correctly', () => {
    console.log('calculates 1 + 1 correctly')
    expect(1 + 1).to.eq(2)
  })

  it('calculates 2 x 3 correctly', () => {
    console.log('calculates 2 x 3 correctly')
    expect(2 * 3).to.eq(6)
  })
})

describe('Chai Assertions', () => {
  it('handles assetions correctly', () => {
    expect(1 + 1).to.eq(2)
    expect('hello').to.be.a('string')
    expect([1, 2]).to.be.an('array')
    expect('hello').to.include('hell')
    expect({ name: 'Somchai' }).to.have.property('name')
    expect({ age: 24 }).to.deep.eq({ age: 24 })
    expect([]).to.be.empty
    expect([1, 2, 3]).to.have.lengthOf(3)

    cy.wrap(1 + 1).should('eq', 2)
    cy.wrap('hello').should('be.a', 'string')
    cy.wrap({ name: 'Somchai' }).should('have.property', 'name')
    cy.wrap([]).should('be.empty')
  })
})
