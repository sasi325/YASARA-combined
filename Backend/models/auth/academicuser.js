const mongoose = require('mongoose')

const academicSchema = new mongoose.Schema({
    afirstname:{
        type:String,
        required : true,  //should contain value
        trim: true
    },
    alastname:{
        type:String,
        required : true,
        trim: true
    },
    anic:{
        type:String,
        required : true,
        unique: true
    },
    aemail:{
        type:String,
        required : true,
        unique: true
    },
    amobile:{
        type:Number,
        required : true,
        trim: true
    },
    agender:{
        type: String,
        required : true,
        trim: true
    },
    stream:{
        type: String,
        trim: true,
        default: " "
    },
    arole:{
        type: Number,
        default:0
    },
    subject:{
        type: String,
        trim: true,
        default: " "       
    },
    classes:{
        type:Array,
        default : []
    },
    apwd:{
        type:String,
        required : true,
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('Academics', academicSchema)