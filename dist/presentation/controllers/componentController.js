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
const AddComponent_1 = require("@core/use_cases/Component/AddComponent");
const DeleteComponent_1 = __importDefault(require("@core/use_cases/Component/DeleteComponent"));
const GetComponents_1 = __importDefault(require("@core/use_cases/Component/GetComponents"));
const UpdateComponent_1 = __importDefault(require("@core/use_cases/Component/UpdateComponent"));
class ComponentController {
    constructor() {
        this.addComponentUseCase = new AddComponent_1.AddComponent();
        this.getComponentsUseCase = new GetComponents_1.default();
        this.deleteComponentUseCase = new DeleteComponent_1.default();
        this.updateComponentUseCase = new UpdateComponent_1.default();
    }
    addComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                console.log("hello", req.body.code, req.body.value);
                const request = {
                    code: req.body.code,
                    name: req.body.name,
                    value: req.body.value,
                };
                yield this.addComponentUseCase.execute(request, errors);
                if (errors.length > 0) {
                    res.status(errors[0].code).json({ message: errors[0].details });
                    return;
                }
                res.status(201).json({ message: "Component added successfully." });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error adding the component." });
            }
        });
    }
    getComponents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                const components = yield this.getComponentsUseCase.execute(errors);
                res.status(200).json({ components: components });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error getting components." });
            }
        });
    }
    deleteComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                const request = {
                    id: Number(req.params.id),
                    code: req.body.code,
                };
                yield this.deleteComponentUseCase.execute(request, errors);
                if (errors.length > 0) {
                    res.status(errors[0].code).json({ message: errors[0].details });
                    return;
                }
                res.status(200).json({ message: "Component deleted successfully." });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting the component." });
            }
        });
    }
    updateComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                const request = {
                    id: Number(req.params.id),
                    code: req.body.code,
                    name: req.body.name,
                    value: req.body.value,
                };
                yield this.updateComponentUseCase.execute(request, errors);
                if (errors.length > 0) {
                    res.status(errors[0].code).json({ message: errors[0].details });
                    return;
                }
                res.status(200).json({ message: "Component updated successfully." });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error updating the component." });
            }
        });
    }
}
exports.default = new ComponentController();
