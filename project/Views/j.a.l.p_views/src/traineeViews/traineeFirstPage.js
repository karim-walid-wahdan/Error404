import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseDrawer from "../general/assests/courseDrawer";
import NavBarTrainee from "../general/assests/navBarTrainee";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ReportAProblem from "../general/ReportAProblem";
import Button from '@mui/material/Button';
import TraineeCourseDrawer from "./traineeCourseDrawer";

function TraineeFirstPage (){
    const {traineeId,userType} =useParams();
    const [traineeInfo, settraineeInfo] = useState(null);
    const [courses, setCourses] = useState(null);
    const [completedcourses, setCompletedcourses] = useState(null);
    const [notEnrolledCourses, setNotEnrolledCourses] = useState(null);
    const navigate = useNavigate();
  
  //getting the Courses the trainee is taking either finished or not
  // if finished will be added in completedCourses
  //other wise will  be added in courses
    useEffect(() => {
        axios
          .get("/trainee/"+userType+"/getById/"+traineeId)
          .then(function (response) {
            console.log("traineee");
            console.log(response);
            settraineeInfo(response);
            let temp1 = [];
            let temp2 = [];
            if(response){
            for(let i =0;i<response.data.courses.length;i++){
              const courseId = response.data.courses[i].CourseID;
              if(response.data.courses[i].completed)
                 temp2.push(courseId);
              else
                temp1.push(courseId);
            }
            setCourses(temp1);
            setCompletedcourses(temp2);
          }
    });
      }, []);
 
      //get Courses on the system and trainee not enrolled in 
      useEffect(() => {
        axios
          .get("/course/notEnrolledCourses/"+traineeId)
          .then(function (response) {
            console.log("courses not enrolled in");
            console.log(response);
            setNotEnrolledCourses(response.data);
            
    });
      }, []);
   
      console.log("coursessss");
      console.log(courses);

      function handleCLick(){
        navigate('/'+userType+'/'+traineeId+'/reportAProblem/');
      }
      function handleCLick1(){
        navigate('/MyReports/'+traineeId);
      }

      return (
        <>
        <div>
          <NavBarTrainee></NavBarTrainee>
        </div>
          <div>
            {
                courses && 
                
                <TraineeCourseDrawer  title="My Courses" courses={courses} userType={userType} userId={traineeId}/>
            }
            <div>
            {
                completedcourses && 
                <TraineeCourseDrawer title="Completed Courses" courses={completedcourses} userType={userType} userId={traineeId}/>
            }
            </div>

            <div>
            {
                notEnrolledCourses && 
                <CourseDrawer title="What we have for you" courses={notEnrolledCourses} userType={userType} userId={traineeId}/>
            }
            </div>


            <Button onClick={handleCLick} sx={{ justifyContent:"center",marginLeft: 6,alignItems:"center"}} variant="contained">Report a Problem</Button>
            
            <Button onClick={handleCLick1} sx={{ justifyContent:"center",marginLeft: 6,alignItems:"center"}} variant="contained">Follow up on my problems </Button>
          </div>

        </>
      );

}

export default TraineeFirstPage ;
