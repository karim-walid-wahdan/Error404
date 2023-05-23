import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import NavBarAdmin from "../general/assests/navBarAdmin"
import Footer from "../general/assests/footer";
import { Button, ButtonGroup, Divider } from "@mui/material";
import "../styling/adminPage.css";
import "../styling/viewRating.css";
import "../styling/guestHomePage.css";
import { Box } from "@mui/system";



const AdminHomePage = () => {   
//    const [refundRequests , setRefundRequests] = useState({requestId: null, username:null , coursename:null, courseprice:null, status : null});
    const [refundRequests , setRefundRequests] = useState(null);
    const [reports , setReports] = useState(null);
    const [requestAccess , setRequestAccess] = useState(null);

    const [dataChanged , setDataChanged] = useState(false)
    let user = [];
    let course = [];


    useEffect(() => {
        //For  Refunds
            axios.get("/requests/getAllRefundRequest")
            .then((res)=>
            { 
              setRefundRequests(res.data);
            });

        //For Reports
            axios.get("/requests/getAllReport")
            .then((res)=>
            {
              setReports(res.data);
            });

        //For Access Requests
            axios.get("/requests/getAllRequestAccess")
            .then((res)=>
            {
              setRequestAccess(res.data);
            });
        
      } , [dataChanged]);


    const handleRefundsButton = (requestedId , userRequestingID, priceRefunded, answer) =>{
      if(answer){
        axios.put("/requests/changeRefundStatus/"+requestedId , {status:"accepted" , userId : userRequestingID , refundedAmount : priceRefunded});
        setDataChanged(!dataChanged);
      }
      else{

        axios.put("/requests/changeRefundStatus/"+requestedId , {status:"rejected" , userId: userRequestingID,  refundedAmount : priceRefunded});
        setDataChanged(!dataChanged);
      }
      };

      const handleReportsButton = (reportId , answer) => {
        if(answer){
          axios.put("/requests/changeReportStatus/"+reportId , {status:"Resolved"});
          setDataChanged(!dataChanged);
        }
        else{
          axios.put("/requests/changeReportStatus/"+reportId , {status:"Seen"});
          setDataChanged(!dataChanged);
        }
      };

      const handleAccessRequestsButton = (AccessRequestId ,user,course, answer) => {
        if(answer){
          axios.put("/requests/changeAccessRequestStatus/"+ AccessRequestId , {status:"accepted" ,userId : user , courseId : course });
          setDataChanged(!dataChanged);
        }
        else{
          axios.put("/requests/changeAccessRequestStatus/"+ AccessRequestId , {status:"rejected" ,userId : user , courseId : course });
          setDataChanged(!dataChanged);
        }
      };

    return(      
            <Fragment>

            <NavBarAdmin className="navBar"></NavBarAdmin>
              <div className="content">

                {/* START OF REFUNDS SECTION */}
                <div className="itemTitle" >
                    <h1>Refund Requests</h1>
                    <Fragment>
                      <Divider />
                      { refundRequests && refundRequests.map((items) => {
                            return(
                              <div className="singleRefundRequest" key={items.requestID}>
                              <Box sx={{ bgcolor: '#eeeeee', boxShadow: 1, borderRadius: 2, p: 2}}>
                                <h3 className="ratingP">User: {items.username}</h3>
                                <Divider/>
                                <div className="ratingReviewBody">
                                  <h4>Course: {items.coursename}</h4>
                                </div>
                                <h4 className="ratingP">Price: {items.price}</h4>
                                <div>
                               <p> <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons" sx={{mx : 55}}>
                               <Button sx={{bgcolor: '#00ee00' }} onClick={() => handleRefundsButton(items.requestID ,items.userID, items.price, true)}>Accept</Button>
                                <Button sx={{bgcolor: '#ee0000' }} onClick={() => handleRefundsButton(items.requestID ,items.userID, items.price, false)}>Reject</Button>

                              </ButtonGroup></p>
                              </div>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              </Box>
                            </div>
                            
                          );

                        })}
                    </Fragment>
                    </div> 

                    {/* START OF REPORTS SECTION */}
                  <div className="itemTitle" >
                    <h1>Reports</h1>
                    <Fragment>
                      <Divider />
                      { reports && reports.map((items) => {
                            return(
                              <div className="singleRefundRequest" key={items.reportId}>
                              <Box sx={{ bgcolor: '#eeeeee', boxShadow: 1, borderRadius: 2, p: 2}}>
                                <h3 className="ratingP">Report Type: {items.reportType  }</h3>
                                <Divider/>
                                <div className="ratingReviewBody">
                                  <h4>Problem: {items.problem}</h4>
                                </div>
                                <h4 className="ratingP">Client's Username: {items.username}</h4>
                                <h4 className="ratingP">Client is an: {items.userType}</h4>
                                <div>
                               <p> <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons" sx={{mx : 55}}>
                               <h4 className="ratingP">Status:{items.status}</h4>  
                               <Button sx={{bgcolor: '#00ee00' }} onClick={() => handleReportsButton(items.reportId , false)}>Seen</Button>
                                <Button sx={{bgcolor: '#ee0000' }} onClick={() => handleReportsButton(items.reportId , true)}>Resolved</Button>

                              </ButtonGroup></p>
                              </div>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              </Box>
                            </div>
                            
                          );

                        })}
                    </Fragment>
                    </div> 

                    {/* START OF ACCESS REQUESTS SECTION */}
                  <div className="itemTitle" >
                    <h1>Access Requests</h1>
                    <Fragment>
                      <Divider />
                      { requestAccess && requestAccess.map((items) => {
                            return(
                              <div className="singleRefundRequest" key={items.accRequestID}>
                              <Box sx={{ bgcolor: '#eeeeee', boxShadow: 1, borderRadius: 2, p: 2}}>
                                <h3 className="ratingP">Username requesting access: {items.username}</h3>
                                <Divider/>
                                <div className="ratingReviewBody">
                                  <h4>Course: {items.coursename}</h4>
                                </div>
                                <h4 className="ratingP">User's corporate: {items.corporate}</h4>
                                <div>
                               <p> <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons" sx={{mx : 55}}>
                               <Button sx={{bgcolor: '#00ee00' }} onClick={() => handleAccessRequestsButton(items.accRequestID ,items.userID, items.courseID, true)}>Accept</Button>
                                <Button sx={{bgcolor: '#ee0000' }} onClick={() => handleAccessRequestsButton(items.accRequestID ,items.userID, items.courseID, false)}>Reject</Button>
                              </ButtonGroup></p>
                              </div>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              </Box>
                            </div>
                            
                          );

                        })}
                    </Fragment>
                  </div> 

            <Footer></Footer>
          </div>
        </Fragment> 

    );
}
export default AdminHomePage;