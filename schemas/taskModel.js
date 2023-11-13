const mongoose = require("mongoose");

const SchemaTask = mongoose.Schema({
  task: { type: String, require: true },
  description: { type: String },
  state: { type: String, require: true },
});

const ModelTask = mongoose.model("tasks", SchemaTask);

module.exports = ModelTask;
