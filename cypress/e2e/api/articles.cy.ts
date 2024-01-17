import type { Article, User } from '@prisma/client'

const { _ } = Cypress

describe('Articles API', () => {
  let articles: Article[]

  beforeEach(() => {
    cy.task('db:reset')

    cy.task('xlsx-to-json', 'users/all.xlsx').then((users: User[]) => {
      cy.task('db:users:bulk-insert', users)
    })

    cy.fixture('articles/all.json').then((loadedArticles: Article[]) => {
      cy.task('db:articles:bulk-insert', loadedArticles)

      articles = loadedArticles
    })
  })

  it('returns article list correctly', () => {
    cy.request<Article[]>('/api/articles').then((response) => {
      expect(response.status).to.eq(200)
      expect(
        response.body.map(b => _.pick(b, ['id', 'title', 'excerpt', 'image'])),
      ).to.deep.eq(
        articles.map(a => _.pick(a, ['id', 'title', 'excerpt', 'image'])),
      )
    })
  })

  it('returns article details correctly', () => {
    for (const article of articles) {
      cy.request<Article>(`/api/articles/${article.slug}`).then((response) => {
        expect(response.status).to.eq(200)
        expect(
          _.pick(response.body, ['id', 'title', 'slug', 'excerpt', 'content', 'image']),
        ).to.deep.eq(
          _.pick(article, ['id', 'title', 'slug', 'excerpt', 'content', 'image']),
        )
      })
    }
  })
})
