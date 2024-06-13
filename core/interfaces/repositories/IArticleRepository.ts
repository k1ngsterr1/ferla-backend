import { ArticleDetails } from "@core/utils/Article/types";
import { ErrorDetails } from "@core/utils/utils";
import { Article } from "@infrastructure/models/articleModel";

export interface IArticleRepository {
    create(articleDetails: ArticleDetails, errors: ErrorDetails[]): Promise<void | null>;
    findById(id: number, errors: ErrorDetails[]): Promise<Article | null>;
    findArticles(errors: ErrorDetails[]): Promise<Article[] | null>;
    deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>;
}