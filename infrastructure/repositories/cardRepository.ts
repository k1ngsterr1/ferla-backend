import { IBlogCardRepository } from "@core/interfaces/repositories/IBlogCartRepository";
import { BlogCard } from "@infrastructure/models/blogCardModel";
import sequelize from "@infrastructure/config/sequelize";
import { NewBlogCardInput } from "@core/utils/BlogCard/types";
import { ErrorDetails } from "@core/utils/utils";

export class BlogCardRepository implements IBlogCardRepository {
  // Добавление карточки блога
  async create(blogCardDetails: NewBlogCardInput): Promise<BlogCard> {
    return sequelize.getRepository(BlogCard).create(blogCardDetails);
  }

  //   Обновление карточки блога
  async update(primaryKey: string | number, updateFields): Promise<any> {
    try {
      const result = await sequelize
        .getRepository(BlogCard)
        .update(updateFields, {
          where: { id: primaryKey },
        });
    } catch (error) {
      console.error("Ошибка с обновлением полей карточки блога:", error);
    }
  }

  //   Удаление карточки блога
  async deleteById(primaryKey: string | number, errors: ErrorDetails[]): Promise<BlogCard> {
    try {
      const blog = await sequelize.getRepository(BlogCard).findByPk(primaryKey);

      if (!blog) {
        errors.push(new ErrorDetails(404, "Blog card not found"));
        return;
      }

      await blog.destroy();

      return blog;
    } catch (error) {
      errors.push(new ErrorDetails(500, "Error deleting blog card"));
    }
  }

  //   Поиск по id
  async findByPk(primaryKey: string | number): Promise<BlogCard | null> {
    const blogCard = await sequelize
      .getRepository(BlogCard)
      .findByPk(primaryKey);

    return blogCard;
  }

  //  Получение карточек блога
  async findBlogCards(errors: ErrorDetails[]): Promise<BlogCard[]> {
    try {
      const cards = await sequelize.getRepository(BlogCard).findAll();

      if (!cards) {
        errors.push(new ErrorDetails(404, "Cards not found"));
        return null;
      }

      return cards;
    } catch (error) {
      console.log(error);
      errors.push(
        new ErrorDetails(500, "Error getting all cards from database")
      );
      return null;
    }
  }
}
