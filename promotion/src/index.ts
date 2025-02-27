import { AppDataSource } from "./data-source";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/promotion", router);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Promotion is running on http://localhost:" + port);
    });
  })
  .catch((error) => console.log(error));