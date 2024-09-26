const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/", router);

app.use(express.static(path.join(__dirname, "/dist/desafio-accenture-svl")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/dist/desafio-accenture-svl/index.html"))
);

app.listen(port, () => console.log("Server Running"));
