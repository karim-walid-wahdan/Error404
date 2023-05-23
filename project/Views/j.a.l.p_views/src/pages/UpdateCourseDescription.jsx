import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
function UpdateCourseDescription({ handleClick }) {
  const [src, setSrc] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const [helperText, sethelperText] = useState(
    "provide a youtube url for the course description"
  );

  useEffect(() => {
    const res = axios.put(
      "/instructor/UploadCourseVideoAndDescription/639114e227ba150662d88096",
      {
        chapterTitle: "the Physics of neuro-chemistry",
        chapterVideo: src,
        instructorNotes: courseDescription,
      }
    );
    console.log(res);
  }, [src, courseDescription]);

  const matchYoutubeUrl = (url) => {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return true;
    }
    return false;
  };
  const saveCourseURl = (change) => {
    console.log(change.target.value);
    if (!change.target.value) {
      setValidUrl(true);
      sethelperText("provide a youtube url for the course description");
    } else {
      if (matchYoutubeUrl(change.target.value)) {
        setSrc(change.target.value.split("v=")[1].substring(0, 11));
        setValidUrl(true);
        sethelperText("provide a youtube url for the course description");
      } else {
        setValidUrl(false);
        sethelperText("please provide a valid youtube video url");
      }
    }
  };
  const saveCourseDescription = (change) => {
    setCourseDescription(change.target.value);
  };
  return (
    <div className="AddCourseComponent">
      <p className="UploadCourseDescriptionP">
        Please provide a short course description and/or youtube link to to
        course description video
      </p>
      <br />
      <TextField
        sx={{ marginLeft: "200px", marginBottom: "10px", width: "1000px" }}
        id="courseDescription"
        label="courseDescription"
        size="small"
        onChange={(change) => {
          saveCourseDescription(change);
        }}
        helperText="provide a brief description of the course"
      />
      <br />
      <TextField
        sx={{ marginLeft: "200px", marginBottom: "10px", width: "1000px" }}
        id="courseDescriptionVideo"
        label="courseDescriptionVideo"
        size="small"
        onChange={(change) => {
          saveCourseURl(change);
        }}
        error={!validUrl}
        helperText={helperText}
      />
      <br />
      <Button
        sx={{ marginBottom: "10px", marginLeft: "1200px" }}
        variant="contained"
        onClick={() => {
          handleClick(courseDescription, src);
        }}
      >
        Add Description
      </Button>
    </div>
  );
}
export default UpdateCourseDescription;
