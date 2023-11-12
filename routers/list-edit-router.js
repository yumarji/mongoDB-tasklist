const express = require("express");
const listEditRouter = express.Router();
const validPost = require("../middlewares/validPost");
const validPut = require("../middlewares/validPut");
const validId = require("../middlewares/validId");
const checkToken = require("../middlewares/checkToken");
const checkRol = require("../middlewares/checkRol");
const connectDB = require("../db");
const { ObjectId } = require("mongodb");

//Ruta para agregar tareas
listEditRouter.post(
  "/api/add",
  [checkToken, checkRol, validPost],
  async (req, res) => {
    try {
      const newtask = req.body;
      const db = await connectDB();
      const collection = db.collection("tasklist");
      const tasks = await collection.insertOne(newtask);
      res.status(200).send({ message: "Task was added." });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);
/* ruta:  http://127.0.0.1:3000/api/add
  {
    "task": "task 6",
    "description": "Go to the cinema",
    "status": "incomplete"
  }
*/

//Ruta para borrar tareas
listEditRouter.delete(
  "/api/delete/:id",
  [checkToken, checkRol, validId],
  async (req, res) => {
    try {
      const idTask = new ObjectId(req.params.id);
      const db = await connectDB();
      const collection = db.collection("tasklist");
      const tasks = await collection.deleteOne({ _id: { $eq: idTask } });
      res.status(200).send({ message: "Task was deleted." });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);
//ruta:   http://127.0.0.1:3000/api/delete/id

//Ruta para editar tareas
listEditRouter.put(
  "/api/edit/:id",
  [checkToken, checkRol, validId, validPut],
  async (req, res) => {
    try {
      const idTask = new ObjectId(req.params.id);
      const taskEdit = req.body;
      const db = await connectDB();
      const collection = db.collection("tasklist");
      const tasks = await collection.updateOne(
        { _id: { $eq: idTask } },
        { $set: taskEdit }
      );
      res.status(200).send({ message: "Task was updated." });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);
/*ruta:   http://127.0.0.1:3000/api/update/id
 {
            "task": "task 20",
            "description": "go to the gym",
            "status": "completed"
        }
*/

module.exports = listEditRouter;
