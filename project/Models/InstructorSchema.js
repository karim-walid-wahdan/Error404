const mongoose = require("mongoose");
const Courses = require("./Courses");
const Schema = mongoose.Schema;
//Creating the InstructorSchema
const InstructorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
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
    reviews: [
      {
        ReviewBody: {
          type: String,
        },
        Rating: {
          type: Number,
          required: true,
        },
      },
    ],
    courses: [
      {
        CourseID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Courses",
        },
      },
    ],
  },
  { timestamps: true }
);
//Modeling the InstructorSchema in the MongoDb Cluster and exporting into into usable variable
const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;
