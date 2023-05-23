import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function InstructorCourses() {
  const [courseReviewsandTitle, setCourseReviews] = useState(null);

  useEffect(() => {
    axios
      .get("/instructor/viewCourseReviews/6393668c6dd0bd88852031af")
      .then(function (response) {
        console.log(response);
        setCourseReviews(response);
      });
  }, []);

  console.log(courseReviewsandTitle);

  return (
    <>
      <div>
        {courseReviewsandTitle &&
          courseReviewsandTitle.data.map((r, j) => (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row" key={j}>
                      {r.courseTitle}
                    </TableCell>
                    <TableCell align="right">Review</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="right">Reviewed By</TableCell>
                    <TableCell align="right">Trainee Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody key={j}>
                  {r.reviews.map((row, i) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right" key={i}>
                        {row.review}
                      </TableCell>
                      <TableCell align="right" key={i}>
                        {row.rating}
                      </TableCell>
                      <TableCell align="right" key={i}>
                        {row.reviewedBy}
                      </TableCell>
                      <TableCell align="right" key={i}>
                        {row.traineeType}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
      </div>
    </>
  );
}

export default InstructorCourses;
