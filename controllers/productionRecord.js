const Bikes = require("../models/bikes");
const Production = require("../models/productionRecords");

exports.selectBike = async(req,res)=>{
    try{
        const { userId, bikeId } = req.body;
      const bike = await Bikes.findById(bikeId);
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      const assemblyTime = bike.assemblyTime;
      const record = { employeeId : userId, bikeId, assemblyTime, status: 'inProgress'};
      await Production.create(record);

      const empBikelist = await Production.find({employeeId: userId}).populate('bikeId')

      res.status(201).json({success: true, data: empBikelist})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


exports.getRecords = async(req,res)=>{
    try{
        const { username, date } = req.query;
        const productionRecords = await Production.find({username: username,createdAt: date});

        res.status(200).json({success : true, data: productionRecords})

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

