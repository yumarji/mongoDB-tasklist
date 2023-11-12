const express = require("express");
const listViewRouter = express.Router();
const checkToken = require("../middlewares/checkToken");
const checkRol = require("../middlewares/checkRol");
const connectDB = require("../db");

//Ruta para ver todas las tareas
listViewRouter.get("/api/list", [checkToken, checkRol], async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("tasklist");
    const tasks = await collection.find({}).toArray();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}); //Ruta  http://127.0.0.1:3000/list

//Ruta para ver las tareas completadas
listViewRouter.get(
  "/api/list-completed",
  [checkToken, checkRol],
  async (req, res) => {
    try {
      const db = await connectDB();
      const collection = db.collection("tasklist");
      const tasks = await collection
        .aggregate([
          { $match: { status: "completed" } },
          { $sort: { task: 1 } },
        ])
        .toArray();
      res.status(200).send(tasks);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
); //Ruta  http://127.0.0.1:3000/listCompleted

//Ruta para ver las tareas Incompletas
listViewRouter.get(
  "/api/list-incomplete",
  [checkToken, checkRol],
  async (req, res) => {
    try {
      const db = await connectDB();
      const collection = db.collection("tasklist");
      const tasks = await collection
        .aggregate([
          { $match: { status: "incomplete" } },
          { $sort: { task: 1 } },
        ])
        .toArray();
      res.status(200).send(tasks);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
); //Ruta  http://127.0.0.1:3000/listIncomplete

module.exports = listViewRouter;
