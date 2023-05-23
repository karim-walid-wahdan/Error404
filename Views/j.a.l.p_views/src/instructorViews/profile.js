import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { deepOrange, deepPurple } from '@mui/material/colors';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Button, TextField,MenuItem} from "@mui/material";
import { useParams } from "react-router";
import NavBarInstructor from "../general/assests/navBarInstructor"; 
import "../styling/instructorHomePage.css"
import ViewRating from "./viewRating";
function Profile (){
    const {instructorId} = useParams();
    const [instructorInfo, setInstructorInfo] = useState(null);
    const [amountOwed, setamountOwed] = useState(null);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(false);
    const [flag4, setFlag4] = useState(false);
    const [password, setPassword] = useState(null);
    const [country, setCountry] = useState(null);
    const [email, setEmail] = useState(null);
    const [biography, setBiography] = useState(null);
    //countries
    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", {select :"official" });
    const countryList = Object.entries(countryObj).map(([key, value]) =>{return{label: value,}});

    useEffect(() => {
        axios
          .get("/instructor/getInst/"+instructorId)
          .then(function (response) {
            console.log(response);
            setInstructorInfo(response);
          });
      }, []);


      useEffect(() => {
        axios
          .get("/instructor/amountOwed/"+instructorId)
          .then(function (response) {
            console.log(response);
            setamountOwed(response);
          });
      }, []);

     function changeFlag(){
        setFlag(!flag);
     }


      useEffect(() => {
        axios
          .get("/instructor/amountOwed/"+instructorId)
          .then(function (response) {
            console.log(response);
            setamountOwed(response);
          });
      }, []);

     function changePassword(){
         console.log("Mlaaaaaaaaaaaaaaaaaaaaaaak");
         axios.put("/instructor/changePassword/"+instructorId,{
          password:password
         }).then((res)=>{
          axios
           .get("/instructor/getInst/"+instructorId)
           .then(function (response) {
             setInstructorInfo(response);
             changeFlag();
           });})
     }
     function changeCountry(){
      console.log(country);
      axios.put("/instructor/setCountry/"+instructorId,{
          country:country
        }).then((res)=>{
         axios
          .get("/instructor/getInst/"+instructorId)
          .then(function (response) {
            setInstructorInfo(response);
            changeFlag2();
          });})
          
   }

   function changeBiography(){
    console.log(country);
    axios.put("/instructor/setCountry/"+instructorId,{
      biography:biography
      }).then((res)=>{
       axios
        .get("/instructor/getInst/"+instructorId)
        .then(function (response) {
          setInstructorInfo(response);
          changeFlag4();
        });})
        
 }
   function changeEmail(){
    console.log(country);
    axios.put("/instructor/setCountry/"+instructorId,{
        email:email
      }).then((res)=>{
       axios
        .get("/instructor/getInst/"+instructorId)
        .then(function (response) {
          setInstructorInfo(response);
          changeFlag3();
        });})
   }

   function changeFlag2(){
    setFlag2(!flag2);
 }
     function changeFlag(){
        setFlag(!flag);
     }
     function changeFlag3(){
      setFlag3(!flag3);
   }
   function changeFlag4(){
    setFlag4(!flag4);
 }

      return (
        <>
          <div>{
            instructorInfo &&
            
          <Stack spacing={1}>
             <div className='navBar'><NavBarInstructor instructorId ={instructorId}></NavBarInstructor></div>
          
      {/* For other variants, adjust the size with `width` and `height` */}
      <List>
          <ListItem disablePadding>
              <ListItemText primary="Name: "  />
              <ListItemText primary={instructorInfo.data.firstName}  />
              <ListItemText primary={instructorInfo.data.lastName}  />
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary="Email: "  />
              <ListItemText primary={instructorInfo.data.email}  />
              <Button variant="contained" sx={{ bgcolor: deepPurple[500]}} >{flag3?<SaveIcon onClick={changeEmail}></SaveIcon>:<EditIcon onClick={changeFlag3}></EditIcon>}</Button>
              </ListItem>
              { flag3 && 
            
            <ListItem disablePadding>
            <ListItemText primary="New Email : "  />
            <TextField id="standard-basic" label="type The new Email here" variant="standard" onChange={(change)=>{setEmail(change.target.value)}}/>
            </ListItem>
                
             
            }

         
         
          <ListItem disablePadding>
              <ListItemText primary="My Country: "  />
              <ListItemText primary={instructorInfo.data.country}  />
            <Button variant="contained" sx={{ bgcolor: deepPurple[500]}} >{flag2?<SaveIcon onClick={changeCountry}></SaveIcon>:<EditIcon onClick={changeFlag2}></EditIcon>}</Button>
          </ListItem>
          { flag2 && 
            
            <ListItem disablePadding>
            <ListItemText primary="New Country : "  />
            {/* <TextField id="standard-basic" label="Type your Country here" variant="standard" onChange={(change)=>{setCountry(change.target.value)}}/> */}
            <TextField  variant="outlined" label="Country" sx={{marginBottom :"20px",width:"42.5%",marginLeft:"2.5%", input: { color: '#f4976c' }}}  select onChange={(change)=>{setCountry(change.target.value)}}>{countryList.map(({label}) =>(<MenuItem key={label} value={label}>{label}</MenuItem>))}</TextField>
            </ListItem>
            }
          {
            amountOwed &&
            <ListItem disablePadding>
              <ListItemText primary="Amount Owed By me : "  />
              <ListItemText primary={amountOwed.data}  />
          </ListItem>
}

          <ListItem disablePadding>
              <ListItemText primary="My Biography : "  />
              <ListItemText primary={instructorInfo.data.biography}  />
              <Button variant="contained" sx={{ bgcolor: deepPurple[500]}} >{flag4?<SaveIcon onClick={changeBiography}></SaveIcon>:<EditIcon onClick={changeFlag4}></EditIcon>}</Button>
              </ListItem>
              { flag4 && 
            
            <ListItem disablePadding>
            <ListItemText primary="Edited Biography : "  />
            <TextField id="standard-basic" label="type The new Brography here" variant="standard" onChange={(change)=>{setBiography(change.target.value)}}/>
            </ListItem>
            }

          <ListItem disablePadding>
              <ListItemText primary="User Name: "  />
              <ListItemText primary={instructorInfo.data.username}  />

          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary="Password : "  />
              <ListItemText primary={instructorInfo.data.password}  />

              <Button variant="contained" sx={{ bgcolor: deepPurple[500]}} >{flag?<SaveIcon onClick={changePassword} /> :<EditIcon onClick={changeFlag}/>}</Button>
          </ListItem>
          

         { flag && 
            
        <ListItem disablePadding>
        <ListItemText primary="New Password : "  />

        <TextField id="standard-basic" label="type Password here" variant="standard" />

        <TextField id="standard-basic" label="type Password here" variant="standard" onChange={(change)=>{setPassword(change.target.value)}}/>
        </ListItem>
        }
      

        </List>
    </Stack>
    }
    <ViewRating instructorId={instructorId}></ViewRating>
    </div>
        </>
      )
  }
  export default Profile;