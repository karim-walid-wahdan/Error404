const asyncHandler = require("express-async-handler");
const Courses = require("../Models/Courses");
const IndividualTrainee = require("../Models/IndividualTrainee");
const CorporateTrainee = require("../Models/CorporateTrainee");

const mongoose = require("mongoose");
const axios = require("axios")
//get a specfic course by id
const getCourse = asyncHandler(async (req, res) => {
  const courseId = req.query.courseId;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(404).send("the id given is in a invalid form ");
  }
  const course = await Courses.findById(courseId);
  if(course){ res.status(200).json(course);}
  else{
    res.status(404).send("pleases provide a valid course id");
  }
});
const getTrainee= async (courseReviews)=>{
  
}
const getCourseReviews = asyncHandler(async (req, res) => {
  const courseId = req.query.courseId;
  let reviewRes =[]; 
  //checking if the given id is in a valid form 
  if (!mongoose.Types.ObjectId.isValid(courseId)) 
  {
    res.status(404).send("the id given is in a invalid form ");
  }
  //get the course reviews array using the course id 
    const courseReviews = (await Courses.findById(courseId,{reviews:1})).reviews;
  //looping on the array and converting every reviewedby element into its corresponding trainee name 
  //(p.s must use a normal for loop cause for each is async)  
  for(const review of courseReviews )
  {
    const traineeId = review.reviewedBy;
    //checking on the trainee type stored in the database to know where to look at  
    if(review.traineeType==="IndividualTrainee")
    {
      const trainee  =  await (IndividualTrainee.findById(review.reviewedBy,{firstName:1,lastName:1}))
      //adding the finalised review form to the result array  
      reviewRes.push({review:review.review,rating:review.rating,reviewedBy:trainee.firstName+" "+trainee.lastName})
    }
    else if(review.traineeType==="CorporateTrainee")
    {
      const trainee  = await  (CorporateTrainee.findById(review.reviewedBy,{firstName:1,lastName:1}))
      //adding the finalised review form to the result array 
      reviewRes.push({review:review.review,rating:review.rating,reviewedBy:trainee.firstName+" "+trainee.lastName})
    }
  }
  console.log(reviewRes);
    if(reviewRes.length!==0){
      res.status(200).send(reviewRes);
    }
    else{
      res.status(404).send("no reviews avaliable");  
    }
}
)
//view courses title along with total hours and rating ( requirement 7)
const getCourses = asyncHandler(async (req, res) => {
  let courses = [];
   (await Courses.find({},{_id:1})).forEach((course)=>{courses.push(course._id)})
  res.status(200).send(courses);
});

//view price of each course (requirement 8)
const viewCoursePrice = asyncHandler(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    res.status(400);
  }
  const temp = course.price;
  res.status(200).json(temp);
});

//filter course by subject and/or rating
const filterCourseSubjectRating = asyncHandler(async (req, res) => {
  const { courseSubject } = req.query;
  const { rating } = req.query;
  if (!courseSubject) {
    if (!rating) {
      let courses = [];
      (await Courses.find({},{_id:1})).forEach((id)=>{courses.push(id._id);})
      res.send(courses);
    } else {
      let courses = [];
      (await Courses.find({"reviews.rating": rating},{_id:1})).forEach((id)=>{courses.push(id._id);})
      res.send(courses);
    }
  } else {
    if (!rating) {
      let courses = [];
      (await Courses.find({ courseSubject: courseSubject},{_id:1})).forEach((id)=>{courses.push(id._id);})
      res.send(courses);
    } else {
      let courses = [];
      (await Courses.find({ courseSubject: courseSubject },{ "reviews.rating": rating },{_id:1})).forEach((id)=>{courses.push(id._id);})
      res.send(courses);
    }
  }
  res.status(400).json({ error: error.message });
});

const filterCoursePrice = asyncHandler(async (req, res) => {
  const { priceTo, priceFrom } = req.query;
  if (!priceFrom && !priceTo) {
    let courses = [];
    (await Courses.find({},{_id:1})).forEach((id)=>{courses.push(id._id);})
    res.send(courses);
  }
  if (!priceFrom || !priceTo) {
    res.status(404).send("you didnt enter both fields");
  } else {
    let courses = [];
    (await Courses.find({$and: [{ price: { $lte: priceTo } }, { price: { $gte: priceFrom } }],},{_id:1})).forEach((id)=>{courses.push(id._id);})
    res.send(courses);
  }
});

