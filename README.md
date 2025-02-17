# HangryTHT

HangryTHT is a microservices-based application that handles user management, promotions, and order processing.

## Features

- User authentication and management
- Promotion system with support for percentage and fixed discounts
- Shopping cart and order processing
- RESTful API endpoints

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- Git
- **Databases:**  You'll need to create the following databases:
    * `db_user_Hangry`
    * `db_promotion_Hangry`
    * `db_order_Hangry`

## Installation

1. Clone the repository
```bash
git clone https://github.com/alexanderbry/HangryTHT
cd HangryTHT
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add the following configurations:
```env
PORT=3003
SECRET_KEY=helloworld
USER_APP=http://localhost:3000
PROMOTION_APP=http://localhost:3001
ORDER_APP=http://localhost:3002
```

## Running the Application

```bash
npm run start
```

## API Documentation

For detailed API documentation, please refer to the [API Documentation](./API_DOC.md).

## Project Structure
```
HangryTHT/
├── api_gateway/
│   ├── node_modules/
│   ├── src/
│   │   ├── ...
│   ├── .env
│   ├── .gitignore
│   ├── index.ts
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── order/
│   ├── node_modules/
│   ├── src/
│   │   ├── ...
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
├── promotion/
│   ├── node_modules/
│   ├── src/
│   │   ├── ...
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── user/
│   ├── node_modules/
│   ├── src/
│   │   ├── ...
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── API_DOC.md
└── README.md
```
