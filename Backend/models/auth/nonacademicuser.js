const mongoose = require('mongoose')

const nonacademicSchema = new mongoose.Schema({
    nonname:{
        type:String,
        required : true,  //should contain value
        trim: true
    },
    nonnic:{
        type:String,
        required : true,
        trim: true
    },
    nonemail:{
        type:String,
        required : true,
        trim: true
    },
    nonmobile:{
        type:Number,
        required : true,
        trim: true
    },
    nongender:{
        type: String,
        required : true,
        trim: true
    },
    nonrole:{
        type: Number,
        default:0
    },
    nonpwd:{
        type:String,
        required : true,
    }
}, {
    timestamps: true
})




module.exports = mongoose.model('Nonacademics', nonacademicSchema)