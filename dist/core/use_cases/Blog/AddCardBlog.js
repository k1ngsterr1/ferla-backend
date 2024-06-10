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
exports.AddCardBlog = void 0;
const BlogCardRepository_1 = require("@infrastructure/repositories/BlogCardRepository");
class AddCardBlog {
    constructor() {
        this.blogRepository = new BlogCardRepository_1.BlogCardRepository();
    }
    execute(request, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, title, href } = request;
            const newBlog = {
                image: image,
                title: title,
                href: href,
            };
            const blog = yield this.blogRepository.create(newBlog, errors);
            return blog;
        });
    }
}
exports.AddCardBlog = AddCardBlog;
