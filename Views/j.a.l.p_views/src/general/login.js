import { useState,useEffect } from "react";
import "../styling/loginPage.css";
import { Button,Alert,Collapse,TextField,Link,InputAdornment,IconButton} from "@mui/material";
import logo from '../resources/logo.PNG';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [resMsg, setResMsg] = useState(null);
    const [error, setError] = useState(false);
    const [resMsg2, setResMsg2] = useState(null); 
    const [error2, setError2] = useState(false);
    const [showPassword, setShowPassword] =useState(false);
    const [showAlert, setShowAlert] = useState(sessionStorage.getItem("loginAlert"));
    const [alertMessage, setAlertMessage] = useState(sessionStorage.getItem("alertMessage"));

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const matchEmail = (email) => {
        var p =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (email.match(p)) {
          return true;
        }
        return false;
      };
      const handleClick=()=>{
        console.log("hena");
        console.log(email)
        console.log(password);
        if(!email)
        {
            setResMsg("please provide an email address");
            setError(true);
        }
        else
        {
            if(!matchEmail(email))
            {
                setResMsg("please provide an email address in a valid format");
                setError(true);
            }
            else
            { 
                if(!password)
                {
                    setResMsg(null);
                    setError(false);
                    setResMsg2("please fill the password field");
                    setError2(true);   
                }
                else
                {
                    setResMsg(null);
                    setError(false);
                    axios.post("/",{"email":email,"password":password}).then((res)=>{if(res.data.response){ console.log(res);navigate(res.data.route+"/"+res.data.user._id) }else{setResMsg2("incorrect password");setError2(true)}}).catch((res)=>{setResMsg(res.response.data);setError(true)})
                }
            }}
        }
    
    return (
        <div className="parentLogin">
            <div className="welcomeMsg">
                 <img className ="logo" src={logo} alt="J.A.L.P logo"/> 
                 <h1>Welcome back to !J.A.L.P</h1>
                 <p><b>NOT</b> <b>J</b>ust <b>A</b>nother <b>L</b>earning <b>P</b>latform <br></br> where you can find thousands <br></br>of online courses  to learn/teach <br></br>essesntial skills  without limits <br></br> with industry leading Instructors<br></br>not yet one of us ? <Link underline="none" href="/signup">sign up now</Link></p>
            </div>
            <div className="loginPrompt">
                <h1>Login</h1>
                <TextField helperText={resMsg} error={error} variant="outlined" label="Email*" sx={{marginBottom :"20px",minWidth:"90%", input: { color: '#f4976c' }}} onChange={(change) => {setEmail(change.target.value)}}></TextField>
                <br/>
                <TextField  error={error2} variant="outlined" label="Password*"sx={{marginBottom :"20px",minWidth:"90%", input: { color: '#f4976c' }}} onChange={(change)=>{setPassword(change.target.value)}} type={showPassword ? 'text' : 'password'}  helperText={<div><p>{resMsg2}</p><Link underline="none" className="forgetPassword" href="/forgetPassword" >forgot password ?</Link></div> }InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={handleClickShowPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)}}></TextField>
                <br/>
                <Button variant="contained"onClick={handleClick} >login</Button>
                <Collapse in={showAlert === "true"}>
                        <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowAlert(false);
                                setAlertMessage("");    
                                sessionStorage.setItem("loginAlert",false);
                                sessionStorage.setItem("loginMessage","");
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                            {alertMessage}
                        </Alert>
                </Collapse> 
            </div>
        </div>
    );
    } 
  export default Login;