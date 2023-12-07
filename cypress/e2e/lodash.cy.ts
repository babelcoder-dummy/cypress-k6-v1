const { _ } = Cypress

describe('Lodash', () => {
  it('handles Lodash methods correctly', () => {
    const person = {
      name: 'Somchai',
      age: 24,
      gender: 'male',
    }

    expect(_.omit(person, 'name')).to.deep.eq({ age: 24, gender: 'male' })
    expect(_.omit(person, ['name', 'age'])).to.deep.eq({ gender: 'male' })
    expect(_.pick(person, 'name')).to.deep.eq({ name: 'Somchai' })
    expect(_.pick(person, ['name', 'age'])).to.deep.eq({ name: 'Somchai', age: 24 })
    expect(_.times(5, index => index)).to.deep.eq([0, 1, 2, 3, 4])
  })
})
