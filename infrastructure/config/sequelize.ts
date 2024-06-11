import { Cart } from "@infrastructure/models/cartModel";
import { Component } from "@infrastructure/models/componentModels";
import { Sequelize } from "sequelize-typescript";

// Подключение к базе данных
const sequelize = new Sequelize({
    repositoryMode: true,
    database: "verceldb",
    host: "ep-curly-wind-a4suq6rv-pooler.us-east-1.aws.neon.tech",
    username: "default",
    password: "ZPL9zFU5kQOY",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
    },
    logging: false,
    models: [Component, Cart],
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
