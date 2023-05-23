const { query } = require("express");
const asyncHandler = require("express-async-handler");
const { parseInt } = require("lodash");
const { default: mongoose } = require("mongoose");
const Courses = require("../Models/Courses");
const Instructor = require("../Models/InstructorSchema");


const getInstructorById = asyncHandler(async (req, res) => {
  const instructorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    res.status(404).send("the id given is in a invalid form ");
  }
  let instructorFound = await Instructor.find({
    _id: mongoose.Types.ObjectId(instructorId),
  });
  if (instructorFound.length != 1) {
    res.status(404).send("the insttuctor is not found");
  }
  const instructor = await Instructor.findById(instructorId);
  if (!instructor) {
    res.status(400);
  }
  res.status(200).json(instructor);
});

const changePassword = asyncHandler(async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);
  if (!instructor) {
    res.status(400);
  }
  const {password} = req.body;
  const resa = await Instructor.findByIdAndUpdate(
    req.params.id,
    { password: password },
    {
      new: true,
    }
  );
  if (resa) res.status(200).send("Done");
  else res.status(400);
});
// just a helper mthod and not part of the requirements
const setInstructor = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    gender,
    country,
    reviews,
    courses,
  } = req.body;
  const it = await Instructor.create({
    firstName,
    lastName,
    email,
    username,
    password,
    gender,
    country,
    reviews,
    courses,
  });
  if (it) {
    res.status(201);
  } else {
    res.status(400);
  }
});
const setInstructorCountry = asyncHandler(async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);

  if (!instructor) {
    res.status(400);
  }

  const updatedInstructor = await Instructor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedInstructor);
});



//create a new course
const createNewCourse = asyncHandler(async (req, res) => {
  const instructorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    res.status(404).send("the id given is in a invalid form ");
  }
  const {
    courseTitle,
    courseDescription,
    courseDescriptionVideo,
    price,
    numberOfHours,
    courseSubject,
    discount,
    enrolledTrainees,
    reviews,
    chapters,
    chapterAssesment
  } = req.body;
  // check if id is valid.
  let instructorFound = await Instructor.find(
    { _id: mongoose.Types.ObjectId(instructorId) },
    { firstName: 1, lastName: 1 }
  );
  if (instructorFound.length != 1) {
    res.status(404).send("the insttuctor is not found");
  }
  const exists =
    (
      await Courses.find({
        courseTitle: courseTitle,
        "instructor.instructorId": mongoose.Types.ObjectId(instructorId),
      })
    ).length > 0
      ? true
      : false;
  console.log(exists);
  if (exists) {
    res.status(404).send("the course already exists");
    return;
  }
  for (let i = 0; i < chapters.length; i++) {
    console.log(chapters[i].chapterTitle);

    for (let j = i + 1; j < chapters.length; j++) {
      if (chapters[i].chapterTitle === chapters[j].chapterTitle) {
        res
          .status(404)
          .send(
            "chapter number:" +
              i +
              "chapter number: " +
              j +
              "have the same name please rename either and try again"
          );
      }
    }
  }
  Courses.create({
    courseTitle: courseTitle,
    courseDescription: courseDescription,
    courseDescriptionVideo: courseDescriptionVideo,
    price: price,
    numberOfHours: numberOfHours,
    courseSubject: courseSubject,
    discount: discount,
    instructor: {
      instructorId:instructorId,
      instructorName:instructorFound[0].firstName + instructorFound[0].lastName,
    },
    enrolledTrainees: enrolledTrainees,
    reviews: reviews,
    chapters: chapters,
    chaptersAssessments:chapterAssesment
  }).then((response)=>{res.status(200).send("course created")}).catch((response) => {res.status(400).send("course not created")});
  
});
//View all Courses given by the instructor j
const viewAllInstructorCourses = asyncHandler(async (req, res) => {
  let courseTitles = [];
  const instructorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    res.status(404).send("the id given is in a invalid form ");
  }
  let instructorFound = await Instructor.find({
    _id: mongoose.Types.ObjectId(instructorId),
  });
  if (instructorFound.length != 1) {
    res.status(404).send("the insttuctor is not found");
  }
  const instructorCourses = (
    await Courses.find({
      "instructor.instructorId": mongoose.Types.ObjectId(instructorId),
    })
  ).forEach((course) => {
    courseTitles.push(course._id);
  });
  if (courseTitles.length == 0) {
    res.status(200).send("you are not currently teaching any courses ");
  }
  res.status(200).json(courseTitles);
});
const filterInstructorCourses = asyncHandler(async (req, res) => {
  let coursesFiltered = [];
  const instructorId = req.params.id;
  const price = req.query.Price || -1;
  const subject = req.query.Subject || null;
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    return res.status(404).send("the id given is in a invalid form ");
  }
  let instructorFound = await Instructor.find({
    _id: mongoose.Types.ObjectId(instructorId),
  });
  if (instructorFound.length != 1) {
    return res.status(404).send("the insttuctor is not found");
  }
  let query = {
    "instructor.instructorId": mongoose.Types.ObjectId(instructorId),
  };
  if (subject != null) {
    query = {
      courseSubject: subject,
      price: { $gte: price },
      "instructor.instructorId": mongoose.Types.ObjectId(instructorId),
    };
  } else {
    query = {
      price: { $gte: price },
      "instructor.instructorId": mongoose.Types.ObjectId(instructorId),
    };
  }
  const instructorCourses = (await Courses.find(query)).forEach((course) => {
    coursesFiltered.push(course);
  });
  if (coursesFiltered.length == 0) {
    return res.status(200).send("no course given by you matches  your filter");
  }
  res.status(200).json(coursesFiltered);
});
const searchInstructorCourses = asyncHandler(async (req, res) => {
  let searchResult = [];
  const instructorId = req.params.id;
  const title = req.query.Title || null;
  const subject = req.query.Subject || null;
  console.log(req.query);
  console.log(title);
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    res.status(404).send("the id given is in a invalid form ");
  }
  let instructorFound = await Instructor.find({
    _id: mongoose.Types.ObjectId(instructorId),
  });
  if (instructorFound.length != 1) {
    res.status(404).send("the insttuctor is not found");
  }
  const instructorCourses = (
    await Courses.find({
      $or: [{ courseSubject: subject }, { courseTitle: title }],
      "instructor.instructorId": mongoose.Types.ObjectId(instructorId),
    })
  ).forEach((course) => {
    searchResult.push(course);
  });

  if (searchResult.length == 0) {
    res.status(200).send("no course given by you matches  your Search");
  }
  res.status(200).json(searchResult);
});

