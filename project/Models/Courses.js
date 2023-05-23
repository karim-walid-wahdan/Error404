const mongoose = require("mongoose");
const CorporateTrainee = require("./CorporateTrainee");
const IndividualTrainee = require("./IndividualTrainee");
const Instructor = require("./InstructorSchema");
const Schema = mongoose.Schema;
//Creating the CoursesSchema
const CoursesSchema = new Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    courseDescriptionVideo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    numberOfHours: {
      type: Number,
      required: true,
    },
    courseSubject: {
      type: String,
      required: true,
      enum: ["Maths", "Tech", "Science"],
    },
    discount: {
      avalbiale: {
        type: Boolean,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
      },
    },
    instructor: {
      instructorName: {
        type: String,
        required: true,
      },
      instructorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Instructor,
      },
    },
    enrolledTrainees: {
      type: Number,
      default:0,
    },
    reviews: [
      {
        review: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
          max: 5,
          min: 0,
        },
        reviewedBy: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: "TraineeType",
        },
        traineeType: {
          type: String,
          required: true,
          enum: ["CorporateTrainee", "IndividualTrainee"],
        },
      },
    ],
    chapters: [
      {
        chapterNumber: {
          type: Number,
          required: true,
        },
        chapterTitle: {
          type: String,
          required: true,
        },
        chapterNumber: {
          type: Number,
          required: true,
        },
        chapterVideo: {
          type: String,
        },
        instructorNotes: {
          type: String,
          required: true,
        },
        totalHours: {
          type: Number,
          required: true,
        },
        exercise: [
          {
            questionHead: {
              type: String,
              required: true,
            },
            answers: [
              {
                answerBody: {
                  type: String,
                  required: true,
                },
                valid: {
                  type: Boolean,
                  required: true,
                  default: false,
                },
              },
            ],
          },
        ],
        chaptersAssessments: [
          {
            questionHead: {
              type: String,
              required: true,
            },
            answers: [
              {
                answerBody: {
                  type: String,
                  required: true,
                },
                valid: {
                  type: Boolean,
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
//Modeling the CoursesSchema in the MongoDb Cluster and exporting into into usable variable
const Courses = mongoose.model("Courses", CoursesSchema);
module.exports = Courses;
