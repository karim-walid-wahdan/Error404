import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, MenuItem, TextField } from "@mui/material";
import { useParams } from 'react-router-dom'

const RequestARefund = () => {   
    const {userId,courseid} =useParams();
  //  const userId = "639141b618a3b2b6d6a9a10a";

    const [courses , setCourses] = useState();
    const [courseChosen , setCourseChosen] = useState({courseChosen:null, ava:false,errMsg:""});

    useEffect(() => {

        axios.get("/trainee/getIndividualTraineeCourses/639141b618a3b2b6d6a9a10a" ) //"639141b618a3b2b6d6a9a10a"
        .then((res)=>
        {
            setCourses(res.data);
            console.log(res.data);
        })
      }, []);

// const allreqs = axios.post("/requests/createRefundRequest")
const handleClick = (courseIdent) => {

    if(!courseChosen.courseChosen){
        setCourseChosen({courseChosen:courseChosen.courseChosen,ava:true,errMsg:"Please choose a course that you want to refund"});
        return;
    }
    else{
        setCourseChosen({courseChosen:courseChosen.courseChosen,ava:false,errMsg:""});
    }

    const refundBody={
        trainee: userId,
        course: courseChosen.courseChosen
    }
    axios.post("/requests/createRefundRequest",refundBody)

}

    return(      
        <div className="relative flex items-center">
            <h1>My Courses</h1>
            <div>
            <TextField  
            variant="outlined" 
            label="Course To Refund" 
            sx={{marginBottom :"20px",width:"35%",marginLeft:"2.5%", input: { color: '#f4976c' }}}
            select 
            error={courseChosen.ava} 
            helperText={courseChosen.errMsg}
            onChange={(change)=>{setCourseChosen({courseChosen:change.target.value,ava:false,errMsg:""})}}>
            {courses && courses.map((label) =>(<MenuItem key={label} value={label.courseId}>{label.courseTitle} Price:{label.price}</MenuItem>))}
            </TextField>
            <div>
            <Button variant="contained" sx={{minWidth:"10%" ,marginBottom:"20px"}} onClick={()=>{handleClick()}}> Request Refund</Button>
            </div>

            {/* {courses && courses.map((items) => {
                    return(
                        <div key={items.id}>Course Title: {items.courseTitle} Price: {items.price} 
                        <Button variant="contained" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={()=>{handleClick(items.courseId)}} > Request Refund</Button>
                        </div>
                        
                    )})} */}
            </div>
        </div>     
    );
}
export default RequestARefund;