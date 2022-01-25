const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema({
  id: String,
  name: String,
  age: Number,
  createdAt: { type: Date, default: new Date() },
});

const eventData =
  mongoose.models.personinfo || mongoose.model("personinfo", personSchema);
module.exports = eventData;
