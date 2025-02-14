import "reflect-metadata";
import { DataSource } from "typeorm";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { Cart } from "./entity/Cart";
import { CartItem } from "./entity/CartItem";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "db_order_Hangry",
  synchronize: true,
  logging: false,
  entities: [Order, Product, Cart, CartItem],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

