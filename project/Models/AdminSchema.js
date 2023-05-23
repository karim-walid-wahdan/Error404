const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creating the AdminSchema
const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      unique:true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//Modeling the AdminSchema in the MongoDb Cluster and exporting into into usable variable
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
