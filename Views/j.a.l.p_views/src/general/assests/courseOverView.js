import { Fragment, useState, useEffect } from "react";
import {Button,Rating} from "@mui/material";
import axios from "axios";
import "../../styling/courseOverView.css"
import CourseReviews from "./courseReviews";
import YoutubeVideo from "./youtubeVideo";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function CourseOverView() {
    const {courseid,userType,userId} =useParams();
    const [course,setCourse]=useState(null);
    const [errMsg,setErrMsg]=useState("");
    const [overAllRating, setOverAllRating] = useState(0);
    const[requestHandle,setRequestHandle]= useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/course/getCourse?courseId="+courseid)
        .then(
                (res)=>
                {
                    setCourse(res.data);
                    let averageRarting = 0;
                    res.data.reviews.forEach((review) => {averageRarting += review.rating;});   
                    setOverAllRating(Math.floor((averageRarting / res.data.reviews.length) * 10)/ 10);
                }
             )
        .catch((res)=>{setErrMsg(res.response.data)});   
    },[])

    function goToChapter(){
        navigate("/trainee/"+userId+"/chapters/"+course._id);
        navigate("/"+userType+"/"+userId+"/chapters/"+course._id);
    }
    function handleEnroll(){
           navigate('/Payment/'+userId+'/'+courseid)
    }
    function handleRequest(){
        setRequestHandle(true);
        axios.post('/createRequestAccess',{
            trainee: userId ,
            course : courseid
        })
    }
    return (
        
        <Fragment>
            {course&&<Fragment>
                <div style={{display:"flex",width:"97vw",marginBottom:"1vh"}}><h1 className="courseTitle" >{course.courseTitle} </h1></div>
                <div style={{display:"flex",width:"97vw",marginBottom:"1vh"}}><h1 className="courseTitle" >{course.courseTitle}
                 </h1>{(userType=='IndividualTrainee') && <Button onClick={handleEnroll} style={{marginTop:"5px",marginRight:"10px",width:"20vw"}} variant="contained">Enroll now</Button>}
                 {(userType=='CorporateTrainee') && <Button onClick={handleRequest} style={{marginTop:"5px",marginRight:"10px",width:"20vw"}} variant="contained">Request Access</Button>}
                 </div>
                <YoutubeVideo  src={course.courseDescriptionVideo} height={"50"} width={"97"} marginValue ={"1.5"}title={course.courseTitle+" DescriptionVideo"}/>
                <div className="courseOverView">
                    <div className="courseDescripation">
                        <h1>course Description</h1>
                        <p>{course.courseDescription}</p>
                    </div>
                    <div className="courseDetails">
                    <h1>important info</h1>
                        <p><b>by:</b>{course.instructor.instructorName}</p>
                        {(!course.discount.avaliable)?<p><b>price:</b>{course.price} coin</p>:<p><b>price:</b><s >{course.price}</s> <b style={{color:"#ff0000"}}>{(!(course.discount.percentage===1))?(course.price-course.price*course.discount.percentage):"free"}</b></p>}
                        <p><b>number of hours:</b>{course.numberOfHours}</p>
                        <b style={{alignSelf:"center"}}>rating: </b>
                        <Rating  name="CourseRating" value={overAllRating} precision={0.1} readOnly/><br/><br/>
                        <b>{overAllRating} out of 5 stars </b>
                        
                    </div>
                </div>
              
                <CourseReviews courseId={courseid} />
               
                </Fragment>
            }
            {!course&&<h1>{errMsg} </h1>}
        </Fragment>
            
    );
  }
  export default CourseOverView;