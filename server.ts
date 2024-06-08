const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: ".env" });

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
