import { Button } from "@mui/material";
import {useNavigate } from "react-router";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import "../../styling/footer.css"
function Footer({guest}) {
    const navigate=useNavigate()
    return ( 
        <div className="wrapper">
            {guest==true&&<div className="joinUs">
            <h1 className="helperText"> Try !J.A.L.P Today. </h1>
            <Button variant="contained" sx={{height:"30px"}} onClick={()=>{navigate("/signUp")}}> Join Us Now</Button>
            </div>}
            <div className="footer">
            <div className="contact">
            <div className="aboutUs">
                <h1>About !J.A.L.P</h1>
                <p>we are an online learning platform <br></br> 
                that kick started in 2022 with the aim of spreading knowledge<br></br>
                 to the edges of the globe through <br></br>
                  a quick and easy portal you can access from any where</p>
            </div>
            <div className="contactUs">
                <h1>Contact Us</h1>
                <a className="icon"href="https://www.facebook.com/"><FacebookIcon />@!J.A.L.P</a> <br></br>
                <a className="icon"href="https://www.instagram.com/"><InstagramIcon />@!J.A.L.P</a> <br></br> 
                <a className="icon"href="https://www.linkedin.com/"><LinkedInIcon />@!J.A.L.P</a> <br></br> 
                <p className="icon"><MailIcon/> dummy@mail.com</p><br></br>
            </div>
            </div>
            <div className="copyRight">
                <p>CopyRight 2022 &copy; to !J.A.L.P Organization |All Rights reserved</p>
                <a className="copyRight" onClick={()=>{navigate("/terms&condtions")}}>Terms and Condtions</a>
            </div>
            </div>
            
        </div>
     );
}

export default Footer;