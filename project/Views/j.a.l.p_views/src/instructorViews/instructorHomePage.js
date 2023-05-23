import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CourseDrawer from '../general/assests/courseDrawer';
import Footer from "../general/assests/footer";
import NavBarInstructor from "../general/assests/navBarInstructor"; 
import "../styling/instructorHomePage.css"
function InstructorHomePage() {
    const {instructorId} = useParams();
    const [instructorCourses,setInstructorCourses]=useState([]); 
    const [allCourses,setAllCourses]=useState([]); 
    const [popularCourses,setPopularCourses] = useState(null);
    useEffect(()=>{
        axios.get("/course/getCourses").then((res)=>{
            setAllCourses(res.data);
            console.log(res.data)
        }).catch((res)=>{
            console.log(res);
        });
        axios.get("/course/popularCourses").then((res)=>{
            setPopularCourses(res.data);
        }).catch((res)=>{
            console.log(res);
        });    
        axios.get("/instructor/ViewAllCourses/"+instructorId).then((res)=>{
            if(res.data!="you are not currently teaching any courses ")
                setInstructorCourses(res.data);console.log(res.data);
            }
        ).catch((res)=>{
            console.log(res);
            
        });
    },[])
    
    return (  
        <div>
            <div className='navBar'>
            <NavBarInstructor instructorId ={instructorId}></NavBarInstructor>
            </div>
            <CourseDrawer title={"my courses"}  courses={instructorCourses} userType="instructor" userId={instructorId}/>
            <CourseDrawer title={"our popular courses"}courses={allCourses}userType="instructor"userId={instructorId}/> 
            <CourseDrawer title={"also avaliable on our platform"} courses={allCourses} userType="instructor"userId={instructorId}/>
            <Footer className ="Instructorfooter"/>
        </div>
    );
}
export default InstructorHomePage;