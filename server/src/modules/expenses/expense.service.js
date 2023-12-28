import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createExpense = async (payload) => {
  return await prisma.expense.create({
    data: {
      description: payload.description,
      amount: payload.amount,
      date: new Date(payload.date),
      user: {
        connect: { id: payload.userFkId }, // Connect the expense to an existing user
      },
      // Assuming you also want to connect to an existing category
      category: {
        connect: { id: payload.categoryFkId }, // Connect the expense to an existing category
      },
    },
  });
};

export const getExpenses = async (skip, limit) => {
  const transactions = await prisma.expense.findMany({
    skip: skip,
    take: limit,
    orderBy: { date: "desc" }, // Assuming you want to order by date
  });
  return transactions;
};
