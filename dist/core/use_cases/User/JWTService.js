"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    constructor() {
        this.accessTokenSecret = process.env.JWT_SECRET_ACCESS;
        this.refreshTokenSecret = process.env.JWT_SECRET_REFRESH;
    }
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, this.accessTokenSecret, { expiresIn: "1d" });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, this.refreshTokenSecret, { expiresIn: "7d" });
    }
    getAccessPayload(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.accessTokenSecret);
        }
        catch (error) {
            console.log("Could not get access token payload");
        }
    }
    getRefreshPayload(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.refreshTokenSecret);
        }
        catch (error) {
            console.log("Could not get refresh token payload");
        }
    }
}
exports.JWTService = JWTService;
