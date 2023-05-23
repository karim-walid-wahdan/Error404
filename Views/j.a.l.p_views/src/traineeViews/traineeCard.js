import { Fragment, useState, useEffect } from "react";
import "./../styling/courseCard.css";
import {Rating,Divider} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function TraineeCard({courseId,userType,userId}) {
    const [course,setCourse]=useState(null);
    const [errMsg,setErrMsg]=useState("");
    const [overAllRating, setOverAllRating] = useState(0);
    const [numberOfReviews, setNumberOfReviews] = useState(0);
    const navigate= useNavigate();
    useEffect(()=>{
        axios.get("/course/getCourse?courseId="+courseId)
        .then(
                (res)=>
                {
                    setCourse(res.data);
                    setNumberOfReviews(res.data.reviews.length)
                    let averageRarting = 0;
                    res.data.reviews.forEach((review) => {averageRarting += review.rating;});   
                    setOverAllRating(Math.floor((averageRarting / res.data.reviews.length) * 10)/ 10);
                }
             )
        .catch((res)=>{setErrMsg(res.response.data)});   
    },[])
    const handleClick= ()=>{
        console.log(userType);
            navigate("/"+(userType?userType:"guest")+"/"+userId+"/traineeCourse/"+course._id);

    }
    return (
        <div className="cardOutline" onClick={handleClick} >
            {course&&<Fragment>
                <h1 className="title">{course.courseTitle}</h1>
                <Divider />
                <div className="instructor_Rating">
                <p className="instructor"> by: {course.instructor.instructorName}</p>
                <Rating sx={{ width: "50%",alignSelf:"center", margin: "auto",color: "#f4976c" }} name="CourseRating" value={overAllRating} precision={0.1} readOnly/>
                </div>
                <div >
                <p className="Details"> Estimated number of hours: {course.numberOfHours} hour</p>
                <p className="Details"> Subject: {course.courseSubject} </p>
                {(!course.discount.avaliable)?<p className="Details"><b>price:</b>{course.price} coin</p>:<p className="Details"><b>price:</b><s >{course.price}</s> <b style={{color:"#ff0000"}}>{(!(course.discount.percentage===1))?(course.price-course.price*course.discount.percentage):"free"}</b></p>}
                        
                </div>
                </Fragment>
            }
            {!course&&<h1>{errMsg}</h1>}
            
        </div>
    );
  }
  export default TraineeCard;