import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import "../styling/myReportCard.css";
import { Alert, Button, Collapse, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";
import { set } from "mongoose";
import { useParams } from "react-router";
const ViewMyReports = ({userId}) => {   

    const[reports , setReports] = useState();
    const {userid} =useParams();

    useEffect(() => {

        axios.get("/requests/myReports/"+userid) //"63653e09c81ff58c1c877e6d"
        .then((res)=>
        {
            setReports(res.data);
            console.log(res.data);
        })
      }, []);

    return(      

   
            <div >
                <div className="reportTitle">
                <h1>My Reports</h1>
                </div>
                <Fragment> 

                {reports && reports.map((items) => {
                    return(<div className="reportOutline">
                        <div key={items.id}>{items.problem}<p/>{items.reportType}<p/>{items.status}</div>
                    </div>
                    )
                    })}  
                </Fragment>
            </div>

    );
}
export default ViewMyReports;