const express = require("express");
const listEditRouter = express.Router();
const validPost = require("../middlewares/validPost");
const validPut = require("../middlewares/validPut");
const validId = require("../middlewares/validId");
const checkToken = require("../middlewares/checkToken");
const checkRol = require("../middlewares/checkRol");
const connectDB = require("../db");
const ModelTask = require("../schemas/taskModel");

//Ruta para agregar tareas
listEditRouter.post(
  "/api/add",
  [checkToken, checkRol, validPost],
  async (req, res) => {
    try {
      await connectDB();
      const newtask = await new ModelTask(req.body);
      newtask.save();
      const tasks = await ModelTask.find({});
      res.status(200).send({ message: "Task was added." });
    } catch (error) {
      throw new error();
    }
  }
);
/* ruta:  http://127.0.0.1:8080/api/add
  {
    "task": "task 6",
    "description": "Go to the cinema",
    "state": "incomplete"
  }
*/

//Ruta para borrar tareas
listEditRouter.delete(
  "/api/delete/:id",
  [checkToken, checkRol, validId],
  async (req, res) => {
    try {
      const idTask = req.params.id;
      await connectDB();
      const tasks = await ModelTask.deleteOne({ _id: { $eq: idTask } });
      res.status(200).send({ message: "Task was deleted." });
    } catch (error) {
      throw new Error();
    }
  }
);
//ruta:   http://127.0.0.1:8080/api/delete/id

//Ruta para editar tareas
listEditRouter.put(
  "/api/edit/:id",
  [checkToken, checkRol, validId, validPut],
  async (req, res) => {
    try {
      const idTask = req.params.id;
      const taskEdit = req.body;
      await connectDB();
      const tasks = await ModelTask.updateOne(
        { _id: { $eq: idTask } },
        { $set: taskEdit }
      );
      res.status(200).send({ message: "Task was updated." });
    } catch (error) {
      throw new Error();
    }
  }
);
/*ruta:   http://127.0.0.1:8080/api/edit/id
 {
            "task": "task 6",
            "description": "Send an email",
            "state": "incomplete"
        }
*/

module.exports = listEditRouter;
