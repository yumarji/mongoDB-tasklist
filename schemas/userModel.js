const mongoose = require("mongoose");

const SchemaUsers = mongoose.Schema({
  user: { type: String, require: true },
  password: { type: String, require: true },
  rol: { type: String, require: true },
});

const ModelUsers = mongoose.model("users", SchemaUsers);

module.exports = ModelUsers;
