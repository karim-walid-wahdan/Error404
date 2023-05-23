import { Fragment, useState } from "react";
import "../styling/loginPage.css";
import { Button, TextField,MenuItem,InputAdornment,IconButton} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavBarAdmin from "../general/assests/navBarAdmin"
import Footer from "../general/assests/footer";


function AddAdmin() {


    const [username,setUsername]=useState({username:null,ava:false,errMsg:""});
    const [email,setEmail]=useState({email:null,ava:false,errMsg:""});
    const [password,setPassword]=useState({password:null,ava:false,errMsg:""});
    const [showPassword, setShowPassword] =useState(false); 
    const [passwordRetype,setPasswordRetype]=useState({passwordRetype:null,ava:false,errMsg:""});
    const [showPasswordRetype, setShowPasswordRetype] =useState(false);

    const navigate = useNavigate();
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
        if(!email.email){
            setEmail({email:email.email,ava:true,errMsg:"please provide the new admin's email"})
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
            setUsername({username:username.username,ava:true,errMsg:"please provide the new admin's user name"})
            return;
        }
        else{
            setUsername({username:username.username,ava:false,errMsg:""})
        }
        if(!password.password){
            setPassword({password:password.password,ava:true,errMsg:"please provide a password"})
            return;
        }
        else{
            setPassword({password:password.password,ava:false,errMsg:""})
        }
        if(!passwordRetype.passwordRetype){
            setPasswordRetype({passwordRetype:passwordRetype.passwordRetype,ava:true,errMsg:"please retype the password"})
            return;
        }
        else{
            setPasswordRetype({passwordRetype:passwordRetype.passwordRetype,ava:false,errMsg:""})    
        }
        if(passwordRetype.passwordRetype!==password.password){
            setPasswordRetype({passwordRetype:passwordRetype.passwordRetype,ava:true,errMsg:"passwords don't match. Please try again"})    
            return;
        }
        const user={username:username.username,
                    email:email.email.toLowerCase(),
                    password:password.password}
                    console.log(user);
        axios.post("/admin/addAdmin",user)
      }
    return (
        <Fragment>
            <NavBarAdmin className="navBar"></NavBarAdmin>

            <div className="content">
                <h1 style={{marginBottom:"20px"}}>Add Admin</h1>
                <TextField variant="outlined" label="User Name*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={username.ava} helperText={username.errMsg} onChange={(change) => {setUsername({username:change.target.value,ava:false,errMsg:""})}}></TextField>
                <br/>
                <TextField variant="outlined" label="Email*" sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}} error={email.ava} helperText={email.errMsg}onChange={(change) => {setEmail({email:change.target.value,ava:false,errMsg:""})}} ></TextField>
                <br/>
                <TextField variant="outlined" label="Password*"sx={{marginBottom :"20px",width:"90%", input: { color: '#f4976c' }}} error={password.ava} helperText={password.errMsg}onChange={(change)=>{setPassword({password:change.target.value,ava:false,errMsg:""})}} type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={handleClickShowPassword}edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)}}></TextField>
                <br/>
                <TextField variant="outlined" label="Confirm Password*"sx={{marginBottom :"20px",width:"90%", input: { color: '#f4976c' }}} error={passwordRetype.ava} helperText={passwordRetype.errMsg} onChange={(change)=>{setPasswordRetype({passwordRetype:change.target.value,ava:false,errMsg:""})}} type={showPasswordRetype ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={handleClickShowPasswordRetype}edge="end">{showPasswordRetype ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)}}></TextField>
                <br/>
                <Button variant="contained" sx={{minWidth:"50%" ,marginBottom:"20px"}}onClick={handleClick} >Create Admin</Button> 
                <br/>
                <Button variant="outlined" sx={{minWidth:"50%" ,marginBottom:"20px"}} onClick={()=>{navigate("/homePageAdmin")}} >Cancel</Button> 
              <Footer/>
            </div>
        </Fragment>
    );
    } 
  export default AddAdmin;