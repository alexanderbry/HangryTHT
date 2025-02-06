import { AppDataSource } from "./data-source";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/user", router);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("User is running on http://localhost:" + port);
    });
  })
  .catch((error) => console.log(error));
