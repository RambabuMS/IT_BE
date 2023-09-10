import Bike from '../models/bikes.js';

const createBikes = async(req,res)=>{
    try{
        await Bike.create(req.body);
        res.status(201).json({success: true, message:"Bikes created successfully"})
    }catch(err){
        res.status(500).json({success: false, message : err.message});
    }
}

const getBikes = async(req,res)=>{
    try{
        const bikes = await Bike.find();
        res.status(200).json({success: true, bikes})
    }catch(err){
        res.status(500).json({success: false, message : err.message});
    }
}

export default {
    createBikes,
    getBikes
}