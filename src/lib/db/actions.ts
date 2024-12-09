import prisma from './index'
import { CustomerInfo, UserInfo, FortuneInfo } from '../types/interfaces'

export async function createCustomer(data: Omit<CustomerInfo, 'id'>) {
  return prisma.customer.create({
    data: {
      name: data.name,
      birthDateTime: new Date(data.birthDateTime),
      gender: data.gender,
      userId: data.userId,
    },
  })
}

export async function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      user: true,
      fortunes: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  })
}

export async function updateCustomer(id: string, data: Partial<CustomerInfo>) {
  return prisma.customer.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.birthDateTime && { birthDateTime: new Date(data.birthDateTime) }),
      ...(data.gender && { gender: data.gender }),
    },
  })
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({
    where: { id },
  })
}

export async function createFortune(customerId: string, data: {
  overallScore: number;
  details: any;
}) {
  return prisma.fortune.create({
    data: {
      customerId,
      date: new Date(),
      overallScore: data.overallScore,
      details: data.details,
    },
  })
} 