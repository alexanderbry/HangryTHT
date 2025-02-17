# HangryTHT API Documentation

## Overview

Welcome to the HangryTHT API documentation. This API provides endpoints for user, promotions, and order processing.

## Service Configuration

### Base URL
`http://localhost:3004`


| Service    |  URL              |
|------------|----------------------|
| API Gateway| http://localhost:3004 |
| User       | http://localhost:3000 |
| Promotion  | http://localhost:3001 |
| Order      | http://localhost:3002 |

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

## API Endpoints

### 1. User

#### A. Register User
Create a new user account.

**POST** `/user/register`

**Request Body:**
```json
{
  "email": "string",          // Required
  "password": "string",       // Required, minimum 8 characters
  "fullName": "string",       // Required
  "user_type": "string",      // Optional, defaults to "new"
  "cityId": "number"          // Required
}
```

**Success Response** (201 Created)
```json
{
  "status": 201,
  "message": "User registered successfully",
  "data": null
}
```

**Error Responses:**
- `400` - Email already exists
- `400` - Password must be at least 8 characters
- `500` - Internal Server Error

#### B. User Login
Authenticate and receive a JWT token.

**POST** `/user/login`

**Request Body:**
```json
{
  "email": "string",      // Required
  "password": "string"    // Required
}
```

**Success Response** (200 OK)
```json
{
  "status": 200,
  "message": "Login success",
  "data": "JWT_TOKEN"
}
```

**Error Responses:**
- `400` - Invalid email or password
- `500` - Internal Server Error

#### C. Get User Details
Retrieve user information by ID.

**GET** `/user/:id`

**Path Parameters:**
- `id` (number) - User ID

**Success Response** (200 OK)
```json
{
  "status": 200,
  "message": null,
  "data": {
    "id": "number",
    "email": "string",
    "fullName": "string",
    "user_type": "string",
    "cityId": "number"
  }
}
```

**Error Responses:**
- `404` - User not found
- `500` - Internal Server Error

### 2. Promotions

#### A. List Available Promotions
Get promotions available for the authenticated user.

**GET** `/promotion/user-promotion`

**Authentication Required:** Yes

**Success Response** (200 OK)
```json
{
  "status": 200,
  "message": null,
  "data": [
    {
      "id": "number",
      "name": "string",
      "type": "string",
      "discount": "number",
      "max_discount": "number",
      "min_order": "number",
      "start_date": "string",
      "end_date": "string",
      "max_usage": "number"
    }
  ]
}
```

**Error Responses:**
- `400` - No promotions available
- `401` - Please login first
- `500` - Internal Server Error

#### B. Create Promotion
Create a new promotion.

**POST** `/promotion/create`

**Authentication Required:** Yes

**Request Body:**
```json
{
  "name": "string",          // Required
  "type": "string",          // Required (percentage/fixed)
  "discount": "number",      // Required
  "max_discount": "number",  // Optional
  "min_order": "number",     // Required
  "start_date": "string",    // Required
  "end_date": "string",      // Required, must be after start_date
  "max_usage": "number"      // Required
}
```

**Success Response** (201 Created)
```json
{
  "status": 201,
  "message": "Promotion created",
  "data": null
}
```

**Error Responses:**
- `400` - Name already exists
- `401` - Please login first
- `500` - Internal Server Error

### 3. Order Management

#### A. Add to Cart
Add items to the shopping cart.

**POST** `/order/add-to-cart`

**Authentication Required:** Yes

**Request Body:**
```json
{
  "itemId": "number",    // Required
  "quantity": "number"   // Required, minimum 1
}
```

**Success Response** (200 OK)
```json
{
  "status": 200,
  "message": "Item added to cart",
  "data": null
}
```

**Error Responses:**
- `400` - Product does not exist
- `401` - Please login first
- `500` - Internal Server Error

#### B. Create Order
Convert cart items into an order.

**POST** `/order/create`

**Authentication Required:** Yes

**Request Body:**
```json
{
  "cartItems": [
    {
      "itemId": "number",     // Required
      "quantity": "number"    // Required
    }
  ],
  "address": "string",        // Required
  "paymentMethod": "string"   // Required
}
```

**Success Response** (201 Created)
```json
{
  "status": 201,
  "message": "Order created successfully",
  "data": {
    "orderId": "number",
    "totalAmount": "number"
  }
}
```

**Error Responses:**
- `401` - Please login first
- `500` - Internal Server Error

## Error Response Format

All error responses follow this structure:
```json
{
  "status": "number",
  "message": "string",
  "data": null
}
```