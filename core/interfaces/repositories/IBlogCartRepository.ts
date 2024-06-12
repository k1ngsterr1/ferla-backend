import { NewBlogCardInput } from "@core/utils/BlogCard/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCard } from "@infrastructure/models/blogCardModel";

export interface IBlogCardRepository {
  // Interface для создание карточки блога
  create?(
    blogCardDetails: NewBlogCardInput,
    errors: ErrorDetails[]
  ): Promise<BlogCard>;
  update?(primaryKey: string | number, updateFields): Promise<BlogCard>;
  deleteById?(
    primaryKey: string | number,
    errors: ErrorDetails[]
  ): Promise<BlogCard>;
  findBlogCards(errors: ErrorDetails[]): Promise<BlogCard[] | null>;
  findByPk(
    primaryKey: string | number,
    errors: ErrorDetails[]
  ): Promise<BlogCard | null>;
}
