require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const listViewRouter = require("./routers/list-view-router");
const listEditRouter = require("./routers/list-edit-router");
const checkToken = require("./middlewares/checkToken");
const connectDB = require("./db");
const ModelUsers = require("./schemas/userModel");

app.use(express.json());
app.use(cors());

//Middleware tipo Aplicación para validar que los métodos HTTP sean válidos.
app.use((req, res, next) => {
  const methodsEntry = ["GET", "PUT", "DELETE", "POST"];
  if (methodsEntry.includes(req.method)) {
    next();
  } else {
    return res.status(400).send("Method is invalid.");
  }
});

//Ruta para Loguearse
app.post("/login", async (req, res) => {
  try {
    const userLogin = req.body.user;
    const passwordLogin = req.body.password;
    await connectDB();
    const userFind = await ModelUsers.find({
      $and: [{ user: userLogin }, { password: passwordLogin }],
    });

    if (userFind.length === 0) {
      res.status(400).send({ message: "User does not exist." });
    } else {
      const payload = {
        user: userFind.user,
        password: userFind.password,
        rol: userFind[0].rol,
      };
      const token = jwt.sign(payload, process.env.SECRET);
      res.status(200).send({ message: "Token was generated.", token });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
/* ruta:  http://127.0.0.1:8080/login
  {
    "user": "admin@tasklist.com",
    "password": "admin123"
  }
*/

//Ruta Raiz
app.get("/", checkToken, (req, res) => {
  res.send("WELCOME TO TASK-LIST!");
});

app.use([listViewRouter, listEditRouter]);

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
