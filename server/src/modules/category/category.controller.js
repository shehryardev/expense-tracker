import { getCategories } from "./category.service.js";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../../utils/responseUtil.js";
const prisma = new PrismaClient();

// Controller function for getting cateogies
export const getCategoriesController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search;

  try {
    const whereClause = search
      ? {
          name: {
            contains: search,
          },
        }
      : {};
    const categories = await getCategories(whereClause, skip, limit);

    const totalCategories = await prisma.category.count({ where: whereClause });

    return sendResponse(res, 200, {
      categories,
      currentPage: page,
      totalPages: Math.ceil(totalCategories / limit),
      totalCategories,
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
