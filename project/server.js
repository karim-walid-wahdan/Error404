const mongoose = require("mongoose");
const express = require("express");
const mailTest = require("./Controller/generalController");
const app = express();
const MongoURI =
  "mongodb+srv://Error404:Error404TeamNotFound@jalp.jnqmtan.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || "8000";
mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
  })
  .catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/course", require("./Routes/coursesRoutes"));
app.use("/instructor", require("./Routes/instructorRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/trainee", require("./Routes/traineeRoutes"));
app.use("/", require("./Routes/generalRoutes"));
app.use("/requests", require("./Routes/requestsRouter"));
