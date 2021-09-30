const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    uid : {
        type : String,
        required: true
    },
    class : {
        type : String,
        required: true
    },
    perpose : {
        type : String,
        required: true
    },
    bank : {
        type : String,
        required: true
    },
    amount : {
        type : Number,
        required: true
    },
    date : {
        type : Date,
        required: true
    },
    payslip : {
        type : String,
        required: true
    },

})

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = Payment;