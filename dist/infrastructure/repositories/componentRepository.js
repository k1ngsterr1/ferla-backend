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
exports.ComponentRepository = void 0;
const utils_1 = require("@core/utils/utils");
const sequelize_1 = __importDefault(require("@infrastructure/config/sequelize"));
const componentModels_1 = require("@infrastructure/models/componentModels");
class ComponentRepository {
    create(componentDetails, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.default.getRepository(componentModels_1.Component).create(componentDetails);
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error adding component to database"));
                return null;
            }
        });
    }
    findComponents(errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const components = yield sequelize_1.default.getRepository(componentModels_1.Component).findAll({
                    order: [
                        ['id', 'ASC'],
                    ],
                });
                if (!components) {
                    errors.push(new utils_1.ErrorDetails(404, "Components not found"));
                    return null;
                }
                return components;
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error getting all components from database"));
                return null;
            }
        });
    }
    findComponentById(id, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const component = yield sequelize_1.default.getRepository(componentModels_1.Component).findByPk(id);
                if (!component) {
                    errors.push(new utils_1.ErrorDetails(404, "Component not found"));
                    return null;
                }
                return component;
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error getting component from database"));
                return null;
            }
        });
    }
    deleteById(id, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const component = yield sequelize_1.default.getRepository(componentModels_1.Component).findByPk(id);
                if (!component) {
                    errors.push(new utils_1.ErrorDetails(404, "Component not found"));
                    return null;
                }
                yield component.destroy();
            }
            catch (error) {
                console.log(error);
                errors.push(new utils_1.ErrorDetails(500, "Error deleting component from database"));
                return null;
            }
        });
    }
}
exports.ComponentRepository = ComponentRepository;
