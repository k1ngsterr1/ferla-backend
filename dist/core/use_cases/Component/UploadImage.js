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
exports.UploadImage = void 0;
const utils_1 = require("@core/utils/utils");
const componentRepository_1 = require("@infrastructure/repositories/componentRepository");
const server_1 = require("server");
const Code = process.env.WEBSITE_CODE;
class UploadImage {
    constructor() {
        this.componentRepository = new componentRepository_1.ComponentRepository();
    }
    execute(request, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            if (isNaN(request.id)) {
                errors.push(new utils_1.ErrorDetails(400, "Invalid id."));
                return;
            }
            if (request.code !== Code) {
                errors.push(new utils_1.ErrorDetails(403, "The website code is incorrect."));
                return;
            }
            const component = yield this.componentRepository.findComponentById(request.id, errors);
            component.value = server_1.base_url + "/" + request.value;
            yield component.save();
        });
    }
}
exports.UploadImage = UploadImage;
