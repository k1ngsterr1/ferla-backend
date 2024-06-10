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
exports.CartRepository = void 0;
const utils_1 = require("@core/utils/utils");
const sequelize_1 = __importDefault(require("@infrastructure/config/sequelize"));
const cartModel_1 = require("@infrastructure/models/cartModel");
class CartRepository {
    create(cartDetails, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.default.getRepository(cartModel_1.Cart).create(cartDetails);
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error adding cart to database"));
                return null;
            }
        });
    }
    findCarts(errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield sequelize_1.default.getRepository(cartModel_1.Cart).findAll();
                if (!carts) {
                    errors.push(new utils_1.ErrorDetails(404, "Carts not found."));
                    return null;
                }
                return carts;
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error getting all carts from database"));
                return null;
            }
        });
    }
    findById(id, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield sequelize_1.default.getRepository(cartModel_1.Cart).findByPk(id);
                if (!cart) {
                    errors.push(new utils_1.ErrorDetails(404, "Cart not found"));
                    return null;
                }
                return cart;
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error getting cart from database"));
                return null;
            }
        });
    }
    deleteById(id, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield sequelize_1.default.getRepository(cartModel_1.Cart).findByPk(id);
                if (!cart) {
                    errors.push(new utils_1.ErrorDetails(404, "Cart not found"));
                    return null;
                }
                yield cart.destroy();
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error deleting component from database"));
                return null;
            }
        });
    }
}
exports.CartRepository = CartRepository;
