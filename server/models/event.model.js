// get an instance of mongoose and mongoose.Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  characterName: {
    type: String
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: {createdAt: "createdAt" } });

module.exports = mongoose.model("Event", eventSchema);