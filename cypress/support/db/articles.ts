import type { Article } from '@prisma/client'
import { db } from './helpers'

export async function bulkInsert(articles: Article[]) {
  await db.article.createMany({
    data: articles,
  })

  return null
}
