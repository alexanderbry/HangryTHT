import "reflect-metadata";
import { DataSource } from "typeorm";
import { Promotion } from "./entity/Promotion";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "db_promotion_Hangry",
  synchronize: true,
  logging: false,
  entities: [Promotion],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
