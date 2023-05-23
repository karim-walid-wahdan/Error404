import { useState } from "react";
import "../styling/loginPage.css";
import { Button, TextField,MenuItem,InputAdornment,IconButton} from "@mui/material";
import logo from '../resources/logo.PNG';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignUp() {

    const [firstName,setFirstName]=useState({firstName:null,ava:false,errMsg:""});
    const [lastName,setLastName]=useState({lastName:null,ava:false,errMsg:""});
    const [username,setUsername]=useState({username:null,ava:false,errMsg:""});
    const [email,setEmail]=useState({email:null,ava:false,errMsg:""});
    const [country,setCountry]=useState({country:null,ava:false,errMsg:""});
    const [gender,setGender]=useState({gender:null,ava:false,errMsg:""});
    const [password,setPassword]=useState({password:null,ava:false,errMsg:""});
    const [showPassword, setShowPassword] =useState(false); 
    const [passwordRetype,setPasswordRetype]=useState({passwordRetype:null,ava:false,errMsg:""});
    const [showPasswordRetype, setShowPasswordRetype] =useState(false);
    const navigate = useNavigate();
    const genderList = [{label: 'Male',value:true},{label: 'female',value:false}];
    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", {select :"official" });
    const countryList = Object.entries(countryObj).map(([key, value]) =>{return{label: value,}});
    const matchEmail = (email) => {
        var p =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (email.match(p)) {
          return true;
        }
        return false;
      };
      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const handleClickShowPasswordRetype = () => setShowPasswordRetype((show) => !show);
      const handleClick=()=>{
        if(!firstName.firstName){
            setFirstName({firstName:firstName.firstName,ava:true,errMsg:"please provide your first name"})
            return;
        }
        else{
            setFirstName({firstName:firstName.firstName,ava:false,errMsg:""})
        }
        if(!lastName.lastName){
            setLastName({lastName:lastName.lastName,ava:true,errMsg:"please provide your last name"})
            return;
        }
        else{
            setLastName({lastName:lastName.lastName,ava:false,errMsg:""})
        }
        if(!email.email){
            setEmail({email:email.email,ava:true,errMsg:"please provide your email"})
            return;
        }
        else{
            setEmail({email:email.email,ava:false,errMsg:""})    
        }
        if(!matchEmail(email.email)){
            setEmail({email:email.email,ava:true,errMsg:"please provide a valid email format"})
            return;    
        }
        if(!username.username){
            setUsername({username:username.username,ava:true,errMsg:"please provide your userName"})
            return;
        }
        else{
            setUsername({username:username.username,ava:false,errMsg:""})
        }
        console.log(gender.gender)
        if(gender.gender===null){
            setGender({gender:gender.gender,ava:true,errMsg:"please select your gender"})
            return;
        }
        else{
            setGender({gender:gender.gender,ava:false,errMsg:""})      
        }
        if(!country.country){
            setCountry({country:country.country,ava:true,errMsg:"please provide your country"})
            return;
        }
        else{
            setCountry({country:country.country,ava:false,errMsg:""})
        }
        if(!password.password){
            setPassword({password:password.password,ava:true,errMsg:"please provide a password"})
            return;
        }
        else{
            setPassword({password:password.password,ava:false,errMsg:""})
        }
        if(!passwordRetype.passwordRetype){
            setPasswordRetype({passwordRetype:passwordRetype.passwordRetype,ava:true,errMsg:"please retype your password"})
            return;
        }
        else{
            setPasswordRetype({passwordRetype:passwordRetype.passwordRetype,ava:false,errMsg:""})    
        }
        if(passwordRetype.passwordRetype!==password.password){
            setPasswordRetype({passwordRetype:passwordRetype.passwordRetype,ava:true,errMsg:"passwords don't match please try again"})    
            return;
        }
        const user={firstName:firstName.firstName,
                    lastName:lastName.lastName,
                    username:username.username,
                    email:email.email.toLowerCase(),
                    gender:gender.gender,
                    country:country.country,
                    password:password.password}
                    console.log(user);
        axios.post("/signup",user).then((res)=>{
            sessionStorage.setItem("loginAlert",true);
        sessionStorage.setItem("alertMessage","welcome to our family pleases login with your email and password to continue :-)");navigate("/")}).catch((res)=>{setEmail({email:"",ava:"true",errMsg:res.response.data})})
        }
    return (
        <div className="parentLogin">
            <div className="welcomeMsg">
                 <img className ="logo" src={logo} alt="J.A.L.P logo"/> 
                 <h1 style={{fontSize:52}}>Welcome to !J.A.L.P</h1>
                 <p style={{fontSize:"Large",lineHeight:3}}><b>NOT</b> <b>J</b>ust <b>A</b>nother <b>L</b>earning <b>P</b>latform<br></br>Join us today to start learning alongside <br></br>thousands of other enthusiasts<br></br>at the hand of hunderds of talented <br></br>certified industry leading Instructors </p>
            </div>
            <div className="loginPrompt">
                <h1 style={{marginBottom:"20px"}}>Sign Up</h1>
                <TextField variant="outlined" label="First Name*" sx={{marginBottom :"20px",width:"42.5%",marginRight:"2.5%", input: { color: '#f4976c' }}} error={firstName.ava} helperText={firstName.errMsg} onChange={(change) => {setFirstName({firstName:change.target.value,ava:false,errMsg:""})}}></TextField>
                <TextField variant="outlined" label="Last Name*" sx={{marginBottom :"20px",width:"42.5%",marginLeft:"2.5%", input: { color: '#f4976c' }}} error={lastName.ava} helperText={lastName.errMsg} onChange={(change) => {setLastName({lastName:change.target.value,ava:false,errMsg:""})}}></TextField>
                <br/> 
                <TextField variant="outlined" label="Email*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={email.ava} helperText={email.errMsg}onChange={(change) => {setEmail({email:change.target.value,ava:false,errMsg:""})}} ></TextField>
                <br/>
                <TextField variant="outlined" label="User Name*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={username.ava} helperText={username.errMsg} onChange={(change) => {setUsername({username:change.target.value,ava:false,errMsg:""})}}></TextField>
                <br/>
                <TextField  variant="outlined" label="Gender" sx={{marginBottom :"20px",width:"42.5%",marginRight:"2.5%", input: { color: '#f4976c' }}} error={gender.ava} helperText={gender.errMsg} select onChange={(change)=>{setGender({gender:change.target.value,ava:false,errMsg:""});console.log(gender.gender)}}>{genderList.map((option)=>(<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</TextField>
                <TextField  variant="outlined" label="Country" sx={{marginBottom :"20px",width:"42.5%",marginLeft:"2.5%", input: { color: '#f4976c' }}} error={country.ava} helperText={country.errMsg} select onChange={(change)=>{setCountry({country:change.target.value,ava:false,errMsg:""})}}>{countryList.map(({label}) =>(<MenuItem key={label} value={label}>{label}</MenuItem>))}</TextField>
                <br/>  
                <TextField variant="outlined" label="Password*"sx={{marginBottom :"20px",width:"90%", input: { color: '#f4976c' }}} error={password.ava} helperText={password.errMsg}onChange={(change)=>{setPassword({password:change.target.value,ava:false,errMsg:""})}} type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={handleClickShowPassword}edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)}}></TextField>
                <br/>
                <TextField variant="outlined" label="Confirm Password*"sx={{marginBottom :"20px",width:"90%", input: { color: '#f4976c' }}} error={passwordRetype.ava} helperText={passwordRetype.errMsg} onChange={(change)=>{setPasswordRetype({passwordRetype:change.target.value,ava:false,errMsg:""})}} type={showPasswordRetype ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={handleClickShowPasswordRetype}edge="end">{showPasswordRetype ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)}}></TextField>
                <br/>
                <Button variant="contained" sx={{minWidth:"50%" ,marginBottom:"20px"}}onClick={handleClick} >sign up</Button> 
                <br/>
                <Button variant="outlined" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={()=>{navigate("/")}} >back to login</Button> 
            </div>
        </div>
    );
    } 
  export default SignUp;