//filter course by subject and/or rating
const searchForCourse = asyncHandler(async (req, res) => {
  const { courseTitle, courseSubject, instructorName } = req.query;

  if (!courseSubject) {
    if (!courseTitle) {
      if (!instructorName) {
        res.status(404).send("you didnt enter fields");

        console.log(courseTitle);
      } else {
        let courses = [];
        (await Courses.find({"instructor.instructorName": instructorName},{_id:1})).forEach((id)=>{courses.push(id._id);})
        res.send(courses);
      }
    } else {
      let courses = [];
      (await Courses.find({ courseTitle: courseTitle },{_id:1})).forEach((id)=>{courses.push(id._id);})
      res.send(courses);
    }
  } else {
    let courses = [];
    (await Courses.find({ courseSubject: courseSubject },{_id:1})).forEach((id)=>{courses.push(id._id);})
    res.send(courses);
  }
  res.status(404).send("no answers");
});



const rateaCourse = asyncHandler(async (req, res) => {
  const courseRateId = await Courses.findById(req.params.id);
  var reviewer = await IndividualTrainee.findById(req.query.reviewerID);
  var reviewerType="";
  flag = false;
  if(!reviewer){
    reviewer = await CorporateTrainee.findById(req.query.reviewerID);
    flag= true;
  }
  if(!reviewer){
    res.status(400).send("invalid traineeId");
  }
  if(flag){
    reviewerType="CorporateTrainee";
   }
   else{
    reviewerType="IndividualTrainee";
   }

  req.query.reviewerID;
  const { rating } = req.body;
  const { review } = req.body;
  const reviewsTemp = [];

  if(rating>5||rating<0){
    res.status(400).send("Please enter a rating between 0 and 5");
  }
  if (!courseRateId) {
    res.status(400).send("course not found!");
  }
  if (!rating && !review) {
    res.status(400).send("Please fill in the field");
  }
  if (!rating) {
    res.status(400).send("Please enter the rating");
  }
  if (!review) {
    res.status(400).send("Please enter the review");
  } 
  else {
    flag= false;
    for (let i = 0; i < courseRateId.reviews.length; i++) {
      if(!courseRateId.reviews[i]){
        continue;
      }
      if (courseRateId.reviews[i].reviewedBy == (req.query.reviewerID)) 
      {
        flag=true;
        reviewsTemp[i] = {review: review,rating: rating,reviewedBy: req.query.reviewerID,traineeType:reviewerType};
      }
      else
      {
        reviewsTemp[i] = courseRateId.reviews[i];
      }
    }
    if(!flag){
      
      reviewsTemp[reviewsTemp.length] = {review: review,rating: rating,reviewedBy: req.query.reviewerID,traineeType:reviewerType};
      }
  }
  const ratedCourse = await Courses.findByIdAndUpdate(req.params.id,
    {reviews: reviewsTemp},
    {new: true}
  );

  res.status(200).send(ratedCourse) 
});

const updateCourseDescription = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(404).send("the course id given is in an invalid form");
  }
  const courseDescription = req.body.courseDescription;
  const courseDescriptionVideo = req.body.courseDescriptionVideo;
  if ((await Courses.find({ _id: courseId })).length != 0) {
    await Courses.findByIdAndUpdate(req.params.id, {
      courseDescription: req.body.courseDescription,
      courseDescriptionVideo: req.body.src,
    });
    res
      .status(200)
      .send({
        id: req.params.id,
        courseDescription: req.body.courseDescription,
        src: req.body.src,
      });
  } else {
    res.status(404).send("no course with the id :" + courseId + " was found");
  }
});
const getCourseDescription = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(404).send("the course id given is in an invalid form");
  }
  const course = await Courses.find(
    { _id: courseId },
    { courseDescription: 1, courseDescriptionVideo: 1 }
  );
  if (course.length == 0) {
    res.status(404).send("the course id :" + courseId + "doesnt exist");
  }
  res.status(200).send(course);
});

//for Mostafa bdl el elmwgood
const getCourseChapter = asyncHandler(async (req, res) => {
  const courseID = req.params.id;
  const chapter = req.query.chapter || null;
  console.log(chapter);
  let query = { _id: mongoose.Types.ObjectId(courseID) };
  if (chapter != null) {
    query = { _id: mongoose.Types.ObjectId(courseID), chapter: chapter };
    const course = await Courses.findOne(query);
    let chapterNumber = [];
    (await course.chapters).forEach((exercises) => {
      chapterNumber.push(exercises);
    });

    res.status(200).json(course.chapters);
    return;
  }
  const course = await Courses.findOne(query);
  res.status(200).json(course);
});

const getCourseWithAllItsData = asyncHandler(async(req,res) => {
  const course = await Courses.find();
  res.status(200).json(course);
})

