const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Courses = require("./Courses");
//Creating the IndividualTraineeSchema
const IndividualTraineeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      unique:true,
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    courses: [
      {
        CourseID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Courses",
        },
        chapters: [
            {
              type: String,
              required: true,
            }, 
        ],
        completed: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      
    ],
    wallet: {
      type: Number,
      required: true,
      default: 0,
    },
    
  },
  { timestamps: true }
);
//Modeling the IndividualTraineeSchema in the MongoDb Cluster and exporting into into usable variable
const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  IndividualTraineeSchema
);
module.exports = IndividualTrainee;
