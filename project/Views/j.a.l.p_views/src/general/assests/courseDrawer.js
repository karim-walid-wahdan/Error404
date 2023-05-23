import { Fragment} from "react";
import CourseCard from "./courseCard"
import "../../styling/courseDrawer.css";
function CourseDrawer({courses,title,userType,userId}) {
    return (
        <Fragment>      
            <div className="Title" >
                {title&&<h1>{title}</h1>}
                </div>  
            {
            (courses&&courses.length!==0)&&<div className="Drawer" >
           
            {courses.map((course) => {return(<CourseCard key={course} courseId={course} userType={userType} userId={userId}></CourseCard>);})}
            </div>}
        {((!courses)||(courses&&courses.length===0))&&<h1 className="Error"> no courses avaliable</h1>}
        </Fragment>

    );
  }
  export default CourseDrawer;