"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base_url = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const cartRoutes_1 = __importDefault(require("@infrastructure/routes/cartRoutes"));
const componentRoutes_1 = __importDefault(require("@infrastructure/routes/componentRoutes"));
const path_1 = __importDefault(require("path"));
const blogRoutes_1 = __importDefault(require("@infrastructure/routes/blogRoutes"));
exports.base_url = "https://ferla-backend-production.up.railway.app/";
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: ["Authorization", "Content-Type"],
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// Component routes
app.use("/api/components", componentRoutes_1.default);
// Cart routes
app.use("/api/carts", cartRoutes_1.default);
// Blog routes
app.use("/api/blog", blogRoutes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
