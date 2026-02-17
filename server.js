import http from "node:http";
import { json } from "./outils/responses.js";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "users management api",
  });
});

app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
