import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styling/courseCard.css";
import { Alert, Button, Collapse, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";
import { set } from "mongoose";
import { useParams } from "react-router";
  


const ReportAProblem = () => {   
  //{client , clientType} put in bracket of reportaproblem above
    const[showAlert, setShowAlert] = useState(false);
    const {userId,userType} =useParams();

    const[problem , setProblem] = useState({problem:null,ava:false,errMsg:""});
    const[problemType , setProblemType] = useState({problemType:null,ava:false,errMsg:""});
    const[client , setClient] = useState();
    const[clientType , setClientType] = useState();



    const handleClick = () => {
        if(!problem.problem){
            setProblem({problem:problem.problem,ava:true,errMsg:"please write your problem here"});
            return;
        }
        else{
            setProblem({problem:problem.problem,ava:false,errMsg:""});
        }

        if(!problemType.problemType){
            setProblemType({problemType:problemType.problemType,ava:true,errMsg:"please select type of  report"});
            return;
        }
        else{
            setProblemType({problemType:problemType.problemType,ava:false,errMsg:""});
        }


        const looksLikeYouAreGoingToTheShadowRealmJimbo = {
            problem:problem.problem,
            client:userId,
            clientType:userType,
            reportType:problemType.problemType,
        }
        console.log(looksLikeYouAreGoingToTheShadowRealmJimbo);

        axios.post("/requests/createReport" , looksLikeYouAreGoingToTheShadowRealmJimbo)
        .then(() => {setShowAlert(true)})
    }

    return(      
        <div className="cardOutline">
            <h1>What's the matter?</h1>
        <div className="relative flex items-center">
        <TextField id="outlined-select"
          select
          label="Problem Type"
          defaultValue="-"
          SelectProps={{
            native: true,
          }}
          sx={{marginBottom :"20px",width:"50%"}}
          error={problemType.ava} 
          helperText={problemType.errMsg} 
          onChange={(change) => {setProblemType({problemType:change.target.value,ava:false,errMsg:""})}}
        >
            <option>{null}</option>
            <option>Technical</option>
            <option>Financial</option>
            <option>Other</option>
        </TextField>
        <p></p>
            <TextField id="outlined-multiline-flexible" 
            label="Write your problem here" 
            multiline 
            rows = {7}
            sx={{marginBottom :"20px",width:"90%"}}
            error={problem.ava} 
            helperText={problem.errMsg} 
            onChange={(change) => {setProblem({problem:change.target.value,ava:false,errMsg:""})}}
            />
        <p></p>
        <Button variant="contained" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={handleClick} > Submit Report</Button> 
        
        <Collapse in={showAlert}>
        <Alert
          action={
            <IconButton
            aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
        Submit Successful
        </Alert>
        </Collapse>

        </div> 

        </div>    
    );
}
export default ReportAProblem;