import { createExpense, getExpenses } from "./expense.service.js";
import { sendResponse } from "../../utils/responseUtil.js";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

const getPeriodRange = (timeFrame) => {
  const periods = [];
  const now = moment();

  for (let i = 0; i < 4; i++) {
    let startDate, endDate, label;

    switch (timeFrame) {
      case "week":
        startDate = now.clone().subtract(i, "weeks").startOf("week");
        endDate = startDate.clone().endOf("week");
        label = `Week ${i === 0 ? "Current" : i}`;
        break;
      case "year":
        startDate = now.clone().subtract(i, "years").startOf("year");
        endDate = startDate.clone().endOf("year");
        label = startDate.format("YYYY");
        break;
      case "month":
      default:
        startDate = now.clone().subtract(i, "months").startOf("month");
        endDate = startDate.clone().endOf("month");
        label = startDate.format("MMMM");
        break;
    }

    periods.unshift({
      // Unshift to have the most recent period last in the array
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      label,
    });
  }

  return periods;
};
// Controller function for creating an expense
export const createExpenseController = async (req, res) => {
  try {
    const newExpense = await createExpense({
      ...req.body,
      userFkId: req.user.userId,
    });

    return sendResponse(res, 200, newExpense);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const getExpensesController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const expenses = await prisma.expense.findMany({
      skip: skip,
      take: limit,
      where: {
        userFkId: req.user.userId,
      },
      include: {
        category: true, // Include category information
      },
      orderBy: { date: "desc" }, // Assuming you want to order by date
    });

    const totalTransactions = await prisma.expense.count();

    return sendResponse(res, 200, {
      expenses,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
      totalTransactions,
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const getThisMonthExpenses = async (req, res) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    const totalExpenses = await prisma.expense.aggregate({
      where: {
        userFkId: req.user.userId,
        date: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });
    return sendResponse(res, 200, {
      totalAmount: totalExpenses._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const aggregateExpenses = async (req, res) => {
  const timeFrame = req.query.timeFrame || "month"; // Default to 'month'
  const periodRange = getPeriodRange(timeFrame);

  try {
    let aggregatedExpenses = [];

    for (const period of periodRange) {
      const expensesInPeriod = await prisma.expense.aggregate({
        where: {
          date: {
            gte: period.startDate,
            lte: period.endDate,
          },
          // ... other filters (e.g., user ID) ...
        },
        _sum: {
          amount: true,
        },
      });

      aggregatedExpenses.push({
        periodLabel: period.label,
        totalAmount: expensesInPeriod._sum.amount || 0,
      });
    }

    res.json(aggregatedExpenses);
  } catch (error) {
    console.error("Error fetching aggregated expenses:", error);
    res.status(500).send("Error fetching aggregated expenses");
  }
};

export const getTopSpending = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to first page
  const pageSize = parseInt(req.query.pageSize, 10) || 5; // Default page size

  try {
    const skip = (page - 1) * pageSize; // Calculate the offset

    const topSpendings = await prisma.expense.findMany({
      where: {
        userFkId: req.user.userId, // Assuming userFkId is the field that references the user
      },
      include: {
        category: true, // Include category information
      },
      orderBy: {
        amount: "desc", // Order by amount in descending order
      },
      take: pageSize, // Number of records to retrieve
      skip: skip, // Number of records to skip (offset)
    });

    // Optionally, get the total count of records for pagination metadata
    const totalCount = await prisma.expense.count({
      where: {
        userFkId: parseInt(req.user.userId, 10),
      },
    });

    return sendResponse(res, 200, {
      data: topSpendings,
      pagination: {
        page: page,
        pageSize: pageSize,
        total: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching top spendings:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
