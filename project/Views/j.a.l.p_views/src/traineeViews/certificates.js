import React from "react";
import axios from "axios";
import { Page, Text, Image,  View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from  'file-saver';

// Create styles
 const styles = StyleSheet.create({

   });

const Certificates = () => {
    state = {
        courseName : "",
        userName : "",

    }

    handleChange = ({target : {value , name}}) => this.setState({[name] : value })

    downloadPDF = () => {
        axios.post('/create-pdf' , this.state)
    }
 
    return(
        <div className = "cert">
            <input type="text" placeholder="Course Name" name="courseName" onChange={this.handleChange}/>
            <input type="text" placeholder="User Name" name="userName" onChange={this.handleChange}/>
            <button onClick={this.downloadPDF}> Download Certificate as a PDF</button>
        </div>

 );
};

export default Certificates;
