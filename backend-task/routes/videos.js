const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

const API_KEY = "";
const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=10&q=sports`;
const videoDetails = [];

mongoose
  .connect("mongodb://localhost/video-details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo DB..."))
  .catch((err) => console.log("Cannot connect to mongo DB...", err));

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  publishedTime: Date,
  thumbnail: String,
});

const Video = mongoose.model("Video", videoSchema);

router.get("/", (req, res) => {
  axios
    .get(URL)
    .then((response) => {
      for (let i in response.data.items) {
        let {
          title,
          description,
          publishTime,
          thumbnails,
        } = response.data.items[i].snippet;
        const video = new Video({
          title,
          description,
          publishTime,
          thumbnail: thumbnails.default.url,
        });
        video
          .save()
          .then()
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Hello world!");
});

module.exports.videos = router;
