import express from "express";
import db from "#db/client";
import apiRouter from "./api/employees.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use('/employees', apiRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({ error: err.message || "An unexpected error occurred." });
});

export default app;

// TODO: this file!
