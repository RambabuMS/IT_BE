const mongoose = require('mongoose');

const productionRecordSchema = new mongoose.Schema({
  username:{
    type : String,
    required: true
  },
  bikeId:{
    type : mongoose.ObjectId,
    ref : "Bike"
  },
  employeeId:{
    type : mongoose.ObjectId,
    ref : "Employee"
  },
  assemblyTime:{
    type : Number,
    required : true
  }, 
  
},
  { timestamps: true}
);

const ProductionRecord = mongoose.model('ProductionRecord', productionRecordSchema);

module.exports = ProductionRecord;