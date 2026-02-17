import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "users management api",
  });
});
const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
