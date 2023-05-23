
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import "./../styling/courseOverView.css"
import YoutubeVideo from "../general/assests/youtubeVideo";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";
function MyChapterInfo (){

    const [traineeInfo, setTraineeInfo] = useState(null);
    const [courseInfo, setCourseInfo] = useState(null);
    const [chapterObj, setChapterObj] = useState(null);
    const[text,setText]=useState('');
    const navigate = useNavigate();
  const parts = window.location.href.split("=");
  const chapterNumber = parts[1].split("?")[0];
  const traineeID = parts[2].split("?")[0];
  const courseId=window.location.href.split("?chapters=")[1];
// console.log("Chapter Number")
// console.log(chapterNumber)
// console.log("Trainee ID")
// console.log(traineeID)
// console.log("Course Id")
// console.log(courseId)
  // useEffect(() => {
  //   axios
  //     .get("/trainee/IndvidualTrainee/getById/"+traineeID)
  //     .then((response)=> {
  //       setTraineeInfo(response.data);
  //       console.log( response.data);
  //       if(response.data){
  //       for(let i=0;i<response.data.courses.length;i++){
  //         console.log("inside the loop");
  //           if(response.data.courses[i].CourseID==courseId){
  //             console.log("found ittt");
  //               setChapterObj(response.data.courses[i].chapters[chapterNumber-1])
  //               console.log(response.data.courses[i].chapters[chapterNumber-1]);
  //           }
  //       }
  //     }})
  // }, []);

  useEffect(() => {
    axios
      .get("/course/getCourse?courseId="+courseId)
      .then(function (response) {
       
        setCourseInfo(response);
        setChapterObj(response.data.chapters[chapterNumber-1]);
      });
  }, []);

// console.log("Chapter Object");
// console.log(chapterObj)

  const handleCLick = ()=>{
       const doc = new jsPDF();
       doc.text(text,10,10);
       doc.save(text.pdf);
  }

   function goToExc(){
      navigate('/exercise');
  }

      return (
        <>
          <div>
           
            { chapterObj && 
            <div>
                <YoutubeVideo  src={chapterObj.chapterTitle} height={"50"} width={"97"} marginValue ={"1.5"}title={chapterObj.chapterTitle+" Chapter Video"}/>
                <div className="courseOverView">
                    <div className="courseDescripation">
                        <h1>Instructor Notes</h1>
                        <p>{chapterObj.instructorNotes}</p>
                    </div>

                    <div className="courseDescripation">
                        <h1>My Own Notes</h1>
                        <Box sx={{width: 500,maxWidth: '100%',flexDirection:'column',flexGrow: 1,justifyContent:"center"}}>
                      
                             <TextField onChange={e => setText(e.target.value)} sx={{marginLeft: 10,justifyContent:"center"}} fullWidth label="Write your Notes" id="fullWidth" />
                            
                             <Button onClick={handleCLick} sx={{ justifyContent:"center",marginLeft: 6,alignItems:"center"}} variant="contained">Download as PDF</Button>
                             </Box>

                    </div>
                    </div>
                  
                   
                  
            </div>
}
<Button onClick={goToExc} sx={{ justifyContent:"center",marginLeft: 6,alignItems:"center"}} variant="contained">Go to exercise</Button>               
          </div> 
        </>
      );

}

export default MyChapterInfo;
