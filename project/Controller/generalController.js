const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const asyncHandler = require("express-async-handler");
const corporateTrainee = require("../Models/CorporateTrainee");
const individualTrainee = require("../Models/IndividualTrainee");
const instructor = require("../Models/InstructorSchema");
const admin = require("../Models/AdminSchema");
const transporter = nodemailer.createTransport({
    service : "hotmail",
    auth : {
        user : "malak.hesham@outlook.com",
        pass : "locky123"
    }
})
function createRandomPassword() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const forgetPassword=async (req,res)=>{
  const newPassword = createRandomPassword();
  let user = await individualTrainee.findOne({email:req.body.email})
  if(user)
  {
    individualTrainee.findByIdAndUpdate(user._id,{password:bcrypt.hash(newPassword,saltRounds)})
  }
  else
  {
    user = await corporateTrainee.findOne({email:req.body.email})
    if(user)
    {
      corporateTrainee.findByIdAndUpdate(user._id,{password:bcrypt.hash(newPassword,saltRounds)})
    }
    else
    {
      user = await instructor.findOne({email:req.body.email})
      if(user)
      {
      instructor.findByIdAndUpdate(user._id,{password:bcrypt.hash(newPassword,saltRounds)})
      }
      else
      {
        user = await admin.findOne({email:req.body.email})
        if(user)
        {
          admin.findByIdAndUpdate(user._id,{password:bcrypt.hash(newPassword,saltRounds)})
        }
        else
        {
          res.status(404).send("please provide an registered email address")
        }
      }
    }
  }
  var mailOptions = {
    from: 'malak.hesham@outlook.com',
    to: req.body.email,
    subject: 'Password Recovery Email from JALP organisation',
    text: "your new password is : "+ newPassword+"\n please don't share it with any one"
  };
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(201).send(info.response);
  }
});

}
const login = async(req,res)=>{
  console.log(await bcrypt.hash("karimmalak",10));
  let user = await individualTrainee.findOne({email:req.body.email})
  let route = ""; 
  if(user)
  {
    individualTrainee.findByIdAndUpdate(user._id,{ email:req.body.email})
    route="/IndividualTrainee"
  }
  else
  {
    user = await corporateTrainee.findOne({email:req.body.email})
    if(user)
    {
      corporateTrainee.findByIdAndUpdate(user._id,{ email:req.body.email})
      route="/CorporateTrainee"
    }
    else
    {
      console.log(req.body.email)
      user = await instructor.findOne({email:req.body.email})
      if(user)
      {
      instructor.findByIdAndUpdate(user._id,{ email:req.body.email})
      route="/instructor"
      }
      else
      {
        user = await admin.findOne({email:req.body.email})
        if(user)
        {
          admin.findByIdAndUpdate(user._id,{ email:req.body.email})
          route="/admin"
        }
        else
        {
          res.status(404).send("please provide an registered email address")
          return;
        }
      }
    }
  }
  console.log(await bcrypt.hash(req.body.password,10))
  console.log(user)
  console.log(route)
  console.log(await bcrypt.hash("Inst5pass",10))

  if(req.body.password){bcrypt.compare(req.body.password,user.password,function(err, response){res.status(201).send({ response  ,route,user})});}
  else{res.send(404);}
}
const signUp= async(req,res)=>{
  let user = req.body;
  let individualTraineeFound = await individualTrainee.findOne({email:req.body.email})
  let corporateTraineeFound = await corporateTrainee.findOne({email:req.body.email})
  let instructorFound = await instructor.findOne({email:req.body.email})
  let adminFound = await admin.findOne({email:req.body.email})
  if(individualTraineeFound||corporateTraineeFound||instructorFound||adminFound)
  {
    res.status(409).send("this email already exists");
  }
  else
  {
    user.password = await bcrypt.hash(user.password,saltRounds);
    const test = individualTrainee.create(user);
    res.status(200).send("userCreated");
    console.log(test)
  }
}
module.exports = {
    forgetPassword,
    login,
    signUp
};