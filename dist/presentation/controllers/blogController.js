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
const AddCardBlog_1 = require("@core/use_cases/Blog/AddCardBlog");
class BlogCardController {
    constructor() {
        this.addBlogCard = new AddCardBlog_1.AddCardBlog();
    }
    addCardBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            try {
                const request = {
                    image: req.body.image,
                    title: req.body.title,
                    href: req.body.href,
                };
                const blogCard = yield this.addBlogCard.execute(request, errors);
                if (errors.length > 0) {
                    const current_error = errors[0];
                    res.status(current_error.code).json({ message: current_error.details });
                    return;
                }
                res.status(201).json({ message: "Успешно добавлено!", item: blogCard });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Произошла ошибка при добавлении карточки блога" });
            }
        });
    }
}
exports.default = new BlogCardController();
