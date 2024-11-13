import { PrismaClient } from '@prisma/client'
import { users, customers, fortunes } from './data.js'

const prisma = new PrismaClient()

async function main() {
  // 清理现有数据
  await prisma.fortune.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.user.deleteMany()

  // 创建用户
  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }

  // 创建客户
  for (const customer of customers) {
    await prisma.customer.create({
      data: customer,
    })
  }

  // 创建运势记录
  for (const fortune of fortunes) {
    await prisma.fortune.create({
      data: fortune,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 