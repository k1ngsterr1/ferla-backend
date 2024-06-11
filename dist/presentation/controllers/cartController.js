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
const AddCart_1 = __importDefault(require("@core/use_cases/Cart/AddCart"));
const DeleteCart_1 = __importDefault(require("@core/use_cases/Cart/DeleteCart"));
const GetCarts_1 = __importDefault(require("@core/use_cases/Cart/GetCarts"));
const UpdateCart_1 = __importDefault(require("@core/use_cases/Cart/UpdateCart"));
class CartController {
    constructor() {
        this.addCartUseCase = new AddCart_1.default();
        this.getCartsUseCase = new GetCarts_1.default();
        this.deleteCartUseCase = new DeleteCart_1.default();
        this.updateCartUseCase = new UpdateCart_1.default();
    }
    addCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                console.log(req.body);
                const request = {
                    code: req.body.code,
                    name: req.body.name,
                    description: req.body.description,
                    img_url: req.body.image,
                    price: req.body.price
                };
                yield this.addCartUseCase.execute(request, errors);
                if (errors.length > 0) {
                    res.status(errors[0].code).json({ message: errors[0].details });
                    return;
                }
                res.status(201).json({ message: "Cart added succesfully." });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error adding the cart." });
            }
        });
    }
    getCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                const carts = yield this.getCartsUseCase.execute(errors);
                if (errors.length > 0) {
                    res.status(errors[0].code).json({ message: errors[0].details });
                    return;
                }
                res.status(200).json({ carts: carts });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error getting carts." });
            }
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                const request = {
                    id: Number(req.params.id),
                    code: req.body.code
                };
                yield this.deleteCartUseCase.execute(request, errors);
                if (errors.length > 0) {
                    res.status(errors[0].code).json({ message: errors[0].details });
                    return;
                }
                res.status(200).json({ message: "Deleted cart successfully." });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error deleting the cart." });
            }
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                const request = {
                    id: Number(req.params.id),
                    code: req.body.code,
                    name: req.body.name,
                    description: req.body.description,
                    img_url: req.body.img_url,
                    price: req.body.price
                };
                yield this.updateCartUseCase.execute(request, errors);
                if (errors.length > 0) {
                    res.status(errors[0].code).json({ message: errors[0].details });
                    return;
                }
                res.status(200).json({ message: "Updated cart successfully." });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error updating the cart." });
            }
        });
    }
}
exports.default = new CartController();
