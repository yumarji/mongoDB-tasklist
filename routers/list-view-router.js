const express = require("express");
const listViewRouter = express.Router();
const checkToken = require("../middlewares/checkToken");
const checkRol = require("../middlewares/checkRol");
const connectDB = require("../db");
const ModelTask = require("../schemas/taskModel");
//[checkToken, checkRol]
//Ruta para ver todas las tareas
listViewRouter.get("/api/list", async (req, res) => {
  try {
    await connectDB();
    const tasks = await ModelTask.find({});
    console.log(tasks);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}); //Ruta  http://127.0.0.1:8080/api/list

//Ruta para ver las tareas completadas
listViewRouter.get(
  "/api/list-completed",
  [checkToken, checkRol],
  async (req, res) => {
    try {
      await connectDB();
      const tasks = await ModelTask.aggregate([
        { $match: { state: "completed" } },
        { $sort: { task: 1 } },
      ]);
      res.status(200).send(tasks);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
); //Ruta  http://127.0.0.1:8080/api/listCompleted

//Ruta para ver las tareas Incompletas
listViewRouter.get(
  "/api/list-incomplete",
  [checkToken, checkRol],
  async (req, res) => {
    try {
      await connectDB();
      const tasks = await ModelTask.aggregate([
        { $match: { state: "incomplete" } },
        { $sort: { task: 1 } },
      ]);
      res.status(200).send(tasks);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
); //Ruta  http://127.0.0.1:8080/list-incomplete/

module.exports = listViewRouter;
