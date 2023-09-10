import mongoose from 'mongoose';

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

export default Bike;