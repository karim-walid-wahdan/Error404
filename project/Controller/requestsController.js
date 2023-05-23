const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const CorporateTrainee = require("../Models/CorporateTrainee");
const Courses = require("../Models/Courses");
const IndividualTrainee = require("../Models/IndividualTrainee");
const Instructor = require("../Models/InstructorSchema");
const refundRequests = require("../Models/RefundRequests");
const reports = require("../Models/reports");
const RequestAccess = require("../Models/RequestAccess");
const requestAccess = require("../Models/RequestAccess");

exports.createRefundRequest = asyncHandler(async (req, res) => {
    refundRequests.create(req.body);
    res.send("Refund Request Sent");
  });

exports.createReport = asyncHandler(async (req, res) => {
    reports.create(req.body);
    res.send("Report Created");
  });

exports.createRequestAccess = asyncHandler(async (req, res) => {
    requestAccess.create(req.body);
    res.send("Access Request sent");
  });



exports.deleteRefundRequest = asyncHandler(async (req, res) => {
    refundRequests.findOneAndDelete({
        _id : req.params.id
      }).exec(function(err,user){
        if(err){
          response.send("Can not delete request");
        }
        else{
          response.send("Request done and deleted");
        }
      })
  });

exports.deleteReport = asyncHandler(async (req, res) => {
    reports.findOneAndDelete({
        _id : req.params.id
      }).exec(function(err,user){
        if(err){
          response.send("Can not delete report");
        }
        else{
          response.send("report resolved and deleted");
        }
      })  });

exports.deleteRequestAccess = asyncHandler(async (req, res) => {
    requestAccess.findOneAndDelete({
        _id : req.params.id
      }).exec(function(err,user){
        if(err){
          response.send("Can not delete request");
        }
        else{
          response.send("Request done and deleted");
        }
      })  
    });


exports.getRefundRequest = asyncHandler(async (req, res) => {
    const refReq = await refundRequests.findById(req.params.id);
    res.send(refReq);
  });

exports.getReport = asyncHandler(async (req, res) => {
    const reported = await reports.findById(req.params.id);
    res.send(reported);
  });

exports.getRequestAccess = asyncHandler(async (req, res) => {
    const reqAcc = await requestAccess.findById(req.params.id);
    res.send(reqAcc);
  });


exports.getClientReport = asyncHandler(async(req,res) => {
  const clientId = req.params.clientId;
  console.log(clientId);
  const yourReports = await reports.find({client : clientId}
  )
  if(yourReports.length == 0){
    res.send("You Do Not Have Any Reports");
    return;
  }
  res.send(yourReports);
})


exports.getAllRefundRequest = asyncHandler(async (req, res) => {
    const refReq = await refundRequests.find();
    let theItemIWishIHave=[];
    for(let i = 0; i<refReq.length; i++){
      if(refReq[i].status == "pending"){
        theItemIWishIHave.push({
          requestID : refReq[i]._id,
          userID : refReq[i].trainee,
          username: (await IndividualTrainee.findById(refReq[i].trainee)).username,
          coursename: (await Courses.findById(refReq[i].course)).courseTitle,
          price: (await Courses.findById(refReq[i].course)).price,
          status: refReq[i].status
        });
      };
    }
    res.send(theItemIWishIHave);
  });

exports.getAllReport = asyncHandler(async (req, res) => {
    const reported = await reports.find();
    let theItemIWishIHave=[];
    let theUserWhoDoesNotLikeSomething = "";
    for(let i = 0; i<reported.length; i++){
      if(reported[i].status != "Resolved"){

        if(reported[i].clientType == "Instructor"){
          theUserWhoDoesNotLikeSomething = (await Instructor.findById(reported[i].client)).username;
        }
        else if(reported[i].clientType == "IndividualTrainee"){
          theUserWhoDoesNotLikeSomething = (await IndividualTrainee.findById(reported[i].client)).username;
        }
        else if(reported[i].clientType == "CorporateTrainee"){
          theUserWhoDoesNotLikeSomething = (await CorporateTrainee.findById(reported[i].client)).username;
        }

        theItemIWishIHave.push({
          reportId : reported[i]._id,
          problem :  reported[i].problem,
          username: theUserWhoDoesNotLikeSomething,
          userType: reported[i].clientType,
          reportType: reported[i].reportType,
          status: reported[i].status
        });
      };
    }
    res.send(theItemIWishIHave);
  });

exports.getAllRequestAccess = asyncHandler(async (req, res) => {
  const reqAcc = await RequestAccess.find();
  let theItemIWishIHave=[];
  for(let i = 0; i<reqAcc.length; i++){
    if(reqAcc[i].status == "pending"){
      theItemIWishIHave.push({
        accRequestID : reqAcc[i]._id,
        userID : reqAcc[i].trainee,
        courseID: reqAcc[i].course,
        username: (await CorporateTrainee.findById(reqAcc[i].trainee)).username,
        corporate: (await CorporateTrainee.findById(reqAcc[i].trainee)).corporate,
        coursename: (await Courses.findById(reqAcc[i].course)).courseTitle,
        status: reqAcc[i].status
      });
    };
  }
  res.send(theItemIWishIHave);
  });


exports.changeRefundStatus = asyncHandler(async (req, res) => {  
    await refundRequests.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
      });
      if(req.body.status == 'accepted'){
        let adding= req.body.refundedAmount;
        let getWallet = (await IndividualTrainee.findById(req.body.userId)).wallet;
        adding += getWallet;
        await IndividualTrainee.findByIdAndUpdate(req.body.userId , {wallet: adding,})
      };
    res.send("Status Updated");
});


exports.changeReportStatus = asyncHandler(async (req, res) => {
    
    await reports.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
      });
    res.send("Status Updated");
});

exports.changeAccessRequestStatus = asyncHandler(async (req, res) => {
    
  await RequestAccess.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    if(req.body.status == 'accepted'){
      let user= req.body.userId;
      let course = req.body.courseId;
      let getUserCourses = (await CorporateTrainee.findById(req.body.userId)).courses;
      getUserCourses.push({CourseID:course});
      await CorporateTrainee.findByIdAndUpdate(user , {courses: getUserCourses,})
    };


  res.send("Status Updated");
});