// Instructor can view his/her ratings on their Courses
// Instructor need to view the course ratings and reviews for all its courses
const getInstructorCourseRatings = asyncHandler(async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);
  let j = 0;
  const result = [];
  if (!instructor) {
    res.status(400);
  }
  for (let i = 0; i < instructor.courses.length; i++) {
    //  result += "course"+" "+(i+1)+"\n"
    var id = instructor.courses[i].CourseID;
    const course = await Courses.findById(id).select("courseTitle reviews");
    result[j] = course;
    j++;
    // result+=course+""
  }
  res.status(200).json(result);
});

//Instructor can upload a video link from Youtube under each subtitle and enter a short description of the video
//post method
//Instructor will change a specific course so I need to have both instructor id and course id
// However this mean that instructor changes to the course will be global is that coreect ??
const setInstructorCourseVideoandDescription = asyncHandler(
  async (req, res) => {
    const id = req.params.id;
    const course = await Courses.findById(req.params.id);
    if (!course) {
      res.status(400);
    }
    const chaptersTemp = [];
    const { chapterTitle, chapterVideo, instructorNotes } = req.body;
    console.log(chapterTitle);
    console.log(chapterVideo);
    console.log(instructorNotes);
    for (let i = 0; i < course.chapters.length; i++) {
      //  result += "course"+" "+(i+1)+"\n"
      if (course.chapters[i].chapterTitle == chapterTitle) {
        const totalHours = course.chapters[i].totalHours;
        const tempEX = course.chapters[i].exercise;
        const chapt = course.chapters[i].chaptersAssessments;
        const newchapter = {
          chapterTitle: chapterTitle,
          chapterVideo: chapterVideo,
          instructorNotes: instructorNotes,
          totalHours: totalHours,
          exercise: tempEX,
          chaptersAssessments: chapt,
        };
        console.log(newchapter);
        chaptersTemp[i] = newchapter;
        console.log(chaptersTemp[i]);
      } else {
        chaptersTemp[i] = course.chapters[i];
      }
    }

    const resa = await Courses.findByIdAndUpdate(
      req.params.id,
      { chapters: chaptersTemp },
      {
        new: true,
      }
    );

    // const updatedCourse = await Courses.findByIdAndUpdate(req.params.id, chaptersTemp, {
    //   new: true,
    // })
    if (resa) res.status(200).send("Done");
    else res.status(400);
  }
);

