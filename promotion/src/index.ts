import { AppDataSource } from "./data-source"
import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log("Promotion is running on http://localhost:" + port);
      });
      console.log("Data Source has been initialized!");

}).catch(error => console.log(error))
