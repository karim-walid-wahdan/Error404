import { useState } from "react";
import { Button, TextField } from "@mui/material";
import "../styling/courseComponent.css";
function UploadCourseDescription({ handleClick }) {
  const [src, setSrc] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const [helperText, sethelperText] = useState(
    "provide a youtube url for the course description"
  );
  const matchYoutubeUrl = (url) => {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return true;
    }
    return false;
  };
  const saveCourseURl = (change) => {
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
    <div className="courseComponent">
      <p className="UploadCourseDescriptionP">
        Please provide a short course description <br/>and/or youtube link to to
        course description video
      </p>
      <br />
      <TextField
        sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}}
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
        sx={{marginBottom :"20px" ,width:"90%", input: { color: '#f4976c' }}}
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
      sx={{minWidth:"50%" ,marginBottom:"20px"}}
        variant="contained"
        onClick={() => {
          handleClick(courseDescription, src);
          
        }}
      >
        Add Description and proceed
      </Button>
    </div>
  );
}
export default UploadCourseDescription;
