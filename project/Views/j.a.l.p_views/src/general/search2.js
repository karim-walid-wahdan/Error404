import axios from "axios";
import { useState,useEffect,Fragment } from "react";
import CourseDrawer from "../general/assests/courseDrawer";
import Footer from "../general/assests/footer";
import "../styling/guestHomePage.css";
import NavBarTrainee from "./assests/navBarTrainee";

function Search2() {


    let searchResult=sessionStorage.getItem("searchrResult2")
 
     
 
 
     return (  
         <Fragment>
             <NavBarTrainee className="navBar"></NavBarTrainee>
             <div className="content">
                 {(searchResult.split(",").length!=0) && (searchResult.split(",")[0]!="") &&<CourseDrawer  title="Search Results" courses={searchResult.split(",")}/>}
                 {(searchResult.split(",").length!=0) && (searchResult.split(",")[0]=="") &&<CourseDrawer  title="Search Results" />}
             <Footer guest={true} ></Footer>
             </div>
         </Fragment>
     );
}

export default Search2;