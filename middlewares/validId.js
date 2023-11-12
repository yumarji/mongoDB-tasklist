////Middleware para validar que el ID se encuentre dentro de la lista de tareas, es utilizado en los métodos DELETE y PUT.

const { ObjectId } = require("mongodb");
const connectDB = require("../db");

module.exports = async function (req, res, next) {
  try {
    const idTask = new ObjectId(req.params.id);
    const db = await connectDB();
    const collection = db.collection("tasklist");
    const task = await collection.findOne({ _id: idTask });
    if (!task) {
      return res.status(400).send({ error: "ID doesn't exist." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).send({ error: "Error en el ID" });
  }
};
