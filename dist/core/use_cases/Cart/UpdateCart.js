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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@core/utils/utils");
const cartRepository_1 = require("@infrastructure/repositories/cartRepository");
const Code = process.env.WEBSITE_CODE;
class DeleteCart {
    constructor() {
        this.cartRepository = new cartRepository_1.CartRepository();
    }
    execute(request, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(request.id)) {
                errors.push(new utils_1.ErrorDetails(400, "Invalid id."));
                return;
            }
            if (request.code !== Code) {
                errors.push(new utils_1.ErrorDetails(403, "The website code is incorrect."));
                return;
            }
            const cart = yield this.cartRepository.findById(request.id, errors);
        });
    }
}
exports.default = DeleteCart;
