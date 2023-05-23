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
function CorporateTraineeProfile (){
    const [traineeInfo, settraineeInfo] = useState(null);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [password, setPassword] = useState(null);
    const [country, setCountry] = useState(null);

      //countries
      countries.registerLocale(enLocale);
      const countryObj = countries.getNames("en", {select :"official" });
      const countryList = Object.entries(countryObj).map(([key, value]) =>{return{label: value,}});

    useEffect(() => {
        axios
          .get("/trainee/CorpoarateTrainee/getById/63653ab7c865db9781a7383b")
          .then(function (response) {
            console.log(response);
            settraineeInfo(response);
          });
      }, []);


      function changePassword(){
        console.log("Mlaaaaaaaaaaaaaaaaaaaaaaak");
        axios.put("/trainee/CorpoarateTrainee/changePassword/63653ab7c865db9781a7383b",{
         password:password
        }).then((res)=>{
         axios
         .get("/trainee/CorpoarateTrainee/getById/63653ab7c865db9781a7383b")
         .then(function (response) {
           console.log(response);
           settraineeInfo(response);
           changeFlag();
         });})
         
    }

    function changeCountry(){
     console.log(country);
     axios.put("/trainee/CorporateTrainee/setCountry/63653ab7c865db9781a7383b",{
         country:country
       }).then((res)=>{
         axios
         .get("/trainee/CorpoarateTrainee/getById/63653ab7c865db9781a7383b")
         .then(function (response) {
           console.log(response);
           settraineeInfo(response);
           changeFlag2();
         });})
        }
    
     function changeFlag(){
        setFlag(!flag);
     }
     function changeFlag2(){
        setFlag2(!flag2);
     }
      return (
        <>
          <div>{
            traineeInfo &&
          <Stack spacing={1}>

      {/* For other variants, adjust the size with `width` and `height` */}
      <Avatar sx={{ bgcolor: deepPurple[500] , width:80 , height:80}}>N</Avatar>
      <List>
          <ListItem disablePadding>
              <ListItemText primary="Name: "  />
              <ListItemText primary={traineeInfo.data.firstName}  />
              <ListItemText primary={traineeInfo.data.lastName}  />
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary="Email: "  />
              <ListItemText primary={traineeInfo.data.email}  />
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary="My Country: "  />
              <ListItemText primary={traineeInfo.data.country}  />
              <Button variant="contained" sx={{ bgcolor: deepPurple[500]}} >{flag2?<SaveIcon onClick={changeCountry}></SaveIcon>:<EditIcon onClick={changeFlag2}></EditIcon>}</Button>
          </ListItem>
          { flag2 && 
            
            <ListItem disablePadding>
            <ListItemText primary="New Country : "  />
            {/* <TextField id="standard-basic" label="Type your Country here" variant="standard" onChange={(change)=>{setCountry(change.target.value)}}/> */}
            <TextField  variant="outlined" label="Country" sx={{marginBottom :"20px",width:"42.5%",marginLeft:"2.5%", input: { color: '#f4976c' }}}  select onChange={(change)=>{setCountry(change.target.value)}}>{countryList.map(({label}) =>(<MenuItem key={label} value={label}>{label}</MenuItem>))}</TextField>
            </ListItem>
            }

          <ListItem disablePadding>
              <ListItemText primary="User Name: "  />
              <ListItemText primary={traineeInfo.data.username}  />
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary="Password : "  />
              <ListItemText primary={traineeInfo.data.password}  />
              <Button variant="contained" sx={{ bgcolor: deepPurple[500]}} >{flag?<SaveIcon onClick={changePassword} /> :<EditIcon onClick={changeFlag}/>}</Button>
          </ListItem>
          
         { flag && 
            
        <ListItem disablePadding>
        <ListItemText primary="New Password : "  />
        <TextField id="standard-basic" label="type Password here" variant="standard" onChange={(change)=>{setPassword(change.target.value)}}/>
        </ListItem>
            
         
        }
      

        </List>
    </Stack>
}
          </div>
        </>
      );

}

export default CorporateTraineeProfile ;
