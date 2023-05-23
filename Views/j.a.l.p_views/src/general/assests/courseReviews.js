import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {Rating,Divider} from "@mui/material";
import "../../styling/courseReviews.css";
function CourseReviews({courseId}) 
{
    let [reviews,setReviews] =useState([]); 
    useEffect(()=>{
        if(courseId){
        axios.get("/course/getCourseReviews?courseId="+courseId)
        .then(
                (res)=>
                {  
                    setReviews(res.data);
                }
             )
        .catch((res)=>{console.log(res)});}},[])
    
    return(
        <div className="ReviewsSection">
            <div className="reviewHeader" style={{display:"flex",height:"8vh"}}> 
            <h1 className="reviewP">Reviews</h1>
            <p className="numberOfReviews">{reviews.length} Reviews</p></div>
            <div className="reviews">
                {((!reviews)||reviews.length===0)&& (<h1 className="errorMessage">there are currently no course reviews</h1>)}
                {reviews&& reviews.map(
                        (review) => {
                            return (
                            <div className="singleReview" key={review.review + review.rating}>
                                <Fragment>
                                    <h1 className="reviewBody">{review.review}</h1>
                                    <p className="reviewedBy"style={{fontSize:"small"}} >by: {review.reviewedBy}</p>
                                    <div className="ratingReviewBody">
                                        <Rating sx={{ width: "100%", color: "#f4976c" }}value={review.rating}precision={0.1} readOnly/>
                                        <p className="ratingP">{review.rating} out of 5 stars</p>
                                    </div>
                                </Fragment>
                            </div>
                            );
                        }
                    )
                }
            </div>
        </div>
    )
}
export default CourseReviews;