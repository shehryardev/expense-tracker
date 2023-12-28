import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id) => {
  let user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      picture: true,
    },
  });

  return user;
};
