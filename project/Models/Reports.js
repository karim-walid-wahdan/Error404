const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creating the Reports of a Problem
const ReportsSchema = new Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "clientType",
    },
    clientType: {
      type: String,
      required: true,
      enum: ["Instructor", "IndividualTrainee", "CorporateTrainee"],
    },
    reportType:{
        type: String,
        required: true,
        enum: ["Technical", "Financial", "Other"],
    },
    status:{
        type: String,
        required: true,
        enum: ["Unseen", "Pending", "Resolved"],
        default: "Unseen",
    }
  },
  { timestamps: true }
);
//Modeling the Payments in the MongoDb Cluster and exporting into into usable variable
const Reports = mongoose.model("Reports", ReportsSchema);
module.exports = Reports;
