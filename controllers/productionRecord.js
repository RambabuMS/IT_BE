const Bikes = require("../models/bikes");
const Production = require("../models/productionRecords");

exports.selectBike = async(req,res)=>{
    try{
        const { username, bikeId } = req.body;
      const bike = await Bikes.findById(bikeId);
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      const assemblyTime = bike.assemblyTime;
      const record = { username, bikeId, assemblyTime };
      await Production.create(record);

      res.status(201).json({success: true, message:"Record Created" })
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

