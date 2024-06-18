import { Article } from "@infrastructure/models/articleModel";
import { BlogCard } from "@infrastructure/models/blogCardModel";
import { Cart } from "@infrastructure/models/cartModel";
import { Component } from "@infrastructure/models/componentModels";
import { Form } from "@infrastructure/models/formModel";
import { Sequelize } from "sequelize-typescript";

const dotenv = require("dotenv").config({ path: "../.env" });

// Подключение к базе данных
const sequelize = new Sequelize({
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
  models: [Component, Cart, BlogCard, Form, Article],
});

export default sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });
