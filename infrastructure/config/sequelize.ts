import { Cart } from "@infrastructure/models/cartModel";
import { Component } from "@infrastructure/models/componentModels";
import { Sequelize } from "sequelize-typescript";

// Подключение к базе данных
const sequelize = new Sequelize({
    repositoryMode: true,
    database: "verceldb",
    host: "ep-spring-sun-a4chi1fn-pooler.us-east-1.aws.neon.tech",
    username: "default",
    password: "Uzs8RlAumI0F",
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
