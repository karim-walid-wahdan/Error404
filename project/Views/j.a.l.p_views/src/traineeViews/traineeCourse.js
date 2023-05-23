import { Fragment, useState, useEffect } from "react";
import {Button,Rating} from "@mui/material";
import axios from "axios";
import "./../styling/courseOverView.css"
import YoutubeVideo from "../general/assests/youtubeVideo";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';

function TraineeCourse() {
    const {courseid,userType,userId} =useParams();
    const [course,setCourse]=useState(null);
    const [errMsg,setErrMsg]=useState("");
    const [overAllRating, setOverAllRating] = useState(0);
    const[ir,setIR]=useState(null);
    const[tr,setTR]=useState(null);
    const[text,setText]=useState('');
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
        setText("Congratulation for completing the course . TJALP organization")
    },[])

    function goToChapter(){
        navigate("/"+userType+"/"+userId+"/chapters/"+course._id);
    }
   
    function handleTR(){
          axios.put('/course/rateaCourse/'+userId+"?reviewerID="+course._id,
          {
            rating:tr,
            review:"ay haga"
          })
    }
    function handleIR(){
        axios.put('/instructor/rateAnInstructor/63653e09c81ff58c1c877e6d'+"?reviewerID="+course._id,
          {
            Rating:ir,
            ReviewBody:"ay haga"
          })
    }
    function print(){
        const doc = new jsPDF();
        doc.text(text,10,10);
        doc.save(text.pdf);
    }
    return (
        
        <Fragment>
            {course&&<Fragment>
                <div style={{display:"flex",width:"97vw",marginBottom:"1vh"}}><h1 className="courseTitle" >{course.courseTitle} </h1></div>
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
              
               <div>
                <h1>
                    Instructor Rating 
                </h1>

                <Rating
        name="simple-controlled"
        value={ir}
        onChange={(event, newValue) => {
          setIR(newValue);
        }}
      />
     <button onClick={handleIR}> Done</button>
               </div>
               <div>
               <h1>
                    Course Rating 
                </h1>

                <Rating
        name="simple-controlled"
        value={tr}
        onChange={(event, newValue) => {
          setTR(newValue);
        }}
      />
      <button onClick={handleTR}> Done</button>
               </div>
                <div>
                    
                        <button onClick={goToChapter} style={{marginTop:"5px",marginRight:"10px",width:"20vw"}} variant="contained"> Take my To Course Chapters  </button>
                    
                </div>
                <div>
                    
                        <button onClick={print} style={{marginTop:"5px",marginRight:"10px",width:"20vw"}} variant="contained"> print Certificate  </button>
                    
                </div>
                </Fragment>
            }
            {!course&&<h1>{errMsg} </h1>}
        </Fragment>
            
    );
  }
  export default  TraineeCourse;