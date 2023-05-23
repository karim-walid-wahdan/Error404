import { Fragment, useState, useEffect } from "react";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "../styling/courseComponent.css";
import YoutubeVideo from "../general/assests/youtubeVideo";
import axios from "axios";
function UpdateCourseDescription({ courseId }) {
  //useStates variables
  const [courseDescription, setCourseDescription] = useState(
    "no course Descripation is avaliable"
  );
  const [courseUrl, setCourseUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      .split("v=")[1]
      .substring(0, 11)
  );
  const [newCourseUrl, setNewCourseUrl] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const [helperText, sethelperText] = useState(
    "provide a youtube url for the course description"
  );
  const [viewMode, setViewMode] = useState(true);
  const [resMsg, setResMsg] = useState(null);
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
      setNewCourseUrl(true);
      sethelperText("provide a youtube url for the course description");
    } else {
      if (matchYoutubeUrl(change.target.value)) {
        setNewCourseUrl(change.target.value.split("v=")[1].substring(0, 11));
        setValidUrl(true);
        sethelperText("provide a youtube url for the course description");
      } else {
        setValidUrl(false);
        sethelperText("please provide a valid youtube video url");
      }
    }
  };
  useEffect(() => {
    axios
      .get("course/getCourseDescription/" + courseId)
      .then((res) => {
        if (res.data[0].courseDescription) {
          setCourseDescription(res.data[0].courseDescription);
        }
        if (res.data[0].courseDescriptionVideo) {
          setCourseUrl(res.data[0].courseDescriptionVideo);
        }
      })
      .catch((res) => {
        if (viewMode) setResMsg(res.response.data);
      });
  });
  const handleClick = (newcourseDescription, newsrc) => {
    newcourseDescription = newcourseDescription
      ? newCourseDescription
      : courseDescription;
    let src = newsrc ? newsrc : courseUrl;
    console.log(courseDescription);
    console.log(src);
    axios
      .patch("course/updateCourseDescription/" + courseId, {
        courseDescription: newcourseDescription,
        src: src,
      })
      .then((res) => {
        setResMsg("Desctiption Updated");
        setViewMode(true);
      })
      .catch((res) => {
        setResMsg(res.response.data);
      });
  };
  const saveCourseDescription = (change) => {
    setNewCourseDescription(change.target.value);
  };
  return (
    <Fragment>
      {viewMode && (
        <div className="courseComponent">
          <p className="UploadCourseDescriptionP">
            Course wriiten and video short Description and{" "}
          </p>
          <IconButton
            sx={{ marginBottom: "10px", marginLeft: "1200px" }}
            variant="contained"
            onClick={() => {
              setViewMode(false);
            }}
          >
            <EditIcon />
          </IconButton>
          <h1 className="viewMode">Course description: </h1>
          <p className="viewModep">{courseDescription}</p>
          <h1 className="viewMode">Descripation video</h1>
          {!courseUrl && (
            <p className="viewModep">there is no descripation Video provided</p>
          )}
          {courseUrl && (
            <YoutubeVideo
              className="courseVideoDescripation"
              src={courseUrl}
              width="1480"
              height={300}
            />
          )}
          {resMsg && <p className="UploadCourseDescriptionP">{resMsg}</p>}
        </div>
      )}
      {!viewMode && (
        <div className="courseComponent">
          <p className="UploadCourseDescriptionP">
            Please provide a short course description and/or youtube link to to
            course description video
          </p>
          <IconButton
            sx={{ marginBottom: "10px", marginLeft: "1200px" }}
            variant="contained"
            onClick={() => {
              handleClick(newCourseDescription, newCourseUrl);
            }}
          >
            <SaveIcon />
          </IconButton>
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
          {resMsg && <p className="UploadCourseDescriptionP">{resMsg}</p>}
        </div>
      )}
    </Fragment>
  );
}
export default UpdateCourseDescription;
