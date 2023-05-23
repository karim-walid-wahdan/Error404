const asyncHandler = require("express-async-handler");
const IndividualTrainee = require("../Models/IndividualTrainee");
const CorporateTrainee = require("../Models/CorporateTrainee");
const Courses = require("../Models/Courses");
const { default: mongoose } = require("mongoose");

// individual Trainee can select his/her country (requirement 6)
// add the individual Trainee id with the url to change the country of a certain individual Trainee

const getAllTrainees = asyncHandler(async (req, res) => {
  const course = await CorporateTrainee.find().select();
  res.status(200).json(course);
});

const setIndividualIraineeCountry = asyncHandler(async (req, res) => {
  const trainee = await IndividualTrainee.findById(req.params.id);

  if (!trainee) {
    res.status(400);
  }

  const updatedtrainee = await IndividualTrainee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedtrainee);
});


const getIndvidualTrianeeById = asyncHandler(async (req, res) => {
  const trainee = await IndividualTrainee.findById(req.params.id);
  if (!trainee) {
    res.status(400);
  }
  res.status(200).json(trainee);
});

const getCorporateTrianeeById = asyncHandler(async (req, res) => {
  const trainee = await CorporateTrainee.findById(req.params.id);
  if (!trainee) {
    res.status(400);
  }
  res.status(200).json(trainee);
});


const changeIndvPassword = asyncHandler(async (req, res) => {
  const individualTrainee = await IndividualTrainee.findById(req.params.id);
  if (!individualTrainee) {
    res.status(400);
  }
  const {password} = req.body;
  const resa = await IndividualTrainee.findByIdAndUpdate(
    req.params.id,
    { password: password },
    {
      new: true,
    }
  );
  if (resa) res.status(200).send("Done");
  else res.status(400);
});

const changeCopPassword = asyncHandler(async (req, res) => {
  const corporateTrainee = await CorporateTrainee.findById(req.params.id);
  if (!corporateTrainee) {
    res.status(400);
  }
  const {password} = req.body;
  const resa = await CorporateTrainee.findByIdAndUpdate(
    req.params.id,
    { password: password },
    {
      new: true,
    }
  );
  if (resa) res.status(200).send("Done");
  else res.status(400);
});

// Coorporate Trainee can select his/her country (requirement 6)
// add the individual Trainee id with the url to change the country of a certain individual Trainee
const setCorporateTraineeCountry = asyncHandler(async (req, res) => {
  console.log("testttttttttttt");
  console.log(req.body);
  const trainee = await CorporateTrainee.findById(req.params.id);

  if (!trainee) {
    res.status(400);
  }
  const updatedtrainee = await CorporateTrainee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  console.log("testttttttttttt");
  console.log(req.body);
  res.status(200).json(updatedtrainee);
});

//just a helper method for me // not from the requirements
const setIndvidualTrainee = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    gender,
    country,
    courses,
    wallet,
  } = req.body;
  const it = await IndividualTrainee.create({
    firstName,
    lastName,
    email,
    username,
    password,
    gender,
    country,
    courses,
    wallet,
  });

  if (it) {
    res.status(201);
  } else {
    res.status(400);
  }
});

////////////////////////////////////////////
//just a helper method for meee

const setCorperateTrainee = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    gender,
    country,
    corporate,
    courses,
  } = req.body;
  const it = await CorporateTrainee.create({
    firstName,
    lastName,
    email,
    username,
    password,
    gender,
    country,
    corporate,
    courses,
  });

  if (it) {
    res.status(201);
  } else {
    res.status(400);
  }
});

//Indvidual trainee can open all the items inside a course he/she is registered for including video and excericies
// since a trainee could have more than one course , so I want to retrive the info of the specific course that he/she wants
// Hence I need both trainee id and course id
// the question is for the same course it will apeear similarly for all enrolled trainees ??
// Also I need to esnure that they are viewing the courses that they are registered in
const getIndividualIraineeCourseInfo = asyncHandler(async (req, res) => {
  const trainee = await IndividualTrainee.findById(req.params.id);
  var x = 0;
  console.log(trainee);
  if (!trainee) {
    res.status(400);
  }
  const temp = await Courses.findById(req.query.id1);
  if (!temp) {
    res.status(400);
  }
  for (let i = 0; i < trainee.courses.length; i++) {
    console.log(trainee.courses[i]);
    var id = trainee.courses[i].CourseID;
    console.log(id);
    console.log(req.query.id1);
    if (id == req.query.id1) x = 1;
  }
  if (x == 0) res.status(404).send("You are not registered in the course");
  else {
    const course = await Courses.findById(req.query.id1).select(
      "courseTitle numberOfHours reviews certifcateForm courseSubject discount instructor reviews chapters"
    );
    res.status(200).json(course);
  }
  // console.log(course)
  // if(!course){
  //   res.status(400)
  // }
  // // if(!trainee.courses.findById(req.parameter.id2)){
  // //   throw new Error("You are Not registered to this Course")
  // // }
  //  else{
  // result = course.select('courseTitle numberOfHours reviews certifcateForm courseSubject discount instructors reviews chapters');
});

//Corporate trainee can open all the items inside a course he/she is registered for including video and excericies

