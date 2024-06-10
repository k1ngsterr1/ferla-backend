const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
import cartRoutes from "@infrastructure/routes/cartRoutes";
import componentRoutes from "@infrastructure/routes/componentRoutes";

const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");

const corsOptions = {
  // origin: "https://spark-admin-production.up.railway.app",
  credentials: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders: ["Authorization", "Content-Type"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Component routes
app.use("/api/components", componentRoutes);

//Cart routes
app.use("/api/carts", cartRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
