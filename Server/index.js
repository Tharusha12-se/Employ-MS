import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use('/auth', adminRouter);
app.use(express.static('Public'))

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});