const rateAnInstructor = asyncHandler(async (req, res) => {
  const instructorRate = await Instructor.findById(req.params.id);
  req.query.reviewerID;
  const { ReviewBody } = req.body;
  const { Rating } = req.body;
  const reviewsTemp = [];
  if(Rating>5||Rating<0){
    res.status(400).send("Please enter a rating between 0 and 5"); 
  }
  if (!instructorRate) {
    res.status(400).send("instructor not found!");
  }
  if (!Rating || !ReviewBody) {
    res.status(400).send("Please fill in all the field");
  }
 
  else 
  {
    flag=false
    for (let i = 0; i < instructorRate.reviews.length; i++) {
      if(!instructorRate.reviews[i]){
        continue;
      }

      reviewsTemp[i]=instructorRate.reviews[i];
      }
      
        reviewsTemp[reviewsTemp.length] = {ReviewBody: ReviewBody,Rating: Rating};
      

  }
  console.log(reviewsTemp);
  const ratedInstructor = await Instructor.findByIdAndUpdate(req.params.id,
    {reviews: reviewsTemp},
    {new: true}
  );

  res.status(200).send(ratedInstructor) 
});

const getRating = asyncHandler(async (req, res) => {
  const instructorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    return res.status(404).send("the id given is in a invalid form ");
  }
  let instructorFound = await Instructor.find(
    { _id: mongoose.Types.ObjectId(instructorId) },
    { reviews: 1 }
  );
  if (instructorFound.length != 1) {
    return res.status(404).send("the insttuctor is not found");
  }
  res.status(202).send(instructorFound);
});


const getAllInstructor = asyncHandler(async (req, res) => {
  const course = await Instructor.find().select();
  res.status(200).json(course);
});

const getamountOwed= asyncHandler(async (req, res) => {

  let courses = [];
  const instructorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    res.status(404).send("the id given is in a invalid form ");
  }
  let instructorFound = await Instructor.find({
    _id: mongoose.Types.ObjectId(instructorId),
  });
  if (instructorFound.length != 1) {
    res.status(404).send("the insttuctor is not found");
  }
  const instructorCourses = (
    await Courses.find({
      "instructor.instructorId": mongoose.Types.ObjectId(instructorId),
    })
  ).forEach((course) => {
    courses.push(course);
  });
 
  let amountOwed = 0;
  courses.forEach((course)=>{
   const numberOfTrainees = course.enrolledTrainees.length
   const coursePrice = course.price
   const numberOfMonths = course.numberOfHours/12.0
   const courseDiscount = course.discount.avaliable ? course.discount.percentage : 0.0;
   const amountOwedPerCourse = ((coursePrice-(coursePrice*courseDiscount))*numberOfTrainees)/numberOfMonths
   amountOwed += amountOwedPerCourse;
  })

    res.status(200).json(amountOwed);
});


module.exports = {
  getInstructorById,
  viewAllInstructorCourses,
  filterInstructorCourses,
  searchInstructorCourses,
  createNewCourse,
  setInstructorCountry,
  getInstructorCourseRatings,
  setInstructorCourseVideoandDescription,
  setInstructor,
  rateAnInstructor,
  getRating,
  getAllInstructor,
  getInstructorById,
  changePassword,
  getamountOwed
};
/* Sample test data for createNewCourses:
{
        "CourseTitle": "The Bio-chemistry of neural networks in relation to Linear Algebra 909",
        "Price": 420 ,
        "NumberOfHours": 900,
        "contract": "contract",
        "CertifcateForm": "Triple PHd." ,
        "CourseSubject":"Science",
        "Discount": {"Avaliable":false,"Percentage":0},
        "Instructors":
        [
            {"instructorName": "InstFN3 InstLN3","instructorId":"636556c55ccca85b4590cfdb"},{"instructorName": "InstFN2 InstLN2","instructorId": "6365564d5ccca85b4590cfd7"},{"instructorName": "InstFN4 InstLN4","instructorId":"6366a0b271f0916539a58fd9"}
        ],
        "EnrolledTrainees":[],
        "Reviews":[], 
        "chapters":[{"chapterTitle":"the Physics of neuro-chemistry", "instructorNotes": " ","totalHours":"50"}]
}       
*/
