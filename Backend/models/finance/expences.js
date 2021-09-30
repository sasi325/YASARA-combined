const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  payslip: {
    type: String,
    required: true,
  },
});

const Expence = mongoose.model("Expence", expenceSchema, "expences");

module.exports = Expence;
