import mongoose from 'mongoose';

const productionRecordSchema = new mongoose.Schema({
  status:{
    type : String,
    enum: ['inProgress', 'Completed'],
    required: true
  },
  bikeId:{
    type : mongoose.ObjectId,
    ref : "Bike"
  },
  employeeId:{
    type : mongoose.ObjectId,
    ref : "Users"
  },
  assemblyTime:{
    type : Number,
    required : true
  }, 
  
},
  { timestamps: true}
);

const ProductionRecord = mongoose.model('ProductionRecord', productionRecordSchema);

export default ProductionRecord;