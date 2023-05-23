import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function CourseReviews(reviews) {
  const { state } = this.props.location;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>All trainee Reviews</TableCell>
              <TableCell align="right">Review</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Reviewed By</TableCell>
              <TableCell align="right">Trainee Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
  );
}
