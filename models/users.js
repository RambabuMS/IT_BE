const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum: ['admin', 'employee'],
        required : true
    }
})

const Users = mongoose.model("Users",userSchema);

module.exports = Users;