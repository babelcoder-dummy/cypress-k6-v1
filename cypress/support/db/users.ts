import type { User } from '@prisma/client'
import { db } from './helpers'

export async function bulkInsert(users: User[]) {
  await db.user.createMany({
    data: users,
  })

  return null
}
