import mongoose from "mongoose";
import express, {urlencoded} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World </h1>");
});
app.listen(7000, () => {
  console.log("Server running on local host :7000");
});
