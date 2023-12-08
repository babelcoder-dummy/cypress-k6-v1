import type { User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { db } from './helpers'

export async function bulkInsert(users: User[]) {
  await db.user.createMany({
    data: users.map(u => ({ ...u, password: bcrypt.hashSync(u.password, 12) })),
  })

  return null
}

export function findAll() {
  return db.user.findMany()
}

export async function upsert(user: User) {
  const hashedPassword = bcrypt.hashSync(user.password, 12)

  await db.user.upsert({
    where: { email: user.email },
    update: {},
    create: { ...user, password: hashedPassword },
  })

  return null
}
