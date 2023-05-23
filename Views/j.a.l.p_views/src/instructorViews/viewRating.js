import { Fragment, useState, useEffect } from "react";
import { IconButton, Rating, Box } from "@mui/material";
import "../styling/viewRating.css";
import axios from "axios";
function ViewRating({ instructorId }) {
  //useStates variables
  const [overAllRating, setOverAllRating] = useState(0);
  const [fiveStars, setFiveStars] = useState(1);
  const [fourStars, setFourStars] = useState(0);
  const [threeStars, setThreeStars] = useState(0);
  const [twoStars, setTwoStars] = useState(0);
  const [oneStars, setOneStars] = useState(0);
  const [reviewsLoaded, setReviewsLoaded] = useState(0);
  const [reviewsAvailable, setReviewsAvailable] = useState({
    errorMessage: "You currently have no reviews",
    avaliable: false,
  });
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("/instructor/getRating/"+instructorId) //6365564d5ccca85b4590cfd7-63653e09c81ff58c1c877e6d
      .then((res) => {
        let reviews = res.data[0].reviews;
        if (reviews.length == 0) {
          return;
        }
        setReviewsAvailable({ errorMessage: null, avaliable: true });
        let averageRarting = 0;
        let oneStar = 0;
        let twoStar = 0;
        let threeStar = 0;
        let fourStar = 0;
        let fiveStar = 0;
        reviews.forEach((review, i) => {
          switch (true) {
            case review.Rating <= 1:
              oneStar++;
              break;
            case review.Rating > 1 && review.Rating <= 2:
              twoStar++;
              break;
            case review.Rating > 2 && review.Rating <= 3:
              threeStar++;
              break;
            case review.Rating > 3 && review.Rating <= 4:
              fourStar++;
              break;
            case review.Rating > 4 && review.Rating <= 5:
              fiveStar++;
              break;
          }
          averageRarting += review.Rating;
        });

        setOverAllRating(
          Math.floor((averageRarting / reviews.length) * 10) / 10
        );
        setOneStars(Math.floor((oneStar / reviews.length) * 100) / 100);
        setTwoStars(Math.floor((twoStar / reviews.length) * 100) / 100);
        setThreeStars(Math.floor((threeStar / reviews.length) * 100) / 100);
        setFourStars(Math.floor((fourStar / reviews.length) * 100) / 100);
        setFiveStars(Math.floor((fiveStar / reviews.length) * 100) / 100);
        setReviews(reviews);
      })
      .catch((res) => {
        setReviewsAvailable({
          errorMessage: res.response.data,
          Avaliable: false,
        });
      });
  }, []);
  return (
    <Fragment>
      <div className="parent">
        <div className="overAllRating">
          <div className="starArea">
            <p className="ratingP">Rating</p>
            <div className="ratingStars">
              <Rating
                sx={{ width: "100%", color: "#f4976c" }}
                name="InstructorRating"
                value={overAllRating}
                precision={0.1}
                readOnly
              />
            </div>
            <p className="ratingP">{overAllRating} out of 5 stars</p>
          </div>
          <div className="percentageArea">
            <div className="percentage">
              <label className="percentageLabel">4-5 Stars</label>
              <div className="percentageBackgroundDiv">
                <div
                  style={{
                    width: (fiveStars * 100).toString() + "%",
                    height: "20px",
                    backgroundColor: "#f4976c",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
              <label className="percentageLabel">{fiveStars * 100}%</label>
            </div>
            <div className="percentage">
              <label className="percentageLabel">3-4 Stars</label>
              <div className="percentageBackgroundDiv">
                <div
                  style={{
                    width: (fourStars * 100).toString() + "%",
                    height: "20px",
                    backgroundColor: "#f4976c",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
              <label className="percentageLabel">{fourStars * 100}%</label>
            </div>
            <div className="percentage">
              <label className="percentageLabel">2-3 Stars</label>
              <div className="percentageBackgroundDiv">
                <div
                  style={{
                    width: (threeStars * 100).toString() + "%",
                    height: "20px",
                    backgroundColor: "#f4976c",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
              <label className="percentageLabel">{threeStars * 100}%</label>
            </div>
            <div className="percentage">
              <label className="percentageLabel">1-2 Stars</label>
              <div className="percentageBackgroundDiv">
                <div
                  style={{
                    width: (twoStars * 100).toString() + "%",
                    height: "20px",
                    backgroundColor: "#f4976c",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
              <label className="percentageLabel">{twoStars * 100}%</label>
            </div>
            <div className="percentage">
              <label className="percentageLabel">0-1 Star </label>
              <div className="percentageBackgroundDiv">
                <div
                  style={{
                    width: (oneStars * 80).toString() + "%",
                    hieght: "20px",
                    backgroundColor: "#f4976c",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
              <label className="percentageLabel">{oneStars * 100}%</label>
            </div>
          </div>
        </div>
        <div className="ReviewsSection">
          <h1 className="reviewP">Reviews</h1>
          <div className="reviews">
            {!reviewsAvailable.avaliable && (
              <h1 className="errorMessage">{reviewsAvailable.errorMessage}</h1>
            )}
            {reviews.map((review) => {
              return (
                <div
                  className="singleReview"
                  key={review.eviewBody + review.Rating}
                >
                  <Fragment>
                    <h1 className="reviewBoby">{review.ReviewBody}</h1>
                    <div className="ratingReviewBody">
                      <Rating
                        sx={{ width: "100%", color: "#f4976c" }}
                        value={review.Rating}
                        precision={0.1}
                        readOnly
                      />
                      <p className="ratingP">{review.Rating} out of 5 stars</p>
                    </div>
                  </Fragment>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default ViewRating;
