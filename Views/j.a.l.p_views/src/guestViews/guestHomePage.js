import axios from "axios";
import { useState,useEffect,Fragment } from "react";
import CourseDrawer from "../general/assests/courseDrawer";
import Footer from "../general/assests/footer";
import NavBarGuest from "../general/assests/navBarGuest";
import "../styling/guestHomePage.css";
function GuestHomePage() {
   const [popularCourses,setPopularCourses] = useState(null);
   const [onDiscount,setOnDiscount] = useState(null);
   useEffect(()=>{
    axios.get("/course/popularCourses").then((res)=>{
        setPopularCourses(res.data);
    }).catch((res)=>{
        console.log(res);
    });
    axios.get("/course/discountCourses").then((res)=>{
        setOnDiscount(res.data);
    }).catch((res)=>{
        console.log(res);
    });
   },[])
    return (  
        <Fragment>
            <NavBarGuest className="navBar"></NavBarGuest>
            <div className="content">
            <CourseDrawer  title="popular courses" courses={popularCourses}/>
            <CourseDrawer title="on discount" courses={onDiscount}/>
            <Footer guest={true} ></Footer>
            </div>
        </Fragment>
    );
}

export default GuestHomePage;