const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const admins = require("../Models/AdminSchema");
const corporateTrainee = require("../Models/CorporateTrainee");
const instructor = require("../Models/InstructorSchema");
const saltRounds = 10;

// Adding another Admin (requirement 55)
/* Request body
{"username" : "",
"email" : "",
"password" : ""
}
*/
exports.addAdmin = asyncHandler(async (req, res) => {
  if (await admins.findOne({ email: req.body.email })) {
    res.status(409).send("Email already in use");
    return;
  }

  if (await admins.findOne({ username: req.body.username })) {
    res.status(409).send("Username already in use");
    return;
  }
  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPwd;
  admins.create(req.body);
  res.status(201).send("New Admin created");
});

// Adding a Corporate Trainee (requirement 56)
/* Request body (no need to add courses as empty array)
{"firstName" : "",
"lastName" : "",
"email" : "",
"username" : "",
"password" : "",
"gender" : , (true or false)
"country" : "",
"corporate" : ""
}
*/

exports.addCorporateTrainee = asyncHandler(async (req, res) => {
  if (await corporateTrainee.findOne({ email: req.body.email })) {
    res.status(409).send("Email already in use");
    return;
  }
  if (await corporateTrainee.findOne({ username: req.body.username })) {
    res.status(409).send("Username already in use");
    return;
  }
  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPwd;
  corporateTrainee.create(req.body);
  res.status(201).send("New Corporate Trainee created");
});

// Adding an Instructor (requirement 57)
/* Request body (no need to add reviews/courses as empty array)
{"firstName" : "",
"lastName" : "",
"email" : "",
"username" : "",
"password" : "",
"gender" : , (true or false)
"country" : ""
}
*/
exports.addInstructor = asyncHandler(async (req, res) => {
  if (await instructor.findOne({ email: req.body.email })) {
    res.status(409).send("Email already in use");
    return;
  }
  if (await instructor.findOne({ username: req.body.username })) {
    res.status(409).send("Username already in use");
    return;
  }
  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPwd;
  instructor.create(req.body);
  res.status(201).send("New Instructor created");
});
