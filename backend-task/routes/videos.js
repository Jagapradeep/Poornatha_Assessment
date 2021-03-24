const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = "AIzaSyC70NaVBT1pCuIeB31Sk6lbtRJCEdmtqhA";
const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=10&q=sports`;

router.get("/", (req, res) => {
  axios
    .get(URL)
    .then((response) => {
      for (let i in response.data.items) {
        let item = response.data.items[i];
        console.log(`${item.id.videoId} Title : ${item.snippet.title}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Hello world!");
});

module.exports = router;