const changeDiscountOfACourse = asyncHandler(async(req,res) => { 
  if(req.body.discountValue !== 0){
    let inPercentage = req.body.discountValue/100;
    let x = true;
    const course = await Courses.findByIdAndUpdate(req.params.id , {
      discount: {avaliable:x,percentage:inPercentage}
    });
    console.log(course);
    res.status(200).json(course);

  }

})

const getPopularCourses = asyncHandler(async(req,res)=>{
  const popularCourses =[];
  (await Courses.find({},{_id:1}).sort({enrolledTrainees:-1}).limit(20)).forEach((course)=>
  {
    popularCourses.push(course._id); 
  });
  if(popularCourses.length!==0){
    res.status(200).send(popularCourses);
  }
  else{
    res.status(404).send("the courses collection can't be found");
  }
})
const getDiscountCourses = asyncHandler(async(req,res)=>{
  const discountCourses = [];
  (await Courses.find({"discount.avaliable":true,"discount.percentage":{$gt :0}},{_id:1}).sort({"discount.percentage":-1}).limit(20)).forEach((course)=>{
    discountCourses.push(course._id);
  });
  if(discountCourses.length!==0){
    res.status(200).send(discountCourses);
  }
  else{
    res.status(200).send("there are currently no courses on discount");
  }
})

const CoursesNotEnrolled = asyncHandler(async(req,res)=>{
  const traineeID = req.params.id;
  let coursesNotEnrolledIn = [];
  const allCourses = await Courses.find()
  const trainee = await IndividualTrainee.findById(req.params.id);
  let flag = true;
  if(trainee){
  const traineeCourses = trainee.courses;
  let i =0;
  let j =0;
  for(i = 0;i<allCourses.length;i++ ){
     flag = true;
      for(j =0;j<traineeCourses.length;j++){
        if(traineeCourses[j].CourseID==allCourses[i]._id)
           flag = false;
      }
      if(flag){
        coursesNotEnrolledIn.push(allCourses[i]._id)
      }
    }
  }

  else  {
    const trainee = await CorporateTrainee.findById(req.params.id);
    if(trainee){
    const traineeCourses = trainee.courses;
    let i =0;
    let j=0;
  for( i = 0;i<allCourses.length;i++ ){
     flag = true;
      for(j =0;j<traineeCourses.length;j++){
        if(traineeCourses[j].CourseID==allCourses[i]._id)
           flag = false;
      }
      if(flag){
        coursesNotEnrolledIn.push(allCourses[i]._id)
      }
    }
  }
    else
      res.status(404).send("in valid");
  }

  res.status(200).send(coursesNotEnrolledIn);
         
})

//add courses to trainee

const AddCoursesToTrainee = asyncHandler(async(req,res)=>{
  const traineeID = req.params.id;
  const courseId = req.query.id2
  const trainee = await IndividualTrainee.findById(req.params.id);
  let updatedtrainee=null;
  let tempCourses = [];
  if(trainee){
    let i=0
    for(i=0;i<trainee.courses.length;i++)
          tempCourses[i]=trainee.courses[i]
      tempCourses[i]={CourseID:courseId,chapters:[],completed:false};
     updatedtrainee = await IndividualTrainee.findByIdAndUpdate(
      req.params.id,
      {
          courses : tempCourses
      }
    );

  }

  else  {
    const trainee = await CorporateTrainee.findById(req.params.id);
    if(trainee){
      let i=0
      for(i=0;i<trainee.courses.length;i++)
            tempCourses[i]=trainee.courses[i]
        tempCourses[i]={CourseID:courseId,chapters:[],completed:false};
       updatedtrainee = await IndividualTrainee.findByIdAndUpdate(
        req.params.id,
        {
            courses : tempCourses
        }
      );
  }
    else
      res.status(404).send("in valid");
  }

  res.status(200).send(updatedtrainee);
         
})

module.exports = {
  filterCourseSubjectRating,
  filterCoursePrice,
  getCourse,
  getCourses,
  viewCoursePrice,
  searchForCourse,
  rateaCourse,
  updateCourseDescription,
  getCourseDescription,
  getCourseChapter,
  getCourseReviews,
  getPopularCourses,
  getDiscountCourses,
  CoursesNotEnrolled,
  AddCoursesToTrainee,
  getCourseWithAllItsData,
  changeDiscountOfACourse,
};
   
    // console.log("rated course id  "+req.params.id)
// console.log("rating entered  "+rating)
// console.log("review  "+review)
// console.log("the id of the trainee "+req.query.reviewerID)

