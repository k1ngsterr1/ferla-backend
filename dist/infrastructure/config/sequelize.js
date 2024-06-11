"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogCardModel_1 = require("@infrastructure/models/blogCardModel");
const cartModel_1 = require("@infrastructure/models/cartModel");
const componentModels_1 = require("@infrastructure/models/componentModels");
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = require("dotenv").config({ path: "../.env" });
// Подключение к базе данных
const sequelize = new sequelize_typescript_1.Sequelize({
    repositoryMode: true,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    models: [componentModels_1.Component, cartModel_1.Cart, blogCardModel_1.BlogCard],
});
exports.default = sequelize;
sequelize
    .sync({ force: false })
    .then(() => {
    console.log("Database synchronized");
})
    .catch((error) => {
    console.error("Failed to synchronize database:", error);
});
