import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/index";

dotenv.config();

const port = process.env.PORT || 3003;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log("API Gateway is running on http://localhost:" + port);
});
