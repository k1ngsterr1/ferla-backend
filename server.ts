import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import cartRoutes from "@infrastructure/routes/cartRoutes";
import componentRoutes from "@infrastructure/routes/componentRoutes";
import path from "path";
import blogRoutes from "@infrastructure/routes/blogRoutes";
import formRoutes from "@infrastructure/routes/formRoutes";
import articleRoutes from "@infrastructure/routes/articleRoutes";

export const main = __dirname;
export const base_url: string =
  "https://ferla-backend-production.up.railway.app";

const app = express();
const port = process.env.PORT;

const corsOptions = {
  credentials: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Component routes
app.use("/api/components", componentRoutes);

// Cart routes
app.use("/api/carts", cartRoutes);

// Blog routes
app.use("/api/blog", blogRoutes);

app.use("/api/forms", formRoutes);

app.use("/api/articles", articleRoutes);

app.use(express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
