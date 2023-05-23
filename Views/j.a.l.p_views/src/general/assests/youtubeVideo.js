import "../../styling/youtubeVideo.css"
function YoutubeVideo({ src, height, width, title ,marginValue}) {
  return (
    <div className= "wrapper"style={{height:height+"vh",width:width+"vw",marginLeft:marginValue+"vw",marginRight:marginValue+"vw"}}>
    <iframe
      width= "100%"
      height="100%"
      src={"https://www.youtube.com/embed/" + src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    </div>
  );
}
export default YoutubeVideo;
