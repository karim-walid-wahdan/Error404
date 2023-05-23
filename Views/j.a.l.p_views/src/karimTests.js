import UpdateCourseDescription from "./instructorViews/updateCourseDescription";
import UploadCourseDescription from "./instructorViews/uploadCourseDescription";
import { useState } from "react";
import YoutubeVideo from "./general/assests/youtubeVideo";
import AddExercise from "./instructorViews/addExercise";
import ViewRating from "./instructorViews/viewRating";
import Login from "./general/login";
import CourseCard from "./general/assests/courseCard";
import CourseDrawer from "./general/assests/courseDrawer";
import CourseReviews from "./general/assests/courseReviews";

function KarimTests() {
  const [exercises, SetExercises] = useState([]);
  const [src, setSrc] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const courses =["639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096",
  "639114e227ba150662d88096"]
  const handleClick = (courseDescription, src) => {
    setCourseDescription(courseDescription);
    setSrc(src);
  };
  const handleClickAddExcersie = (exercise) => {
    exercises.push(exercise);
    SetExercises(exercises);
    console.log(exercises);
  };
  return (
    <div className="App">
      <CourseReviews courseId={"639114e227ba150662d88096"}></CourseReviews>
      <CourseDrawer  title="my courses" courses={courses}/>
      <Login/>
      <CourseCard courseId={"639114e227ba150662d88096"}/>        
      <ViewRating instructorId={"63653e09c81ff58c1c877e6d"}></ViewRating> 
      <AddExercise handleClick={handleClickAddExcersie}></AddExercise>
      <UpdateCourseDescription
        courseId={"639114e227ba150662d88096"}
      ></UpdateCourseDescription>
      <UploadCourseDescription
        handleClick={handleClick}
      ></UploadCourseDescription>
      {src && <YoutubeVideo src={src} width="1000" height="600"></YoutubeVideo>}
      <h1>{src}</h1>
      <h1>{courseDescription}</h1>
    </div>
  );
}
export default KarimTests;
