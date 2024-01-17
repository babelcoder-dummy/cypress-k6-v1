import type { Article } from '@prisma/client'

const { _ } = Cypress

describe('Admin Articles API', () => {
  beforeEach(() => {
    cy.task('db:reset')
  })

  it('allows to create new article', () => {
    cy.loginApiAs('ADMIN').as('token')
    cy.fixture('articles/image.jpg', 'binary').then(file => Cypress.Blob.binaryStringToBlob(file)).as('blob')
    cy.fixture('articles/create.json').as('articles')
    cy.aliases<[string, Blob, Article[]]>(['token', 'blob', 'articles']).then(([token, blob, articles]) => {
      for (const article of articles) {
        const formData = new FormData()
        formData.append('title', article.title)
        formData.append('excerpt', article.excerpt)
        formData.append('content', article.content)
        formData.append('image', blob, 'image.jpg')

        cy.request({
          url: '/api/admin/articles',
          method: 'POST',
          body: formData,
          headers: {
            'Cookie': `auth:token=${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          expect(response.status).to.eq(201)

          const dec = new TextDecoder()
          const body = JSON.parse(dec.decode(response.body)) as Article
          expect(
            _.pick(body, ['title', 'slug', 'excerpt', 'content']),
          ).to.deep.eq(
            _.pick(article, ['title', 'slug', 'excerpt', 'content']),
          )
        })
      }
    })
  })
})
