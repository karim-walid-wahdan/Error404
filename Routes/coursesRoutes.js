const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourse,
  viewCoursePrice,
  filterCourseSubjectRating,
  filterCoursePrice,
  searchForCourse,
  rateaCourse,
  updateCourseDescription,
  getCourseDescription,
  getCourseChapter,
  getCourseReviews,
  getDiscountCourses,
  getPopularCourses,
  getCourseWithAllItsData,
  changeDiscountOfACourse,
  CoursesNotEnrolled,
  AddCoursesToTrainee
} = require("../Controller/coursesController");
router.route("/getCourse").get(getCourse);
router.route("/getCourses").get(getCourses);
router.route("/popularCourses").get(getPopularCourses);
router.route("/discountCourses").get(getDiscountCourses);
router.route("/getCourseReviews").get(getCourseReviews);
router.route("/filterCourseSubjectRating").post(filterCourseSubjectRating);
router.route("/filterCoursePrice").post(filterCoursePrice);
router.route("/searchForCourse").post(searchForCourse);
router.route("/filterCoursePrice").get(filterCoursePrice);
router.route("/searchForCourse").get(searchForCourse);
router.route("/rateaCourse/:id").put(rateaCourse);
router.route("/updateCourseDescription/:id").patch(updateCourseDescription);
router.route("/getCoursesChapter/:id").get(getCourseChapter);
router.route("/getCourseWithAllItsData").get(getCourseWithAllItsData);
router.route("/changeDiscountOfACourse/:id").put(changeDiscountOfACourse);

router.route("/getCourseDescription/:id").get(getCourseDescription);
router.route("/notEnrolledCourses/:id").get(CoursesNotEnrolled);
router.route("/addCourseToTrainee/:id").put(AddCoursesToTrainee);
module.exports = router;
