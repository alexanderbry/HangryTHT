import Joi from "joi";

export const ProductSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "ID must be an integer",
    "number.integer": "ID must be an integer",
    "any.required": "ID is required",
  }),
  name: Joi.string().min(1).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be an integer",
    "any.required": "Price is required",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock must be an integer",
    "number.integer": "Stock must be an integer",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),
});

export const OrderSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Order ID must be an integer",
    "number.integer": "Order ID must be an integer",
    "any.required": "Order ID is required",
  }),
  user_id: Joi.number().integer().required().messages({
    "number.base": "User ID must be an integer",
    "number.integer": "User ID must be an integer",
    "any.required": "User ID is required",
  }),
  promotion: Joi.string().allow(null).messages({
    "string.base": "Promotion must be a string",
  }),
  discount_applied: Joi.number().min(0).allow(null).messages({
    "number.base": "Discount applied must be an integer",
    "number.min": "Discount applied cannot be negative",
  }),
  final_price: Joi.number().required().messages({
    "number.base": "Final price must be an integer",
    "any.required": "Final price is required",
  }),
  products: Joi.array().items(ProductSchema).required().messages({
    "array.base": "Products must be an array",
    "any.required": "Products are required",
  }),
});

export const addToCartSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.number()
          .integer()
          .required()
          .messages({
            "number.base": "Product ID must be a number.",
            "number.integer": "Product ID must be an integer.",
            "any.required": "Product ID is required.",
          }),
        quantity: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            "number.base": "Quantity must be a number.",
            "number.integer": "Quantity must be an integer.",
            "number.min": "Quantity must be at least 1.",
            "any.required": "Quantity is required.",
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Products must be an array.",
      "array.min": "At least one product must be added to the cart.",
      "any.required": "Products are required.",
    }),
});
