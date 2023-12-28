import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategories = async (whereClause, skip, limit) => {
  const categories = await prisma.category.findMany({
    where: whereClause,
    skip: skip,
    take: limit,
  });
  return categories;
};
