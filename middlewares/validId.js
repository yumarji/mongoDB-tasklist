////Middleware para validar que el ID se encuentre dentro de la lista de tareas, es utilizado en los métodos DELETE y PUT.
const connectDB = require("../db");
const ModelTask = require("../schemas/taskModel");

module.exports = async function validId(req, res, next) {
  try {
    const idTask = req.params.id;
    await connectDB();
    const tasks = await ModelTask.findOne({ _id: idTask });
    if (!tasks) {
      return res.status(400).send({ error: "ID doesn't exist." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).send({ error: "Error en el ID" });
  }
};
