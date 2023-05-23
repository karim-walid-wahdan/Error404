const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creating the Payments
const PaymentSchema = new Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
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
      enum: ["Instructor", "IndividualTrainee"],
    },
  },
  { timestamps: true }
);
//Modeling the Payments in the MongoDb Cluster and exporting into into usable variable
const Payments = mongoose.model("Payments", PaymentSchema);
module.exports = Payments;
