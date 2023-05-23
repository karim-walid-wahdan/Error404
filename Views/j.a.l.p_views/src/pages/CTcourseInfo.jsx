import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CTcourseInfo() {
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    axios
      .get(
        "/trainee/CorporateTrainee/viewCourseInfo/639146aede71ce0ca5a1a09d?id1=639114e227ba150662d88096"
      )
      .then(function (response) {
        console.log(response);
        setCourseInfo(response);
      });
  }, []);

  console.log(courseInfo);

  return (
    <>
      <div>
        {courseInfo && (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Your Course Details
              </ListSubheader>
            }
          >
            <ListItemText primary="Course Title: " />

            <p>{courseInfo.data.courseTitle}</p>

            <ListItemText primary="Course Description: " />

            <p>{courseInfo.data.courseDescripation}</p>

            <ListItemText primary="Course Description Video Linkn is here : " />

            <p>{courseInfo.data.courseDescripationVideo}</p>
            <ListItemText primary="Course Price : " />

            <p>{courseInfo.data.price}</p>

            <ListItemText primary="Number of Hours : " />

            <p>{courseInfo.data.numberOfHours}</p>
            <ListItemText primary="Contract : " />

            <p>{courseInfo.data.contract}</p>

            <ListItemText primary="certifcate Form : " />

            <p>{courseInfo.data.cerificateForm}</p>

            <ListItemText primary="CourseSubjeect : " />

            <p>{courseInfo.data.courseSubject}</p>

            <ListItemText primary="Discount : " />

            <p>{courseInfo.data.discount.percentage}</p>

            <p> Trainee Reviews about the course is in the below table</p>

            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Review</TableCell>
                      <TableCell align="right">Rating</TableCell>
                      <TableCell align="right">Reviewed By</TableCell>
                      <TableCell align="right">Trainee Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courseInfo.data.reviews.map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{row.review}</TableCell>
                        <TableCell align="right">{row.rating}</TableCell>
                        <TableCell align="right">{row.reviewedBy}</TableCell>
                        <TableCell align="right">{row.traineeType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <p> Course Chapters</p>

            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Chapter Title</TableCell>
                      <TableCell align="right">chapter Video</TableCell>
                      <TableCell align="right">Instructor Notes</TableCell>
                      <TableCell align="right">Total Hours</TableCell>
                      <TableCell align="right">Exercise</TableCell>
                      <TableCell align="right">Chapter Assesment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courseInfo.data.reviews.map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{row.chapterTitle}</TableCell>
                        <TableCell align="right">{row.chapterVideo}</TableCell>
                        <TableCell align="right">
                          {row.instructorNotes}
                        </TableCell>
                        <TableCell align="right">{row.totalHours}</TableCell>
                        <TableCell align="right">{row.exercise}</TableCell>
                        <TableCell align="right">
                          {row.chapterAssesment}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </List>
        )}
      </div>
    </>
  );
}

export default CTcourseInfo;
