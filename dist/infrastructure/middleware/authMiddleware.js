"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToken = void 0;
const JWTService_1 = require("@core/use_cases/User/JWTService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express = require("express");
const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Получение токена через bearer
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).json({ message: "Вы не предоставили JWT токен" });
    }
    try {
        const decodedUser = yield jsonwebtoken_1.default.verify(token, JWT_SECRET_ACCESS);
        req.user = decodedUser;
        next();
    }
    catch (error) {
        console.error(error);
        return res
            .status(403)
            .json({ error: "Неверный или устаревший JWT токен." });
    }
});
const accessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Получение access токена
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const jwtService = new JWTService_1.JWTService();
    console.log("Yerlan");
    if (token == null) {
        return res.status(401).json({ message: "Вы не предоставили JWT токен" });
    }
    try {
        const decodedUser = yield jsonwebtoken_1.default.verify(token, JWT_SECRET_REFRESH);
        const access = jwtService.generateAccessToken(decodedUser);
        res
            .status(201)
            .json({ message: "Успешно создали access токен", access: access });
    }
    catch (error) {
        console.error(error);
        return res
            .status(403)
            .json({ error: "Неверный или устаревший JWT токен." });
    }
});
exports.accessToken = accessToken;
const app = express();
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Это защищенный путь" });
});
exports.default = authenticateToken;
