
import { Fragment} from "react";
import {Grid} from "@mui/material";
import TraineeCard from "./traineeCard";
import "./../styling/courseDrawer.css";
function TraineeCourseDrawer({courses,title,userType,userId}) {
    return (
        <Fragment>      
            <div className="Title" >
                {title&&<h1>{title}</h1>}
                </div>  
            {
            (courses&&courses.length!==0)&&<div className="Drawer" >
            {courses.map((course) => {return(<TraineeCard key={course} courseId={course} userType={userType} userId={userId}></TraineeCard>);})}
            </div>}
        {((!courses)||(courses&&courses.length===0))&&<h1 className="Error"> no courses avaliable</h1>}
        </Fragment>

    );
  }
  export default TraineeCourseDrawer;