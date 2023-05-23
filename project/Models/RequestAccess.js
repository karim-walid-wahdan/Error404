const mongoose = require("mongoose");
const CorporateTrainee = require("./CorporateTrainee");
const Courses = require("./Courses");
const Schema = mongoose.Schema;
//Creating the Reports of a Problem
const RequestAccessSchema = new Schema(
  {
    trainee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: CorporateTrainee,

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
const RequestAccess = mongoose.model("RequestAccess", RequestAccessSchema);
module.exports = RequestAccess;
