import Bike from "../models/bikes.js";
import Bikes from "../models/bikes.js";
import Production from "../models/productionRecords.js";
import moment from "moment";

const selectBike = async (req, res) => {
  try {
    const { userId, bikeId, str } = req.body;

    if (str === "post") {
      const bike = await Bikes.findById(bikeId);
      if (!bike) {
        return res.status(404).json({ message: "Bike not found" });
      }
      const assemblyTime = bike.assemblyTime;
      const statusCheck = await Production.find({
        employeeId: userId,
        status: "Inprogress",
      });
      const record = {
        employeeId: userId,
        bikeId,
        assemblyTime,
        status: "Inprogress",
      };

      if (statusCheck.length === 0) {
        await Production.create(record);
        const empBikelist = await Production.find({
          employeeId: userId,
        }).populate("bikeId");

        res.status(201).json({ success: true, data: empBikelist });
      } else {
        const empBikelist = await Production.find({
          employeeId: userId,
        }).populate("bikeId");
        res.status(200).json({
          success: true,
          data: empBikelist,
          message: "Already another bike is Inprogress",
        });
      }
    } else if (str === "get") {
      const empBikelist = await Production.find({
        employeeId: userId,
      }).populate("bikeId");

      res.status(200).json({ success: true, data: empBikelist });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRecords = async (req, res) => {
  console.log(req.query);
  try {
    const { userId, date } = req.query;
    const bikes = await Bike.find();
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);
    const productionRecords = await Production.find({
      employeeId: userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: "Completed",
    }).populate("bikeId");

    res
      .status(200)
      .json({ success: true, data: productionRecords, bikes: bikes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    let matchStage;
    let productionRecords;

    if (fromDate && toDate) {
      const formattedFromDate = moment(fromDate).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      const formattedToDate = moment(toDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      matchStage = {
        createdAt: {
          $gte: new Date(formattedFromDate),
          $lte: new Date(formattedToDate),
        },
        status: "Completed",
      };
    } else matchStage = { status: "Completed" };
    const groupStage = {
      _id: "$bikeId",
      count: { $sum: 1 },
    };
    const aggregatedData = await Production.aggregate([
      { $match: matchStage },
      { $group: groupStage },
    ]);
    productionRecords = await Production.populate(aggregatedData, {
      path: "_id",
      select: "name",
      model: "Bike",
    });

    res.status(200).json({ success: true, data: productionRecords });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  selectBike,
  getRecords,
  getAllRecords,
};
