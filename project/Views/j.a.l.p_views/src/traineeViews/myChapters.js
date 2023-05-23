
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled, alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { color } from "d3";
import Alert from '@mui/material/Alert';
function MyChapters (){


  const {userId,courseid,userType} =useParams();
  const [traineeInfo, settraineeInfo] = useState(null);
  const [courseInfo, setCourseInfo] = useState(null);
  const [chapterTrainee, setChapterTrainee] = useState(0);
  const [courseChapters, setCourseChapters] = useState(0);
  const [chapterNumber, setchapterNumber] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [succ, setSucc] = React.useState(false);
  const [traineeChapters, setTraineeChapters] = React.useState(null);
  const navigate = useNavigate();

  // console.log(courseid);
  // console.log(userId);
  
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

    

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      setchapterNumber(panel);
    };

      useEffect(() => {
        axios
          .get("/trainee/"+userType+"/getById/"+userId)
          .then(function (response) {
          //  console.log(response);
            settraineeInfo(response);
            
            if(response.data){
              for(let i=0;i<response.data.courses.length;i++){
                      if(response.data.courses[i].CourseID==courseid){
                        setChapterTrainee(response.data.courses[i].chapters.length);
                      }
            }
      }});
      }, []);
      useEffect(() => {
        axios
          .get("/course/getCourse?courseId="+courseid)
          .then(function (response) {
            console.log(response.data.chapters)
            setTraineeChapters(response.data.chapters)
            setCourseInfo(response);

            setCourseChapters(response.data.chapters.length);
          });
      }, []);

      
      function goToChapter(){
        if(traineeChapters){
        if(traineeChapters[chapterNumber-1]){
          const title = traineeChapters[chapterNumber-1].chapterTitle;
          // console.log("yaraaaaaaaaaaaaaaaaaaaaaaaaaaaaab")
          // console.log(traineeChapters[chapterNumber-1].chapterTitle)
        axios.put('/trainee/changeProgress/'+userId+'?id2='+courseid,{
          chapterTitle : title
        }).then(function (response) {
          console.log(response)
          
        });
      }
    }
          if(traineeInfo){
            if(courseInfo){
        
          navigate('/chapterInfo?chapterNo='+chapterNumber+'?traineeId='+userId
          +'?chapters='+courseid);
            }
          }
          
      }

      function refund(){
        console.log("gowaaa");
       // navigate("/trainee/"+userId+"/refund/"+courseid);
        const refundBody={
          trainee: userId,
          course: courseid
      }
        axios.post("/requests/createRefundRequest" ,refundBody )
        setSucc(true);
      }
  
      console.log("testttt")
      console.log(chapterTrainee)
      console.log(courseChapters)

      return (
        <>
          <div>{ 
           courseInfo &&
                <div>
                  <div>
            
                  <Box sx={{ flexGrow: 1 }}>
      <h1>Your Progress so far: <h1></h1> {(chapterTrainee/courseChapters)*100}%</h1>
      {
            ((chapterTrainee/courseChapters)<0.5) &&
            <Button onClick={refund} sx={{ justifyContent:"center",marginLeft: 6,alignItems:"center"}} variant="contained">Request Refund</Button>               
          }
{
            ((chapterTrainee/courseChapters)>0.5) &&
            <Button  sx={{ justifyContent:"center",marginLeft: 6,alignItems:"center"}} variant="contained" disabled>Request Refund</Button>               
          }
      <BorderLinearProgress  variant="determinate" value={(chapterTrainee/courseChapters)*100} />
    </Box>   
          
       </div>
       {
        succ && 
        <Alert severity="success"> Refund Request has been send Successfully </Alert>
       }

                  { 
                   courseInfo.data.chapters.map((chapter) => (
        <Accordion expanded={expanded === chapter.chapterNumber} onChange={handleChange(chapter.chapterNumber)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {chapter.chapterNumber}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{chapter.chapterTitle}</Typography>
        </AccordionSummary>
     
      <div>
          <Button onClick={goToChapter} sx={{ width: '33%', flexShrink: 0 }} variant="contained">View Chapter</Button>
          </div>
        
     
      </Accordion>
      ))
      
              
}

              </div>
}
          </div> 

        </>
      );

}

export default MyChapters;
