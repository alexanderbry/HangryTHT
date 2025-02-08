import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { City } from "./entity/City"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "db_user_Hangry",
    synchronize: true,
    logging: false,
    entities: [User, City],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
