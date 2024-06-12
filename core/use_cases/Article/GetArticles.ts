import { IArticleRepository } from "@core/interfaces/repositories/IArticleRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Article } from "@infrastructure/models/articleModel";
import { ArticleRepository } from "@infrastructure/repositories/articleRepository";

export default class GetArticle {
    private articleRepository: IArticleRepository;
    constructor(){
        this.articleRepository = new ArticleRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<Article[]>{
        const article = await this.articleRepository.findArticles(errors);

        return article;
    }
}