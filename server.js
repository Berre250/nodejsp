import dotenv from "dotenv";
import express from "express";
import usersRoutes from "./users/users.route.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "users management api",
  });
});
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/users", usersRoutes);

app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
