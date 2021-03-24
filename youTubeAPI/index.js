const express = require("express");
const videos = require("./routes/videos");
const app = express();

app.use(express.json());
app.use("/", videos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
