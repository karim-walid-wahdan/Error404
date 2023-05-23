import {useState} from "react";
import "../styling/loginPage.css";
import {Button,TextField,Link} from "@mui/material";
import logo from '../resources/logo.PNG';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
    const [email,setEmail]=useState("");
    const [resMsg, setResMsg] = useState("");
    const [error, setError] = useState(false);
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
                setResMsg(null);
                setError(false);
                console.log(email.toLowerCase());
                axios.post("/forgetPassword",{"email":email.toLowerCase()}).then((res)=>{sessionStorage.setItem("loginAlert",true);
                sessionStorage.setItem("alertMessage","A recovery password was sent to your e-mail inbox");navigate("/")}).catch((res)=>{console.log(res);setResMsg(res.response.data);setError(true);}) 
            }
        }
    }
    return (
        <div className="parentLogin">
            <div className="welcomeMsg">
                 <img className ="logo" src={logo} alt="J.A.L.P logo"/> 
                 <h1>Welcome back to !J.A.L.P</h1>
                 <p>Please provide your registered email address to recover your password<br></br>are you Lost?<Link underline="none" href="/"> back to Login</Link></p>
            </div>
            <div className="loginPrompt">
                <h1>Forgot password</h1>
                <TextField error={error} helperText={resMsg}variant="outlined" label="Email*" sx={{marginBottom :"20px", width:"90%",input: { color: '#f4976c' }}} onChange={(change) => {setEmail(change.target.value)}}></TextField>
                <br/>
                <Button variant="contained" onClick={handleClick}>forget Password</Button>
            </div>
        </div>
    );
  }
  export default ForgetPassword;