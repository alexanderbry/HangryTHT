import Joi from "joi";
import { UserType } from "../types/types";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),

  fullName: Joi.string().min(3).max(32).trim().required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must not exceed 32 characters",
  }),

  password: Joi.string().min(8).max(32).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must not exceed 32 characters",
  }),

  user_type: Joi.string()
    .valid(...Object.values(UserType))
    .required()
    .messages({
      "any.only": `User type must be one of: ${Object.values(UserType).join(", ")}`,
      "string.empty": "User type is required",
    }),

  cityId: Joi.number().integer().required().messages({
    "number.base": "City ID must be an integer",
    "number.integer": "City ID must be an integer",
    "any.required": "City ID is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().min(8).max(32).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must not exceed 32 characters",
  }),
});

export const getUserByIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "ID must be an integer",
    "number.integer": "ID must be an integer",
    "any.required": "ID is required",
  }),
});
