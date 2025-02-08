import Joi from "joi";
import { PromotionType } from "../types/types";

export const promotionSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Promotion name is required",
    "any.required": "Promotion name is required",
  }),

  type: Joi.string()
    .valid(...Object.values(PromotionType))
    .required()
    .messages({
      "any.only": `Promotion type must be one of: ${Object.values(PromotionType).join(", ")}`,
      "string.empty": "Promotion type is required",
    }),

  discount: Joi.number().positive().required().messages({
    "number.base": "Discount must be a number",
    "number.positive": "Discount must be a positive number",
    "any.required": "Discount is required",
  }),

  max_discount: Joi.number().allow(null).messages({
    "number.base": "Max discount must be a number",
  }),

  min_order: Joi.number().required().messages({
    "number.base": "Min order must be a number",
    "any.required": "Min order is required",
  }),

  start_date: Joi.date().required().messages({
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required",
  }),

  end_date: Joi.date().greater(Joi.ref("start_date")).required().messages({
    "date.base": "End date must be a valid date",
    "date.greater": "End date must be after start date",
    "any.required": "End date is required",
  }),

  max_usage: Joi.number().integer().required().messages({
    "number.base": "Max usage must be a integer",
    "number.integer": "Max usage must be an integer",
    "any.required": "Max usage is required",
  }),
});
