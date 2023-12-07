describe('Selectors Exam', () => {
  it('renders page correctly', () => {
    const articles = [
      {
        id: 1,
        title: 'Appono vinco curiositas subseco sollicito.',
        excerpt: 'Alo corona cubo absens deorsum. Confugo tempore timidus velum. Trado socius excepturi demoror officiis bonus aureus cedo.',
      },
      {
        id: 2,
        title: 'Ea vulgus cometes.',
        excerpt: 'Aeneus carcer colo odit tempora curatio delectus. Tabula vesica rem culpa tardus blandior deinde velut. Corroboro acsi ambitus.',
      },
      {
        id: 3,
        title: 'Atque vulgus agnitio temperantia cras.',
        excerpt: 'Aptus cubitum mollitia virgo aestas curto cariosus decumbo. Amita tum vel eos acer. Convoco suffoco veritatis cilicium attero.',
      },
      {
        id: 4,
        title: 'Vorago cinis benigne crinis verumtamen.',
        excerpt: 'Tracto ceno civis tamen. Tero ipsum vero capto verbera succedo. Consequuntur degenero copiose inventore arca baiulus acceptus cetera aro sub.',
      },
    ]

    cy.visit('/cy/selectors-ex')
    cy.contains('All Articles')
    cy.containArticles(articles)

    // for (const article of articles) {
    //   cy.dataCy(`article-item-${article.id}`).within(() => {
    //     cy.dataCy('article-item-title').should('have.text', article.title)
    //     cy.contains(article.excerpt)
    //     cy.dataCy('article-item-more-details').should('contain', 'More Details')
    //   })
    // }
  })
})
