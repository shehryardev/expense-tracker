import Joi from "joi";

export const createExpenseSchema = Joi.object({
  description: Joi.string().required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().iso().required(),
  categoryFkId: Joi.number().integer().positive().required(),
});
