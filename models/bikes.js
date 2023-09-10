const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
    name :{
     type : String,
     required : true
    },
    assemblyTime : {
        type : Number,
        required : true
    },
}
)

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;