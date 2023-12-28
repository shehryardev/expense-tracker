import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAndCreateUser = async (payload) => {
  let user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    });
  }

  return user;
};
