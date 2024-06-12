import { IArticleRepository } from "@core/interfaces/repositories/IArticleRepository";
import { AddArticleRequest } from "@core/utils/Article/Request";
import { ArticleDetails } from "@core/utils/Article/types";
import { ErrorDetails } from "@core/utils/utils";
import { ArticleRepository } from "@infrastructure/repositories/articleRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class AddArticle{
    private articleRepository: IArticleRepository;
    constructor(){
        this.articleRepository = new ArticleRepository();
    }
    async execute(request: AddArticleRequest, errors: ErrorDetails[]): Promise<void> {
        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const newArticle: ArticleDetails = {
            content: request.content
        }

        await this.articleRepository.create(newArticle, errors);
    }
}