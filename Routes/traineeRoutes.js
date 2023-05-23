const express = require("express");
const router = express.Router();
const {
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
  ViewedForIndividualTrainee
} = require("../Controller/traineeController");
router
  .route("/IndividualTrainee/setCountry/:id")
  .put(setIndividualIraineeCountry);
router
  .route("/CorporateTrainee/setCountry/:id")
  .put(setCorporateTraineeCountry);
router
  .route("/IndividualTrainee/viewCourseInfo/:id")
  .get(getIndividualIraineeCourseInfo);
router
  .route("/CorporateTrainee/viewCourseInfo/:id")
  .get(getCorporateIraineeCourseInfo);
router.route("/setI").post(setIndvidualTrainee);
router.route("/setC").post(setCorperateTrainee);
router.route("/IndividualTrainee/changePassword/:id").put(changeIndvPassword);
router.route("/CorpoarateTrainee/changePassword/:id").put(changeCopPassword);
router.route("/IndividualTrainee/getById/:id").get(getIndvidualTrianeeById);
router.route("/CorpoarateTrainee/getById/:id").get(getCorporateTrianeeById);
router.route("/IndividualTrainee/getById/:id").get(getIndvidualTrianeeById);
router.route("/CorpoarateTrainee/getById/:id").get(getCorporateTrianeeById);
router.route("/getIndividualTrainee/:id").get(getIndividualIrainee);
router.route("/getCorporateTrainee/:id").get(getCorporateIrainee);
router.route("/getIndividualTraineeCourses/:id").get(getTraineeCourses);
router.route("/changeProgress/:id").put( ViewedForIndividualTrainee);

module.exports = router;
