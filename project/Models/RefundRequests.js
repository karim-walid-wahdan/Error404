const mongoose = require("mongoose");
const Courses = require("./Courses");
const IndividualTrainee = require("./IndividualTrainee");
const Schema = mongoose.Schema;
//Creating the Reports of a Problem
const RefundRequestsSchema = new Schema(
  {
    trainee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IndividualTrainee,

    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Courses,
      },
    status:{
      type: String,
      required: true,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    }
     
  },
  { timestamps: true }
);
//Modeling the Payments in the MongoDb Cluster and exporting into into usable variable
const RefundRequests = mongoose.model("RefundRequests", RefundRequestsSchema);
module.exports = RefundRequests;