const getCorporateIraineeCourseInfo = asyncHandler(async (req, res) => {
  const trainee = await CorporateTrainee.findById(req.params.id);
  var x = 0;
  console.log(trainee);
  if (!trainee) {
    res.status(400);
  }
  const temp = await Courses.findById(req.query.id1);
  if (!temp) {
    res.status(400);
  }
  for (let i = 0; i < trainee.courses.length; i++) {
    console.log(trainee.courses[i]);
    var id = trainee.courses[i].courseID;
    console.log(id);
    console.log(req.query.id1);
    if (id == req.query.id1) x = 1;
  }
  if (x == 0) res.status(404).send("You are not registered in the course");
  else {
    const course = await Courses.findById(req.query.id1).select(
      "courseTitle courseDescription courseDescriptionVideo price numberOfHours contract reviews certifcateForm courseSubject discount instructor reviews chapters"
    );
    res.status(200).json(course);
  }
});

//Getss all individual trainee data
const getIndividualIrainee = asyncHandler(async (req, res) => {
  const indTrain = await IndividualTrainee.findById(req.params.id);
  res.send(indTrain);
});

//Gets all corporate trainee data
const getCorporateIrainee = asyncHandler(async (req, res) => {
  const corpTrain = await CorporateTrainee.findById(req.params.id);
  res.send(corpTrain);
});

//Gets course data i need for front-end 
const getTraineeCourses = asyncHandler(async (req,res) => {
  const indTrain = await IndividualTrainee.findById(req.params.id);
  let arrayCourses=[];
  for( const courseHere of indTrain.courses){
    const tired = await (Courses.findById(courseHere.CourseID))
    arrayCourses.push({courseId:courseHere.CourseID,courseTitle:tired.courseTitle , price: tired.price})

  }
  res.send(arrayCourses);
})


//trigger indvidual trainee viewed course + update change progress
const ViewedForIndividualTrainee = asyncHandler(async (req, res) => {
  
  const individuaTtrainee = await IndividualTrainee.findById(req.params.id);
  const courseId = req.query.id2
  const course = await Courses.findById(req.query.id2);

  const {chapterTitle} = req.body;
  let courseExists = false;
  console.log(individuaTtrainee);
  //const newCourses = []
  if(individuaTtrainee){
    for (let i = 0; i < individuaTtrainee.courses.length; i++) {
      if(individuaTtrainee.courses[i].CourseID==courseId){
        individuaTtrainee.courses[i].chapters.push(chapterTitle);
        console.log(individuaTtrainee.courses[i].chapters);
          (await IndividualTrainee.findOneAndUpdate({_id:individuaTtrainee._id,"courses.CourseID":courseId},{$set:{"courses.$.chapters":(individuaTtrainee.courses[i].chapters)}}))
          courseExists=true;
          const temp = individuaTtrainee.courses[i].chapters.length/course.chapters.length;
          if(temp==1)
          (await IndividualTrainee.findOneAndUpdate({_id:individuaTtrainee._id,"courses.CourseID":courseId},{$set:{"courses.$.completed":true}}))
          res.send("done");
      }  
    }
    if(!courseExists)
    {
      res.status(404).send("the trainee is not registered in a course with the given id");
    }
  }
  else{
    const corporateTrainee = await CorporateTrainee.findById(req.params.id);
    
    if(corporateTrainee){
      for (let i = 0; i < corporateTrainee.courses.length; i++) {
        if(corporateTrainee.courses[i].CourseID==courseId){
          corporateTrainee.courses[i].chapters.push(chapterTitle);
          console.log(corporateTrainee.courses[i].chapters);
            (await CorporateTrainee.findOneAndUpdate({_id:corporateTrainee._id,"courses.CourseID":courseId},{$set:{"courses.$.chapters":(corporateTrainee.courses[i].chapters)}}))
            courseExists=true;
            const temp = corporateTrainee.courses[i].chapters.length/course.chapters.length;
            if(temp==1)
            (await CorporateTrainee.findOneAndUpdate({_id:corporateTrainee._id,"courses.CourseID":courseId},{$set:{"courses.$.completed":true}}))
            res.send("done");
        }  
      }
      
    if(!courseExists)
    {
      res.status(404).send("the trainee is not registered in a course with the given id");
    }
    }
    else{
      res.status(404).send("no trainee found with this id please enter a valid id")
    }
  }
}
 

);

//get IndvTrainee Enrolled Courses
const getIndvTrainEnrolledCourses = asyncHandler(async (req, res) => {
  const trainee = await IndividualTrainee.findById(req.params.id);
  if (!trainee) {
    res.status(400);
  }
  res.status(200).json(trainee.courses);
});

//get IndvTrainee Enrolled Courses
const getCopTrainEnrolledCourses = asyncHandler(async (req, res) => {
  const trainee = await CorporateTrainee.findById(req.params.id);
  if (!trainee) {
    res.status(400);
  }
  res.status(200).json(trainee.courses);
});

module.exports = {
  setIndividualIraineeCountry,
  setCorporateTraineeCountry,
  getIndividualIraineeCourseInfo,
  getCorporateIraineeCourseInfo,
  setIndvidualTrainee,
  setCorperateTrainee,
  getAllTrainees,
  getIndividualIrainee,
  getCorporateIrainee,
  changeIndvPassword, 
  changeCopPassword,
  getIndvidualTrianeeById,
  getCorporateTrianeeById,
  getTraineeCourses,
  getIndvTrainEnrolledCourses,
  getCopTrainEnrolledCourses,
  ViewedForIndividualTrainee
};
