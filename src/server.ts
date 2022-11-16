import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import router from "./routes";
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/1.1", router);

app.listen(port, () => console.log(`Server listening in the port ${port}`));
