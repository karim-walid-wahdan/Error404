import { useParams } from "react-router";
import { useState ,useEffect} from "react";
import "../styling/addCourse.css";
import {Collapse, Alert,Checkbox,Button, TextField,MenuItem,InputAdornment,IconButton, unstable_composeClasses} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import logo from '../resources/logo.PNG';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadCourseDescription from "./uploadCourseDescription";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { height } from "@mui/system";
import AddExercise from "./addExercise";
import { set } from "mongoose";

function AddCourse() {
    const {instructorId} =useParams();
    const [instructorName,setInstructorName]=useState("");
    const [courseTitle,setCourseTitle]=useState({value:"",ava:false,errMsg:""});
    const [price,setPrice]=useState({value:0,ava:false,errMsg:""});
    const [numberOfHours,setNumberOfHours]=useState({value:0,ava:false,errMsg:""});
    const [subject,setSubject]=useState({value:"",ava:false,errMsg:""});
    const [discount,setDiscount]=useState({value:0,ava:false,errMsg:""});
    const [agreed, setAgreed] =useState(false);
    const [step ,setStep]=useState(1);
    const [chapterTitle,setChapterTitle]=useState({value:"",ava:false,errMsg:""});
    const [courseDescription,setCourseDescription]=useState({value:"",ava:false,errMsg:""});
    const [src,setSrc]=useState({value:"",ava:false,errMsg:""});
    const [chapterNumber,setChapterNumber]=useState({value:"",ava:false,errMsg:""});
    const [chapterVideo,setChapterVideo]=useState({value:"",ava:false,errMsg:""});
    const [instructorNotes,setInstructorNotes]=useState({value:"",ava:false,errMsg:""});
    const [totalHours,setTotalHours]=useState({value:"",ava:false,errMsg:""});
    const [exercises,setExercises]=useState({value:[],ava:false,errMsg:""});
    const [chapterAssesment,setChapterAssesment]=useState({value:[],ava:false,errMsg:""});
    const [chapters,setChapters]=useState([]);
    const navigate = useNavigate();
    const subjectList = [{label: 'Maths',value:"Maths"},{label: 'Tech',value:"Tech"},{label: 'Science',value:"Science"}];
    useEffect(()=>{
        axios.get("/instructor/getInstructor/"+instructorId).then((res)=>{
            setInstructorName(res.data.firstName+res.data.lastName);
        })
    },[]);
    const matchYoutubeUrl = (url) => {
        var p =
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
          return true;
        }
        return false;
      };  
      const handleAddCourseOverView=()=>{
        if(courseTitle.value===""){
            setCourseTitle({value:courseTitle.value,ava:true,errMsg:"this field is required"})
            setStep(1);
            return;
        }
        if(!Number.isInteger(parseInt(numberOfHours.value))) {
            setNumberOfHours({value:0,ava:true,errMsg:"this field must be an intger"})
            setStep(1);
            return;
        }
        if(numberOfHours.value===0){
            setNumberOfHours({value:0,ava:true,errMsg:"this field is required"})
            setStep(1);
            return;
        }
        if(!Number.isInteger(parseInt(price.value))) {
            setPrice({value:0,ava:true,errMsg:"this field must be an intger"})
            setStep(1);
            return;
        }
        if(price.value===0){
            setPrice({value:0,ava:true,errMsg:"this field is required"})
            setStep(1);
            return;
        }
        if(parseFloat(discount.value)>1||parseFloat(discount.value)<0) {
            setDiscount({value:0,ava:true,errMsg:"this field must be an between 0 and 1"})
            setStep(1);
            return;
        }
        if(subject.value===""){
            setSubject({value:null,ava:true,errMsg:"this field is required"})
            setStep(1);
            return;
        }
        setStep(2);
    } 
    const handleAddCourseDescription = (courseDescription, src) => {
        setCourseDescription({value:courseDescription,ava:false,errMsg:""});
        if(src.length!==0){
            setSrc({value:src,ava:false,errMsg:""});
            setStep(3);
        }
        else{
            setSrc({value:src.value,ava:false,errMsg:"please provide a youtube url "});
            setStep(2);
        }
      };  
      const saveChapterURl = (change) => {
        if (!change.target.value) {
            setChapterVideo({value:chapterVideo.value,ava:true,errMsg:"please provide a youtube url for this chapter"})
        } 
        else {
          if (matchYoutubeUrl(change.target.value)) {
            setChapterVideo({value:change.target.value.split("v=")[1].substring(0, 11),ava:true,errMsg:""})
          } else {
            setChapterVideo({value:chapterVideo.value,ava:true,errMsg:"please provide a valid youtube video url"})
          }
        }
      }; 
    const handleClickAddExcersie = async (exercise) => {
        
        setExercises({value:exercises.value.concat(exercise),ava:false,errMsg:""});
    };
    const handleAddChapter=()=>{
        if(!chapterTitle.value){
            setChapterTitle({value:chapterTitle.value,ava:true,errMsg:"please provide your the chapter Title"})
            setStep(3);
            return;
        }
        if(!chapterVideo.value){
            setChapterVideo({value:chapterVideo.value,ava:true,errMsg:"please provide your the chapter video"})
            setStep(3);
            return;
        }
        if(!Number.isInteger(parseInt(price.value))) {
            setTotalHours({value:0,ava:true,errMsg:"this field must be an intger"})
            setStep(3);
            return;
        }
        if(!totalHours.value){
            setTotalHours({value:totalHours.value,ava:true,errMsg:"please provide your the chapter total number of hours"});
            setStep(3);
            return;
        }
        if(exercises.value.length<3){
            setExercises({value:exercises.value,ava:true,errMsg:"please provide at least three questions per chapter"});
            setStep(4);
            return;
        }
        console.log(exercises.value);
    
        setChapters(chapters.concat({chapterTitle:chapterTitle.value,chapterNumber:chapters.length+1,chapterVideo:chapterVideo.value,instructorNotes:instructorNotes.value,totalHours:parseInt(totalHours.value),exercise:exercises.value}));
        setExercises({value:[],ava:false,errMsg:""})
        setStep(3);
    }
    const handleClickAddCourseExcersie = (exercise) => {
        setChapterAssesment({value:chapterAssesment.value.concat(exercise),ava:false,errMsg:""});
    }; 
    const handleAddCourse=()=>{
        if(chapterAssesment.value.length<3){
            setChapterAssesment({value:chapterAssesment.value,ava:true,errMsg:"please provide at least three questions per course"});
            setStep(5);
            return;
        }
       
        axios.post("/instructor/AddCourse/"+instructorId,{courseTitle:courseTitle.value,
                                                        courseDescription:courseDescription.value,
                                                        courseDescriptionVideo:src.value,
                                                        price:parseInt(price.value),
                                                        numberOfHours:parseInt(numberOfHours.value),
                                                        courseSubject:subject.value,
                                                        discount:{avalbiale:discount.value!=0?true:false,percentage :parseFloat(discount.value)},
                                                        enrolledTrainees:0,
                                                        reviews:[],
                                                        chapters:chapters,
                                                        chapterAssesment:chapterAssesment}).then((res)=>{navigate("/instructor/"+instructorId)}).catch((res)=>{setChapterAssesment({value:chapterAssesment.value,errMsg:res.response.data,ava:true})})
    }

    return (
        <div className="parentLogin">
            <div className="welcomeMsg">
                 <img className ="logo" onClick={()=>{navigate("/instructor/"+instructorId)}} src={logo} alt="J.A.L.P logo"/> 
                 <h1 style={{fontSize:52}}>Help !J.A.L.P grow even more</h1>
                 <p style={{fontSize:"Large",lineHeight:3}}><b>NOT</b> <b>J</b>ust <b>A</b>nother <b>L</b>earning <b>P</b>latform<br></br>thank you {instructorName}<br></br> for helping !J.A.L.P grow even more <br></br>please fill all the provided fields <br></br>  to add your new course to our courses catalogue     </p>
            </div>
            {(step===1) &&<div className="loginPrompt">
                <p>general info</p>
                <h1 style={{marginBottom:"20px"}}>Course Details (1)</h1>
                <TextField variant="outlined" label="Course Title*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={courseTitle.ava} helperText={courseTitle.errMsg}onChange={(change) => {setCourseTitle({value:change.target.value,ava:false,errMsg:""})}} ></TextField>
                <br/>
                <TextField variant="outlined" label="number of hours*" sx={{marginBottom :"20px",width:"42.5%",marginRight:"2.5%", input: { color: '#f4976c' }}} error={numberOfHours.ava} helperText={numberOfHours.errMsg} onChange={(change) => {setNumberOfHours({value:change.target.value,ava:false,errMsg:""})}}></TextField>
                <TextField variant="outlined" label="Price*" sx={{marginBottom :"20px",width:"42.5%",marginLeft:"2.5%", input: { color: '#f4976c' }}} error={price.ava} helperText={price.errMsg} onChange={(change) => {setPrice({value:change.target.value,ava:false,errMsg:""})}}></TextField>
                <br/>
                <TextField  variant="outlined" label="Subject*" sx={{marginBottom :"20px",width:"90%", input: { color: '#f4976c' }}} error={subject.ava} helperText={subject.errMsg} select onChange={(change)=>{setSubject({value:change.target.value,ava:false,errMsg:""})}}>{subjectList.map(({label}) =>(<MenuItem key={label} value={label}>{label}</MenuItem>))}</TextField>
                <br/>  
                <TextField variant="outlined" label="discount" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={discount.ava} helperText={discount.errMsg!==""?discount.errMsg:"e.g:25%"}  onChange={(change) => {setDiscount({value:change.target.value,ava:false,errMsg:""})}} InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}></TextField>
                <br/>
                <Checkbox checked={agreed}onChange={(event)=>{setAgreed(event.target.checked);}}/>i agree to the <a href="termsAndCondtions">terms and condtions</a>of the !J.A.L.P organization 
                <br/>
                <Button disabled ={!agreed}variant="contained" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={handleAddCourseOverView} >next</Button> 
                <br/>
            </div>}



            { (step===2) &&<div className="loginPrompt">
            <div className="sectionHeader"> <IconButton onClick={()=>{setStep(1)}}><ArrowBackIcon/> </IconButton></div>
            <h1 style={{marginBottom:"20px"}}>Course Details(2)</h1>
                <p>course description</p>
                    <UploadCourseDescription handleClick={handleAddCourseDescription}></UploadCourseDescription>
            </div>}  


            { (step===3) &&<div className="loginPrompt">
            <div className="sectionHeader"> <IconButton onClick={()=>{setStep(2)}}><ArrowBackIcon/> </IconButton></div>
            <h1 style={{marginBottom:"20px"}}>Course Details(3)</h1>
            <p>Chapters</p>
            <TextField variant="outlined" label="Chapter Title*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={chapterTitle.ava} helperText={chapterTitle.errMsg}onChange={(change) => {setChapterTitle({value:change.target.value,ava:false,errMsg:""})}} ></TextField>
            <TextField variant="outlined" label="Chapter Video*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={chapterVideo.ava} helperText={chapterVideo.errMsg}onChange={(change)=>{saveChapterURl(change)}} ></TextField>
            <TextField variant="outlined" label="Chapter Notes*" sx={{marginBottom :"20px",width:"90%",input: { color: '#f4976c' }}} error={instructorNotes.ava} helperText={instructorNotes.errMsg}onChange={(change) => {setInstructorNotes({value:change.target.value,ava:false,errMsg:""})}}></TextField>
            <TextField variant="outlined" label="Chapter Total Hours*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={totalHours.ava} helperText={totalHours.errMsg}onChange={(change) => {setTotalHours({value:change.target.value,ava:false,errMsg:""})}} ></TextField>
            <Button disabled ={!agreed}variant="contained" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={()=>{setStep(4)}} >add Chapter Exercise</Button>     
            <br/> 
            </div>}    



            { (step===4) &&<div className="loginPrompt">
            <div className="sectionHeader"> <IconButton onClick={()=>{setStep(3)}}><ArrowBackIcon/></IconButton></div>
            <h1 style={{marginBottom:"20px"}}>Course Details(4)</h1>
            <p>Chapters</p>
            <AddExercise handleClick={handleClickAddExcersie}></AddExercise>
            <Button disabled ={!agreed}variant="outlined" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={handleAddChapter}>add another chapter</Button> 
            <br></br> 
            <Button disabled ={!agreed}variant="outlined" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={()=>{handleClickAddExcersie();setStep(5)}} >next</Button> 
            <Collapse in={exercises.ava}>
                        <Alert severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setExercises({value:exercises.value,ava:false,errMsg:""})
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                            {exercises.errMsg}
                        </Alert>
                </Collapse> 
            </div>
            }
            { (step===5) &&<div className="loginPrompt">
            <div className="sectionHeader"> <IconButton onClick={()=>{setStep(2)}}><ArrowBackIcon/> </IconButton></div>
            <h1 style={{marginBottom:"20px"}}>Course Details(5)</h1>
            <p>course assesment</p>
            <AddExercise handleClick={handleClickAddCourseExcersie}></AddExercise>
            <Button disabled ={!agreed}variant="outlined" sx={{minWidth:"25%" ,marginBottom:"20px"}} onClick={handleAddCourse}>add Course to !J.A.L.P</Button> 
            <br></br>
            <Collapse in={chapterAssesment.ava}>
                        <Alert severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setChapterAssesment({value:exercises.value,ava:false,errMsg:""})
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                            {chapterAssesment.errMsg}
                        </Alert>
                </Collapse>
            </div>}
            

        </div>
    );
}

export default AddCourse;