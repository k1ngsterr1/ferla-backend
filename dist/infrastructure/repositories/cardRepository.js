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
exports.BlogCardRepository = void 0;
const blogCardModel_1 = require("@infrastructure/models/blogCardModel");
const sequelize_1 = __importDefault(require("infrastructure/config/sequelize"));
class BlogCardRepository {
    // Добавление карточки блога
    create(blogCardDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return sequelize_1.default.getRepository(blogCardModel_1.BlogCard).create(blogCardDetails);
        });
    }
    //   Обновление карточки блога
    update(primaryKey, updateFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.default
                    .getRepository(blogCardModel_1.BlogCard)
                    .update(updateFields, {
                    where: { id: primaryKey },
                });
            }
            catch (error) {
                console.error("Ошибка с обновлением полей карточки блога:", error);
            }
        });
    }
    //   Удаление карточки блога
    delete(primaryKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.default.getRepository(blogCardModel_1.BlogCard).destroy({
                    where: {
                        id: primaryKey,
                    },
                });
                if (result === 0) {
                    throw new Error("No records found to delete.");
                }
                console.log(`Deleted ${result} record(s).`);
            }
            catch (error) {
                console.error("Error deleting the blog card:", error);
                throw error; // Rethrow the error if you want calling function to handle it further.
            }
        });
    }
    //   Поиск по id
    findByPk(primaryKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCard = yield sequelize_1.default
                .getRepository(blogCardModel_1.BlogCard)
                .findByPk(primaryKey);
            return blogCard;
        });
    }
}
exports.BlogCardRepository = BlogCardRepository;
